<script setup>
import BaseInputSingleImageAt from '@/components/atoms/BaseInputSingleImageAt.vue';
import router from "@/router";
import { useAPIget } from "@/support/api";
import { useDate } from "@/support/date";
import useForm from "@/support/form";
import useUuid from "@/support/uuid";
import { useVuelidate } from '@vuelidate/core';
import { helpers, minLength, required } from '@vuelidate/validators';
import { useMediaQuery, useOnline, useStepper } from "@vueuse/core";
import axios from "axios";
import { computed, onMounted, reactive, ref, toRef, watch } from 'vue';
import { toast } from 'vue3-toastify';
import BaseButtonAt from "../atoms/BaseButtonAt.vue";
import BaseInputAt from '../atoms/BaseInputAt.vue';
import BaseSelectBoxAt from "../atoms/BaseSelectBoxAt.vue";
import CardAt from "../atoms/CardAt.vue";
import OverlayAt from "../atoms/OverlayAt.vue";
import SelectState from "../organism/SelectStateRegion.vue";
const online = useOnline();
const isLargeScreen = useMediaQuery('(min-width:1024px)');
const visitDate = useDate();
const uuid = useUuid();
const { numberOnly } = useForm();

const numberInput = {
    numeral: true,
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
    'pinjaman': {
        title: 'Informasi Pinjaman',
        icon: 'hi-credit-card',
        isValid: () => form.tujuan_kredit && form.plafond && form.tenor && form.jenis_produk,
    },
    'nasabah': {
        title: 'Data Nasabah',
        icon: 'hi-user',
        isValid: () => form.nama && form.ktp && form.kk && form.tgl_lahir && form.alamat && form.hp,
    },
    'pekerjaan': {
        title: 'Data Pekerjaan',
        icon: 'hi-briefcase',
        isValid: () => form.usaha && form.sector && form.jaminan && form.location,
    },
    'jaminan': {
        title: 'Data Jaminan',
        icon: 'hi-shield-check',
        isValid: () => form.usaha && form.sector && form.jaminan && form.location,
    }
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
import { useProspect } from "@/stores/useProspect.js";
const prospectStore = useProspect();
const storePinjaman = toRef(prospectStore.formData.pinjaman);
</script>

<template>
    <CardAt>

        <template #body>
            {{ storePinjaman }}
            <div
                class="flex flex-col md:flex-row dark:bg-sf-drk-300 py-4 rounded-xl dark:text-sf justify-start gap-2 dark:border-sf-drk-100">
                <div v-for="(step, id, i) in stepper.steps.value" :key="id" class="flex gap-2 cursor-pointer"
                    @click="stepper.goTo(id)" :class="stepper.isBefore(id) ? 'text-sf-drk-600' : 'text-primary'">
                    <button class="flex w-full justify-start">
                        <div class="flex border p-4 rounded-xl bg-white gap-2 md:flex-row">
                            <div class="w-11 rounded-full flex items-center justify-center p-2 aspect-square"
                                :class="stepper.isBefore(id) ? 'bg-pr-700/20 text-white' : 'bg-pr text-white dark:bg-pr-500'">
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
                <div>
                    <div v-if="stepper.isCurrent('pinjaman')">
                        <KeepAlive>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 border rounded-md">
                                <BaseInputAt label="cust_code_ref" v-model="storePinjaman.cust_code_ref" />
                                <BaseSelectBoxAt label="Tujuan Kredit" :options="tujuan"
                                    v-model="storePinjaman.tujuan_kredit" />
                                <BaseInputAt max=20 :options="numberInput" label="plafond"
                                    v-model="storePinjaman.plafond"
                                    :error="v$.plafond.$error && v$.plafond.$errors[0].$message"
                                    @blur="v$.plafond.$touch" />
                                <BaseSelectBoxAt label="Tenor" :options="tujuan" v-model="storePinjaman.tenor" />
                                <BaseSelectBoxAt label="Kategori" :options="tujuan" v-model="storePinjaman.kategori" />
                            </div>
                        </KeepAlive>
                    </div>
                    <div v-if="!stepper.isCurrent('nasabah')">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 border rounded-md ">
                            <div class="flex gap-4 py-4 col-span-3 h-52">
                                <BaseInputSingleImageAt label="KTP" v-model="slikAttach.file_ktp"
                                    @reset-image="slikAttach.file_ktp = null" />
                                <BaseInputSingleImageAt label="KTP Pasangan" v-model="slikAttach.file_ktp"
                                    @reset-image="slikAttach.file_ktp = null" />
                                <BaseInputSingleImageAt label="KK" v-model="slikAttach.file_ktp"
                                    @reset-image="slikAttach.file_ktp = null" />
                            </div>
                            <div class="col-span-3 gap-4 grid grid-cols-3 p-2">
                                <BaseInputAt label="No KTP" v-model="form.ktp" @keypress="numberOnly"
                                    :error="v$.ktp.$error && v$.tenor.$ktp[0].$message" @blur="v$.ktp.$touch" max=16 />
                                <BaseInputAt label="nama" v-model="form.tenor"
                                    :error="v$.tenor.$error && v$.tenor.$errors[0].$message" @blur="v$.tenor.$touch" />
                                <BaseInputAt label="tanggal lahir" type="date" v-model="form.tenor"
                                    :error="v$.tenor.$error && v$.tenor.$errors[0].$message" @blur="v$.tenor.$touch" />
                                <SelectState />
                                <BaseInputAt label="No Handphone" max=13 v-model="form.hp" @keypress="numberOnly"
                                    :options="phoneFormat" :error="v$.hp.$error && v$.hp.$errors[0].$message"
                                    @blur="v$.hp.$touch" />
                                <BaseInputAt label="Nama Ibu Kandung" />
                                <BaseInputAt label="dependants" />
                                <BaseInputAt label="TIN Number" />
                                <BaseInputAt label="title" />
                            </div>
                        </div>
                    </div>
                    <div v-if="!stepper.isCurrent('pekerjaan')">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 border rounded-md">
                            <BaseInputAt label="lama bekerja" type="number">
                                <template #trail>
                                    bulan
                                </template>
                            </BaseInputAt>
                            <BaseInputAt label="pendapatan" type="number">
                                <template #trail>
                                    perbulan
                                </template>
                            </BaseInputAt>
                            <BaseInputAt label="pendapatan pasangan" type="number">
                                <template #trail>
                                    perbulan
                                </template>
                            </BaseInputAt>
                            <BaseInputAt label="pendapatan lain-lain" type="number">
                                <template #trail>
                                    perbulan
                                </template>
                            </BaseInputAt>
                            <BaseInputAt label="pengeluaran" type="number">
                                <template #trail>
                                    perbulan
                                </template>
                            </BaseInputAt>
                            <BaseInputAt label="referensi pembayaran" />
                            <BaseInputAt label="usaha" />
                            <BaseInputAt label="sektor" />
                            <BaseInputAt label="Catatan Survey" />
                        </div>
                    </div>
                    <div v-if="!stepper.isCurrent('jaminan')" class="grid grid-cols-2 gap-4">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 border rounded-md">
                            <div>Lampiran Jaminan</div>
                            <div class="flex gap-4 col-span-3 h-32">
                                <BaseInputSingleImageAt label="NO Rangka" v-model="slikAttach.file_ktp"
                                    @reset-image="slikAttach.file_ktp = null" />
                                <BaseInputSingleImageAt label="No Mesin" v-model="slikAttach.file_ktp"
                                    @reset-image="slikAttach.file_ktp = null" />
                                <BaseInputSingleImageAt label="STNK" v-model="slikAttach.file_ktp"
                                    @reset-image="slikAttach.file_ktp = null" />
                            </div>
                            <div class="flex gap-4 col-span-3 h-28">
                                <BaseInputSingleImageAt label="depan" v-model="slikAttach.file_ktp"
                                    @reset-image="slikAttach.file_ktp = null" />
                                <BaseInputSingleImageAt label="belakang" v-model="slikAttach.file_ktp"
                                    @reset-image="slikAttach.file_ktp = null" />
                                <BaseInputSingleImageAt label="kanan" v-model="slikAttach.file_ktp"
                                    @reset-image="slikAttach.file_ktp = null" />
                                <BaseInputSingleImageAt label="kiri" v-model="slikAttach.file_ktp"
                                    @reset-image="slikAttach.file_ktp = null" />
                            </div>
                        </div>
                        <div class="grid bg-white p-4 border rounded-md gap-4">
                            <div class="col-span-3 pb-4">Detail Jaminan</div>
                            <div class="grid gap-4 grid-cols-1">
                                <BaseSelectBoxAt label="Tipe Kendaraan" :options="tujuan"
                                    v-model="form.tujuan_kredit" />
                                <div class="flex gap-4">
                                    <BaseInputAt label="merk" />
                                    <BaseInputAt label="tahun" />
                                    <BaseInputAt label="warna" />
                                </div>
                                <div class="flex gap-4">
                                    <BaseInputAt label="atas nama" />
                                    <BaseInputAt label="nilai jaminan" />
                                </div>
                                <div class="flex gap-4">
                                    <BaseInputAt label="NO polisi" />
                                    <BaseInputAt label="NO rangka" />
                                </div>
                                <div class="flex gap-4">
                                    <BaseInputAt label="NO mesin" />
                                    <BaseInputAt label="NO BPKB" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="flex justify-between">
                <BaseButtonAt def class="my-4 font-semibold">Sebelumnya</BaseButtonAt>
                <BaseButtonAt class="bg-pr !text-white my-4 font-semibold">Selanjutnya</BaseButtonAt>
            </div>
        </template>
    </CardAt>
    <Transition>
        <OverlayAt v-if="!online" />
    </Transition>
</template>