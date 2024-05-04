<script setup>
import { useStepper, useGeolocation, useOnline, useMediaQuery } from "@vueuse/core";
import { onMounted, reactive, ref, computed, watch } from 'vue'
import BaseInputAt from '../atoms/BaseInputAt.vue';
import CleaveInputAt from '../atoms/CleaveInputAt.vue';
import BaseRadioButtonGroup from '../molecules/BaseRadioButtonGroup.vue';
import SwitchAt from "../atoms/SwitchAt.vue";
import OverlayAt from "../atoms/OverlayAt.vue";
import BaseButtonAt from "../atoms/BaseButtonAt.vue";
import BaseInputSingleImageAt from '@/components/atoms/BaseInputSingleImageAt.vue';
import BaseInputMultiImageAt from '@/components/atoms/BaseInputMultiImageAt.vue';
import BaseTextareaAt from "../atoms/BaseTextareaAt.vue";
import BaseSelectBoxAt from "../atoms/BaseSelectBoxAt.vue";
import useUuid from "@/support/uuid";
import { useDate } from "@/support/date";
import useForm from "@/support/form";
import axios from "axios";
import { toast } from 'vue3-toastify';
import { useAPIget } from "@/support/api";
const online = useOnline();
const isLargeScreen = useMediaQuery('(min-width:1024px)');
const visitDate = useDate();
const uuid = useUuid();
const { numberOnly } = useForm();
const location = useGeolocation();
const { error } = useGeolocation();
import router from "@/router";

const status_hubungan = ref("");

const numberInput = {
    numeral: true,
    numeralPositiveOnly: false,
    noImmediatePrefix: false,
    rawValueTrimPrefix: true,
    numeralIntegerScale: 15,
    numeralDecimalScale: 1
};
// const formWarning = ref(false);
const reqSlik = ref(false);
const reqLocation = ref(false);
const accuracyLocation = computed(() => {
    return location.coords.value.accuracy;
});
const locationPermition = ref();

const getCordinate = computed(() => {

    return reqLocation.value ? `${location.coords.value.latitude},${location.coords.value.longitude}` : 'tidak diketahui'
});
const slik = computed(() => {
    return reqSlik.value ? 1 : 0
});
const loadingpost = ref(false);
const messagePost = ref();
const token = localStorage.getItem("token");

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
    },
};
let apibase = import.meta.env.VITE_APP_API_BASE;
const handlePostForm = async () => {
    try {
        loadingpost.value = true;
        await axios.post(`${apibase}/kunjungan`, form, config);
        const ktpAttch = {
            image: slikAttach.file_ktp,
            cr_prospect_id: form.id,
            type: "KTP"
        }
        const kkAttch = {
            image: slikAttach.file_kk,
            cr_prospect_id: form.id,
            type: "KK"
        }
        const buknikAttch = {
            image: slikAttach.file_buknik,
            cr_prospect_id: form.id,
            type: "BUKU NIKAH"
        }

        try {
            //slik attach
            await axios.post(`${apibase}/image_upload_prospect`, ktpAttch, config);
            await axios.post(`${apibase}/image_upload_prospect`, kkAttch, config);
            await axios.post(`${apibase}/image_upload_prospect`, buknikAttch, config);

        } catch (error) {
            console.log(error);
        }
        // block attachment
        for (let i = 0; i <= form.attachment.length; i++) {
            console.log(form.attachment[i]);
            let attachment = {
                image: form.attachment[i],
                cr_prospect_id: form.id,
                type: 'attachment_' + i + 1,
            }
            try {
                // console.log(attachment);
                let storeAttachment = await axios.post(`${apibase}/image_upload_prospect`, attachment, config);
                console.log(storeAttachment);
            } catch (error) {
                console.log(error);
            }
        }
        toast.success("data berhasil disimpan", {
            autoClose: 3000,
            closeButton: false,
            toastClassName: 'rounded-xl bg-white dark:bg-sf-drk-100',
            position: toast.POSITION.TOP_RIGHT,
        });
        loadingpost.value = false;
        router.push('/task/visit');

    } catch (error) {
        console.log(error);
    }
}

const form = reactive({
    id: uuid,
    visit_date: visitDate,
    tujuan_kredit: '',
    jenis_produk: '',
    plafond: '',
    tenor: '',
    nama: '',
    ktp: '',
    kk: '',
    tgl_lahir: '',
    alamat: '',
    hp: '',
    usaha: '',
    sector: '',
    coordinate: getCordinate,
    accurate: accuracyLocation,
    slik: slik,
    jaminan: [],
    penjamin: [],
});
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators'
import ListBoxAt from "../atoms/ListBoxAt.vue";
import LoaderComponent from "../atoms/LoaderComponent.vue";
import CardAt from "../atoms/CardAt.vue";
const rulesCredit = computed(() => {
    const requiredField = helpers.withMessage(`harus diisi !`, required);
    function minLengthField(minVal) {
        const minField =
            helpers.withMessage(
                ({ $params }) => `minimal diisi ${$params.min} digit`,
                minLength(minVal)
            );
        return minField;
    }
    return {
        tujuan_kredit: {
            requiredField,
        },
        plafond: {
            requiredField,
            minLength: minLengthField(6),
        },
        tenor: {
            requiredField,
        },
        nama: {
            requiredField
        },
        ktp: {
            requiredField,
            minLength: minLengthField(16),
        },
        kk: {
            requiredField,
            minLength: minLengthField(16),
        },
        tgl_lahir: {
            requiredField,
        },
        alamat: {
            requiredField,
        }, hp: {
            requiredField,
            minLength: minLengthField(10),
        },
        usaha: {
            requiredField,
        },
        sector: {
            requiredField,
        }
    }
});
const listSelected = (selected) => {
    form.jenis_produk = selected.code
}
const v$ = useVuelidate(rulesCredit, form);
const slikAttach = reactive({
    file_ktp: null,
    file_kk: null,
    file_buknik: null,
});
const typeJaminan = ['bpkb', 'sertifikat'];
const hubungan = ['orang tua', 'pasangan', 'saudara',];
const isPasangan = ref(true);
const tujuan = ['konsumsi', 'investasi', 'modal kerja',];
const stepper = useStepper({
    'credit': {
        title: 'Informasi Kredit',
        icon: 'ri-bank-card-fill',
        isValid: () => form.tujuan_kredit && form.plafond && form.tenor && form.jenis_produk,
    },
    'nasabah': {
        title: 'Data Nasabah',
        icon: 'ri-file-user-fill',
        isValid: () => form.nama && form.ktp && form.kk && form.tgl_lahir && form.alamat && form.hp,
    },
    'jaminan': {
        title: 'Data Jaminan',
        icon: 'ri-file-shield-2-fill',
        isValid: () => form.usaha && form.sector && form.jaminan && form.location,
    },
    // 'selesai': {
    //     title: 'Selesai',
    //     icon: 'bi-patch-check-fill',
    //     isValid: () => form.usaha && form.sector && form.jaminan && form.location,
    // },
})

async function submit() {
    // const result = await v$.value.$validate()
    // if (!result) {
    //     formWarning.value = true;
    // } else {
    //     formWarning.value = false;
    // }

    if (stepper.current.value.isValid())
        stepper.goToNext()
}

function backstep() {
    stepper.goToPrevious();
}

function allStepsBeforeAreValid(index) {
    return !Array(index)
        .fill(null)
        .some((_, i) => !stepper.at(i)?.isValid())
}
const listProduct = ref([]);
const getProductsActive = useAPIget("credit_type/active", token).then(([res]) => { listProduct.value = res });

// const location = useGeolocation();
function addJaminan(index) {
    form.jaminan.push(
        {
            type: '',
            collateral_value: '',
            description: ''
        },
    );
    index
}
function addPenjamin(index) {
    form.penjamin.push(
        {
            nama: '',
            ktp: '',
            tgl_lahir: '',
            pekerjaan: '',
            status: '',
        },
    );
    index
}
function addPasangan(index) {
    form.pasangan.push(
        {
            nama: '',
            ktp: '',
            tgl_lahir: '',
            pekerjaan: '',
            status: '',
        },
    );
    index
}

function removeJaminan(index) {
    form.jaminan.splice(index, 1);
    index
}
function removePenjamin(index) {
    form.penjamin.splice(index, 1);
    index
}
function removePasangan(index) {
    form.pasangan.splice(index, 1);
    index
}
onMounted(() => {
    getProductsActive;
    numberInput;
});

const backPage = () => router.back();
watch(form.penjamin, (n) => {

    let newPenjamin = n.map((element) => {
        return element.status;
    })
    if (newPenjamin.toString() === "pasangan") {
        isPasangan.value = false;
    } else {
        isPasangan.value = true;
    }
})
</script>

<template>
    <CardAt>
        <template #header>
            <div class="flex items-center gap-2 mb-4">
                <div @click="backPage"
                    class="flex text-pr dark:text-pr-500 hover:bg-sfcls dark:hover:bg-sf-drk-200 rounded-full aspect-square p-1 cursor-pointer">
                    <v-icon name="ri-arrow-left-line" scale="1.5"></v-icon>
                </div>
                Input Kunjungan {{ locationPermition }}
            </div>
        </template>
        <template #body>
            <div
                class="flex bg-sfc dark:bg-sf-drk-300 py-4 rounded-xl text-pr dark:text-sf justify-around shadow border-sfd border-2 dark:border-sf-drk-100">
                <div v-for="(step, id, i) in stepper.steps.value" :key="id" class="flex gap-2 cursor-pointer"
                    @click="stepper.goTo(id)" :class="stepper.isBefore(id) ? 'text-sf-drk-600' : 'text-primary'">
                    <button class="flex justify-start" :disabled="!allStepsBeforeAreValid(i) && stepper.isBefore(id)">
                        <div class="flex gap-2 flex-col md:flex-row">
                            <div class="w-11 rounded-full flex items-center justify-center p-2 aspect-square"
                                :class="stepper.isBefore(id) ? 'bg-pr-500/20 text-reg' : 'bg-pr dark:bg-pr-500 text-white'">
                                <v-icon :name="step.icon"></v-icon>
                            </div>
                            <div class="text-left">
                                <div class=" text-xs md:text-sm"> langkah {{ i + 1 }}</div>
                                <div class="font-semibold text-xs md:text-base ">{{ step.title }}</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <form @submit.prevent="submit">
                <div class="flex flex-col justify-center gap-2 mt-2">
                    <div class="bg-sf dark:bg-sf-drk-300 dark:border-sf-drk-100 mt-4 rounded-xl">
                        <div v-if="stepper.isCurrent('credit')">
                            <div>
                                <div class="col-span-2" v-if="isLargeScreen">
                                    <BaseRadioButtonGroup :options="listProduct" v-model="form.jenis_produk"
                                        label="Pilih Produk Kredit" v-if="listProduct.length <= 8">
                                    </BaseRadioButtonGroup>
                                    <ListBoxAt :lists="listProduct" @custom="listSelected" label="Pilih Produk Kredit"
                                        v-else />
                                </div>
                                <div class="col-span-2" v-else>
                                    <ListBoxAt :lists="listProduct" @custom="listSelected" label="Pilih Produk Kredit" />
                                </div>
                                <div v-if="form.jenis_produk" class="grid grid-cols-1 md:grid-cols-3 ">
                                    <BaseSelectBoxAt label="Tujuan Kredit" :options="tujuan" v-model="form.tujuan_kredit" />
                                    {{
                                        status_hubungan }}
                                    <CleaveInputAt label="plafond" v-model="form.plafond" :options="numberInput"
                                        :error="v$.plafond.$error && v$.plafond.$errors[0].$message"
                                        @blur="v$.plafond.$touch" />
                                    <BaseInputAt label="Tenor" @keypress="numberOnly" v-model="form.tenor"
                                        :error="v$.tenor.$error && v$.tenor.$errors[0].$message" @blur="v$.tenor.$touch" />
                                </div>
                            </div>
                        </div>
                        <div v-if="stepper.isCurrent('nasabah')">
                            <div class="grid grid-cols-1 md:grid-cols-3 p-4 bg-sf dark:bg-sf-drk-300 mt-4 rounded-xl">
                                <BaseInputAt label="Nama" v-model="form.nama"
                                    :error="v$.nama.$error && v$.nama.$errors[0].$message" @blur="v$.nama.$touch" />
                                <BaseInputAt label="No KTP" maxlength="16" v-model="form.ktp" @keypress="numberOnly"
                                    :error="v$.ktp.$error && v$.ktp.$errors[0].$message" @blur="v$.ktp.$touch" />
                                <BaseInputAt label="KK" maxlength="16" v-model="form.kk" @keypress="numberOnly"
                                    :error="v$.kk.$error && v$.kk.$errors[0].$message" @blur="v$.kk.$touch" />
                                <BaseInputAt label="Tanggal Lahir" type="date" v-model="form.tgl_lahir"
                                    :error="v$.tgl_lahir.$error && v$.tgl_lahir.$errors[0].$message"
                                    @blur="v$.tgl_lahir.$touch" />
                                <BaseTextareaAt label="Alamat" v-model="form.alamat"
                                    :error="v$.alamat.$error && v$.alamat.$errors[0].$message" @blur="v$.alamat.$touch" />
                                <BaseInputAt label="No Handphone" v-model="form.hp" max-length="13" @keypress="numberOnly"
                                    :error="v$.hp.$error && v$.hp.$errors[0].$message" @blur="v$.hp.$touch" />
                            </div>
                        </div>

                        <div v-if="stepper.isCurrent('jaminan')">
                            <div class="grid grid-col md:grid-cols-2 p-4 bg-sf dark:bg-sf-drk-300 mt-4 rounded-xl">
                                <BaseInputAt label="Usaha" v-model="form.usaha"
                                    :error="v$.usaha.$error && v$.usaha.$errors[0].$message" @blur="v$.usaha.$touch" />
                                <BaseInputAt label="Sector" v-model="form.sector"
                                    :error="v$.sector.$error && v$.sector.$errors[0].$message" @blur="v$.sector.$touch" />

                                <!-- *jaminan -->
                                <div
                                    class="bg-sf dark:bg-sf-drk-200 dark:border-sf-drk-100 border-pr-300 border-2 border-dashed p-2 rounded col-span-2 m-2">
                                    <div class="flex justify-between">
                                        <div>
                                            <label class="flex text-reg pb-2 font-medium">Jaminan
                                            </label>
                                            <label
                                                class="bg-erc text-er border-er border-2 border-tertiary p-1 rounded-xl m-2"
                                                v-if="form.jaminan.length > 0">{{
                                                    form.jaminan.length
                                                }} data jaminan</label>
                                        </div>
                                        <BaseButtonAt
                                            class="flex bg-pr dark:bg-pr-500 gap-2 items-center text-sf w-fit h-fit p-2 "
                                            @click="addJaminan()" v-if="form.jaminan.length <= 100">
                                            <v-icon name="ri-add-circle-line" scale="1.2" />jaminan
                                        </BaseButtonAt>
                                    </div>
                                    <div class="flex flex-col items-end mt-2 bg-sfd dark:bg-sf-drk-400 border-2 border-primary md:border-0 md:flex-row rounded-xl gap-4"
                                        v-for="(jaminan, i) in form.jaminan" :key="i">
                                        <BaseSelectBoxAt label="Jenis" :options="typeJaminan" v-model="jaminan.type" />
                                        <div class="input-wrap w-full p-2 inline-block">
                                            <label class="flex text-reg pb-2 font-medium">Nilai</label>
                                            <cleave v-model="jaminan.collateral_value" :options="numberInput"
                                                class=" dark:bg-sf-drk-200 dark:border-sf-drk-100 disabled:text-reg disabled:cursor-not-allowed
            file:absolute file:right-0 w-full p-2 border-2  focus:outline-none focus:ring-2 focus:ring-primary rounded-md" name="card" />
                                            <label v-if="error" class="flex text-pink-500 pt-2 text-sm">{{ error
                                            }}</label>
                                        </div>

                                        <BaseInputAt label="Deskripsi" v-model="jaminan.description" />
                                        <div class="flex gap-2">
                                            <!-- <BaseButtonAt class="mb-2 bg-reg/70 text-primary p-2 outline-1">
                                            <div class="flex">
                                                <v-icon name="ri-attachment-2" scale="1.2" />
                                                berkas
                                            </div>
                                        </BaseButtonAt> -->
                                            <BaseButtonAt class="mb-2 p-2" @click="removeJaminan(i)">
                                                <v-icon name="ri-delete-back-2-line" scale="1.2"
                                                    class="text-reg hover:text-signal-danger" />
                                            </BaseButtonAt>
                                        </div>

                                    </div>

                                </div>
                                <!-- end jaminan -->

                                <!-- *penjamin -->
                                <div
                                    class="bg-sf dark:bg-sf-drk-200 dark:border-sf-drk-100 border-pr-300 border-2 border-dashed p-2 rounded col-span-2 m-2">
                                    <div class="flex justify-between">
                                        <div>
                                            <label class="flex text-reg pb-2 font-medium">Penjamin</label>
                                            <label
                                                class="bg-erc text-er border-er border-2 border-tertiary p-1 rounded-xl m-2"
                                                v-if="form.penjamin.length > 0">{{
                                                    form.penjamin.length
                                                }} data penjamin</label>
                                        </div>
                                        <BaseButtonAt
                                            class="flex bg-pr dark:bg-pr-500 gap-2 items-center text-sf w-fit h-fit p-2"
                                            @click="addPenjamin()" v-if="form.penjamin.length <= 100">
                                            <v-icon name="ri-add-circle-line" scale="1.2" />penjamin
                                        </BaseButtonAt>
                                    </div>
                                    <div class="flex flex-col items-end mt-2 bg-sfd dark:bg-sf-drk-400 border-2 border-primary md:border-0 md:flex-row rounded-xl gap-4"
                                        v-for="(penjamin, i) in form.penjamin" :key="i">
                                        <BaseInputAt label="Nama" v-model="penjamin.nama" />
                                        <BaseInputAt label="No KTP Penjamin" v-model="penjamin.ktp" maxlength="16" />
                                        <BaseInputAt label="Tanggal Lahir" type="date" v-model="penjamin.tgl_lahir" />
                                        <BaseInputAt label="Pekerjaan" v-model="penjamin.pekerjaan" />
                                        <BaseSelectBoxAt label="Hubungan" :options="hubungan" v-model="penjamin.status" />{{
                                            status_hubungan }}
                                        <BaseButtonAt class="mb-2 p-2" @click="removePenjamin(i)">
                                            <v-icon name="ri-delete-back-2-line" scale="1.2"
                                                class="text-reg hover:text-signal-danger" />
                                        </BaseButtonAt>
                                    </div>
                                </div>
                                <!-- end penjamin -->
                                <!-- *slik request -->
                                <div class="p-2 col-span-2">
                                    <div class="w-full p-4 rounded-xl bg-sfc dark:bg-sf-drk-200 text-pr dark:text-sf">
                                        <div class="flex justify-between text-primary
                        font-semibold">
                                            <div>Ajukan slik</div>
                                            <div>
                                                <SwitchAt v-model="reqSlik" />
                                            </div>
                                        </div>
                                        <Transition>
                                            <div v-if="form.slik"
                                                class="bg-sfcl dark:bg-sf-drk-400 mt-2 border-2 border-dashed border-signal-warning p-2 rounded col-span-2 ">
                                                <div class="grid grid-flow-col p-2 gap-4"
                                                    :class="!isPasangan ? 'grid-cols-3' : 'grid-cols-2'">
                                                    <BaseInputSingleImageAt label="KTP" v-model="slikAttach.file_ktp"
                                                        @reset-image="slikAttach.file_ktp = null" />
                                                    <BaseInputSingleImageAt label="Kartu Keluarga"
                                                        v-model="slikAttach.file_kk"
                                                        @reset-image="slikAttach.file_kk = null" />
                                                    <BaseInputSingleImageAt v-if="!isPasangan" label="Buku Nikah"
                                                        v-model="slikAttach.file_buknik"
                                                        @reset-image="slikAttach.file_buknik = null" />
                                                </div>
                                            </div>
                                        </Transition>
                                    </div>
                                </div>
                                <!-- endslik -->
                                <BaseInputMultiImageAt label="Lampiran Kunjungan" class="col-span-2"
                                    v-model="form.attachment">
                                </BaseInputMultiImageAt>
                                <div class="p-2 col-span-2">
                                    <div class="p-2 bg-sfc dark:bg-sf-drk-200 rounded-xl ">
                                        <div
                                            class="flex w-full p-4 justify-between items-center text-primary font-semibold">
                                            <div class="flex items-center gap-2">
                                                <div
                                                    class="w-11 rounded-full flex items-center justify-center p-2 aspect-square bg-pr text-white">
                                                    <v-icon name="ri-map-pin-line"></v-icon>
                                                </div>
                                                <div>Buat Titik Lokasi</div>
                                            </div>
                                            <div>
                                                <SwitchAt v-model="reqLocation" />
                                            </div>
                                        </div>
                                        <div v-if="reqLocation" class="grid grid-cols-3">
                                            <BaseInputAt label="Longitude" disabled
                                                :value="location.coords.value.longitude" />
                                            <BaseInputAt label="Latitude" disabled
                                                :value="location.coords.value.latitude" />
                                            <BaseInputAt label="Accuracy" disabled
                                                :value="location.coords.value.accuracy" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="stepper.isCurrent('selesai')">
                            <div class="flex w-full justify-center">
                                <LoaderComponent />
                            </div>
                        </div>
                        <div class="flex gap-4 p-2 justify-between pt-10">
                            <BaseButtonAt @click="backstep" v-if="!stepper.isFirst.value"
                                class="text-pr bg-sfc justify-center dark:bg-sfcl-500 font-semibold disabled:cursor-not-allowed disabled:bg-plate disabled:text-reg rounded-xl dark:text-sf-drk-200 p-2 w-full md:w-1/5 h-15">
                                kembali
                            </BaseButtonAt>

                            <BaseButtonAt v-if="!stepper.isLast.value"
                                class="bg-pr justify-center dark:bg-pr-500 hover:bg-pr/90 font-semibold hover:shadow-md disabled:cursor-not-allowed disabled:bg-plate disabled:text-reg rounded-xl text-white dark:text-white w-full md:w-1/5 h-15">
                                Selanjutnya
                            </BaseButtonAt>
                            <BaseButtonAt v-if="stepper.isLast.value" @click="handlePostForm" :disabled="loadingpost"
                                class="bg-pr justify-center dark:bg-pr-500 hover:bg-pr/90 font-semibold hover:shadow-md disabled:cursor-not-allowed disabled:bg-plate disabled:text-reg bg-primary rounded-xl text-white w-full md:w-1/5 h-15">
                                <span v-if="!loadingpost">Simpan</span>
                                <div v-else>
                                    <LoaderComponent />
                                </div>
                            </BaseButtonAt>
                        </div>
                    </div>
                </div>
            </form>
        </template>
    </CardAt>
    <Transition>
        <OverlayAt v-if="!online" />
    </Transition>
</template>