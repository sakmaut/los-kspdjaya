<script setup>
import { useStepper, useGeolocation, useOnline, useMediaQuery } from "@vueuse/core";
import { onMounted, reactive, ref, computed, watch } from 'vue'
import BaseInputAt from '../atoms/BaseInputAt.vue';
import InputFormAt from '../atoms/InputFormAt.vue';
import OverlayAt from "../atoms/OverlayAt.vue";
import BaseButtonAt from "../atoms/BaseButtonAt.vue";
import BaseInputSingleImageAt from '@/components/atoms/BaseInputSingleImageAt.vue';
import BaseInputMultiImageAt from '@/components/atoms/BaseInputMultiImageAt.vue';
import HeadContainer from '@/components/atoms/HeadContainerAt.vue';
import BaseSelectBoxAt from "../atoms/BaseSelectBoxAt.vue";
import SelectState from "../organism/SelectStateRegion.vue";
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
import router from "@/router";

const numberInput = {
    numeral: true,
    prefix: 'Rp ',
    noImmediatePrefix: true
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
    tujuan_kredit: 'pilih',
    jenis_produk: '',
    plafond: '',
    tenor: 'pilih',
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
        title: 'Data Nasabah & Pasangan',
        icon: 'ri-file-user-fill',
        isValid: () => form.nama && form.ktp && form.kk && form.tgl_lahir && form.alamat && form.hp,
    },
    'usaha': {
        title: 'Data Usaha',
        icon: 'ri-file-shield-2-fill',
        isValid: () => form.usaha && form.sector && form.jaminan && form.location,
    },
    'jaminan': {
        title: 'Data Jaminan',
        icon: 'ri-file-shield-2-fill',
        isValid: () => form.usaha && form.sector && form.jaminan && form.location,
    },
    'Lampiran': {
        title: 'Data Lampiran',
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
        <template #body>
            <div
                class="flex flex-col md:flex-row dark:bg-sf-drk-300 py-4 rounded-xl dark:text-sf justify-start gap-2 dark:border-sf-drk-100">
                <div v-for="(step, id, i) in stepper.steps.value" :key="id" class="flex gap-2 cursor-pointer"
                    @click="stepper.goTo(id)" :class="stepper.isBefore(id) ? 'text-sf-drk-600' : 'text-primary'">
                    <button class="flex w-full justify-start"
                        :disabled="!allStepsBeforeAreValid(i) && stepper.isBefore(id)">
                        <div class="flex border p-4 rounded-xl gap-2 md:flex-row">
                            <div class="w-11 rounded-full flex items-center justify-center p-2 aspect-square"
                                :class="stepper.isBefore(id) ? 'bg-accent/20 text-sc-300' : 'bg-accent dark:bg-pr-500'">
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
            <HeadContainer title="Form Kunjungan" subtitle="form inputan kunjungan nasabah" />
            <form @submit.prevent="submit">
                <div class=" mt-4 rounded-xl">
                    <div class="text-base italic text-sc-300 py-2 pb-4">
                        Informasi Kredit
                        <hr />
                    </div>
                    <div v-if="stepper.isCurrent('credit')">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <BaseSelectBoxAt label="Tujuan Kredit" :options="tujuan" v-model="form.tujuan_kredit" />
                            <BaseInputAt max=20 :options="numberInput" label="plafond" v-model="form.plafond"
                                :error="v$.plafond.$error && v$.plafond.$errors[0].$message"
                                @blur="v$.plafond.$touch" />
                            <BaseSelectBoxAt label="Tenor" :options="tujuan" v-model="form.tujuan_kredit" />
                        </div>
                    </div>
                    <div class="text-base italic text-sc-300 py-2">
                        Informasi Nasabah
                        <hr />
                    </div>
                    <div v-if="stepper.isCurrent('credit')">
                        <div class="grid grid-cols-1 md:grid-cols-4 ">

                            <BaseInputSingleImageAt label="KTP" v-model="slikAttach.file_ktp"
                                @reset-image="slikAttach.file_ktp = null" />
                            <div class="col-span-3 gap-2 grid grid-cols-3 p-2">
                                <BaseInputAt label="No KTP" v-model="form.ktp" @keypress="numberOnly"
                                    :error="v$.ktp.$error && v$.tenor.$ktp[0].$message" @blur="v$.ktp.$touch" max=16 />
                                <BaseInputAt label="nama" v-model="form.tenor"
                                    :error="v$.tenor.$error && v$.tenor.$errors[0].$message" @blur="v$.tenor.$touch" />
                                <InputFormAt label="tanggal lahir" type="date" v-model="form.tenor"
                                    :error="v$.tenor.$error && v$.tenor.$errors[0].$message" @blur="v$.tenor.$touch" />
                                <BaseInputAt label="No Handphone" max=13 v-model="form.hp" @keypress="numberOnly"
                                    :options="phoneFormat" :error="v$.hp.$error && v$.hp.$errors[0].$message"
                                    @blur="v$.hp.$touch" />
                                <div class="col-span-3 flex gap-2">
                                    <BaseInputAt label="alamat" class="w-11/12" v-model="form.alamat"
                                        :error="v$.alamat.$error && v$.alamat.$errors[0].$message"
                                        @blur="v$.alamat.$touch" />
                                    <BaseInputAt label="RT" max=3 v-model="form.nama"
                                        :error="v$.nama.$error && v$.nama.$errors[0].$message" @blur="v$.nama.$touch" />
                                    <BaseInputAt label="RW" max=3 v-model="form.nama"
                                        :error="v$.nama.$error && v$.nama.$errors[0].$message" @blur="v$.nama.$touch" />
                                </div>
                                <SelectState />
                            </div>
                        </div>
                    </div>
                    <div class="text-base italic text-sc-300 py-2">
                        Informasi Pasangan
                        <hr />
                    </div>
                    <div v-if="stepper.isCurrent('credit')">
                        <div class="grid grid-cols-1 md:grid-cols-4 ">
                            <BaseInputSingleImageAt label="KTP Pasangan" v-model="slikAttach.file_ktp"
                                @reset-image="slikAttach.file_ktp = null" />
                            <div class="col-span-3 gap-2 grid grid-cols-3 p-2">
                                <BaseInputAt label="No KTP" v-model="form.tenor"
                                    :error="v$.tenor.$error && v$.tenor.$errors[0].$message" @blur="v$.tenor.$touch" />
                                <BaseInputAt label="nama" v-model="form.tenor"
                                    :error="v$.tenor.$error && v$.tenor.$errors[0].$message" @blur="v$.tenor.$touch" />
                                <BaseInputAt label="tanggal lahir" v-model="form.tenor"
                                    :error="v$.tenor.$error && v$.tenor.$errors[0].$message" @blur="v$.tenor.$touch" />
                                <div class="col-span-3 flex gap-2">
                                    <BaseInputAt label="alamat" class="w-11/12" v-model="form.nama"
                                        :error="v$.nama.$error && v$.nama.$errors[0].$message" @blur="v$.nama.$touch" />
                                    <BaseInputAt label="Rt" v-model="form.nama"
                                        :error="v$.nama.$error && v$.nama.$errors[0].$message" @blur="v$.nama.$touch" />
                                    <BaseInputAt label="Rw" v-model="form.nama"
                                        :error="v$.nama.$error && v$.nama.$errors[0].$message" @blur="v$.nama.$touch" />
                                </div>
                                <SelectState />
                            </div>
                        </div>
                    </div>
                    <div class="text-base italic text-sc-300 py-2">
                        Informasi Kartu Keluarga
                        <hr />
                    </div>
                    <div v-if="stepper.isCurrent('credit')">
                        <div class="grid grid-cols-1 md:grid-cols-4 ">
                            <BaseInputSingleImageAt label="KK" v-model="slikAttach.file_ktp"
                                @reset-image="slikAttach.file_ktp = null" />
                            <div class="col-span-3 gap-2 grid  p-2">
                                <BaseInputAt label="No KK" v-model="form.tenor" @keypress="numberOnly"
                                    :error="v$.tenor.$error && v$.tenor.$errors[0].$message" @blur="v$.tenor.$touch" />
                            </div>
                        </div>
                    </div>
                    <div class="text-base italic text-sc-300 py-2">
                        Informasi Usaha
                        <hr />
                    </div>
                    <div v-if="stepper.isCurrent('credit')">
                        <div class="grid grid-cols-1">
                            <BaseInputMultiImageAt label="Foto Usaha" v-model="slikAttach.file_ktp"
                                @reset-image="slikAttach.file_ktp = null" />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <BaseInputAt label="Nama Usaha" v-model="form.tenor"
                                :error="v$.tenor.$error && v$.tenor.$errors[0].$message" @blur="v$.tenor.$touch" />
                            <BaseInputAt label="Sektor Usaha" v-model="form.tenor"
                                :error="v$.tenor.$error && v$.tenor.$errors[0].$message" @blur="v$.tenor.$touch" />
                            <BaseInputAt label="Lama Usaha (bulan)" v-model="form.tenor"
                                :error="v$.tenor.$error && v$.tenor.$errors[0].$message" @blur="v$.tenor.$touch" />
                        </div>
                    </div>
                </div>
                <div class="text-base italic text-sc-300 py-2">
                    Informasi Jaminan
                    <hr />
                </div>
                <div v-if="stepper.isCurrent('credit')">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                        <div class="flex h-40">
                            <BaseInputSingleImageAt label="STNK" v-model="slikAttach.file_ktp"
                                @reset-image="slikAttach.file_ktp = null" />
                        </div>
                        <div class="flex h-40">
                            <BaseInputSingleImageAt label="No Rangka" v-model="slikAttach.file_ktp"
                                @reset-image="slikAttach.file_ktp = null" />
                        </div>
                        <div class="flex h-40">
                            <BaseInputSingleImageAt label="No Mesin" v-model="slikAttach.file_ktp"
                                @reset-image="slikAttach.file_ktp = null" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <BaseInputSingleImageAt label="Foto Depan" v-model="slikAttach.file_ktp"
                            @reset-image="slikAttach.file_ktp = null" />
                        <BaseInputSingleImageAt label="Foto Belakang" v-model="slikAttach.file_ktp"
                            @reset-image="slikAttach.file_ktp = null" />
                        <BaseInputSingleImageAt label="Foto Kanan" v-model="slikAttach.file_ktp"
                            @reset-image="slikAttach.file_ktp = null" />
                        <BaseInputSingleImageAt label="Foto Kiri" v-model="slikAttach.file_ktp"
                            @reset-image="slikAttach.file_ktp = null" />
                    </div>
                </div>

                <div class="text-base italic text-sc-300 py-2">
                    Lampiran lain-lain
                    <hr />
                </div>
                <div v-if="stepper.isCurrent('credit')">
                    <div class="grid grid-cols-1 gap-2 mb-2">
                        <BaseInputMultiImageAt label="Lampiran Lain Lain" class="col-span-2" v-model="form.attachment">
                        </BaseInputMultiImageAt>
                    </div>
                </div>
                <div v-if="stepper.isCurrent('!selesai')">
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
            </form>
        </template>
    </CardAt>
    <Transition>
        <OverlayAt v-if="!online" />
    </Transition>
</template>