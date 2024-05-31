<template>
    <Teleport to="body">
        <div class="fixed top-0 m-auto w-full z-50 h-full bg-black/30 backdrop-blur" v-show="overlayLoad">
            <div class="flex items-center justify-center w-full h-full">
                <div class="p-4 bg-white rounded animate-pulse">
                    <LoaderComponent />
                </div>
            </div>
        </div>
    </Teleport>
    <div class="sticky z-30 md:top-12 top-20 flex bg-white md:gap-4 border rounded-lg p2 md:p-4">
        <div v-for="(step, id, i) in stepper.steps.value" :key="id" class="flex gap-2 cursor-pointer p-2 ">
            <button class="flex justify-start" @click="stepper.goTo(id)">
                <div class="flex gap-2  md:flex-row"
                    :class="!allStepsBeforeAreValid(i) && stepper.isBefore(id) ? '' : ''">
                    <div class="w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center  p-2 aspect-square"
                        :class="stepper.isBefore(id) ? 'bg-pr-100/50 text-pr-500' : 'bg-pr dark:bg-pr-500 text-white'">
                        <v-icon :name="step.icon"></v-icon>
                    </div>
                    <div v-if="stepper.at(i).isValid()"
                        class=" text-white font-bold flex justify-center items-center bg-green-500 w-3 h-3 md:w-5 md:h-5 absolute -ml-1 md:-ml-2 mt-3 rounded-full">
                        <v-icon name="fa-check" scale="0.6"></v-icon>
                    </div>
                    <div v-if="stepper.isCurrent(stepper.stepNames.value[i])">
                        <div class="text-left"
                            :class="!allStepsBeforeAreValid(i) && stepper.isBefore(id) ? 'hidden' : 'text-pr'">
                            <div class=" text-xs md:text-sm"> langkah {{ i + 1 }}</div>
                            <div class="font-semibold text-xs md:text-base ">{{ step.title }}</div>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    </div>
    <!-- <PreRender :data="payload"></PreRender> -->
    <form @submit.prevent="submit" class="py-4">
        <KeepAlive>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 border rounded-md"
                v-if="stepper.isCurrent('order')">
                <div class="md:col-span-2">Data Order</div>
                <BaseInputAt max=20 label="plafond" :options="numberInput" v-model="order.plafond" />
                <BaseSelectBoxAt label="Tujuan Kredit" :options="optionList.tujuan_kredit"
                    v-model="order.tujuan_kredit" />
                <BaseSelectBoxAt label="Tenor" :options="optionList.tenor" v-model="order.tenor" />
                <BaseSelectBoxAt label="Kategori" :options="optionList.kategori" v-model="order.category" />
            </div>
        </KeepAlive>
        <KeepAlive>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 border rounded-md"
                v-if="stepper.isCurrent('pelanggan')">
                <div class="md:col-span-3">Data Pelanggan</div>

                <div class="h-60 flex">
                    <BaseInputSingleImageAt label="KTP" v-model="attachSingle.file_ktp"
                        @reset-image="attach.file_ktp = null" class="h-10" />
                </div>
                <div class="h-60 flex">
                    <BaseInputSingleImageAt label="KTP Pasangan" v-model="attachSingle.file_ktp_pasangan"
                        @reset-image="attach.file_ktp = null" />
                </div>
                <div class="h-60 flex">
                    <BaseInputSingleImageAt label="KK" v-model="attachSingle.file_kk"
                        @reset-image="attach.file_ktp = null" />
                </div>
                <div class="md:col-span-3 gap-4 grid md:grid-cols-2 p-2">
                    <BaseInputAt label="No KTP" v-model="nasabah.no_ktp" @keypress="numberOnly" max=16 />
                    <BaseInputAt label="nama" v-model="nasabah.nama" />
                    <BaseInputAt label="tanggal lahir" type="date" v-model="nasabah.tgl_lahir" />
                    <div class="grid grid-cols-6 gap-4">
                        <BaseInputAt label="alamat" v-model="nasabah.data_alamat.alamat" class="col-span-4" />
                        <BaseInputAt label="rt" v-model="nasabah.data_alamat.rt" />
                        <BaseInputAt label="rw" v-model="nasabah.data_alamat.rw" />
                    </div>
                    <SelectStateRegion v-model:provinsi="nasabah.data_alamat.provinsi"
                        v-model:kota="nasabah.data_alamat.kota" v-model:kecamatan="nasabah.data_alamat.kecamatan"
                        v-model:desa="nasabah.data_alamat.kelurahan" />
                    <BaseInputAt label="No Handphone" max=13 v-model="nasabah.no_hp" @keypress="numberOnly" />
                </div>
            </div>
        </KeepAlive>
        <KeepAlive>
            <div>
                <div class="flex flex-col gap-4 bg-white p-4 border rounded-md" v-if="stepper.isCurrent('jaminan')">
                    <div class="flex justify-between">Data Jaminan
                        <BaseButtonAt class="bg-pr !text-white border-pr border" @click="addJaminan">tambah jaminan
                        </BaseButtonAt>
                    </div>
                    <div v-for="(jaminan, i) in payload.jaminan_kendaraan" key="jaminan">
                        <div class="flex justify-between py-2 items-center gap-2 jus">
                            <div class="flex w-full">Jaminan {{ i + 1 }}</div>
                            <div class="flex gap-2 justify-between text-nowrap" v-if="i >= 1">
                                <BaseButtonAt class="bg-pr !text-white" @click="addJaminan"><v-icon
                                        name="hi-solid-plus-sm" />
                                </BaseButtonAt>
                                <BaseButtonAt class="bg-er !text-white" @click="removeJaminan(i)"><v-icon
                                        name="hi-solid-minus-sm" />
                                </BaseButtonAt>
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="grid md:grid-cols-5 gap-4">
                                <div class="flex h-60 md:h-auto">
                                    <BaseInputSingleImageAt label="NO Rangka" v-model="attachJaminan.file_no_rangka"
                                        @reset-image="attachJaminan.file_no_rangka = null" />
                                </div>
                                <div class="flex h-60 md:h-auto">
                                    <BaseInputSingleImageAt label="No Mesin" v-model="attachJaminan.file_no_mesin"
                                        @reset-image="attachJaminan.file_no_mesin = null" />
                                </div>
                                <div class="flex h-60 md:h-auto">
                                    <BaseInputSingleImageAt label="STNK" v-model="attachJaminan.file_stnk"
                                        @reset-image="attachJaminan.file_stnk = null" />
                                </div>
                                <div class="flex h-60 md:h-auto">
                                    <BaseInputSingleImageAt label="depan" v-model="attachJaminan.file_depan"
                                        @reset-image="attachJaminan.file_depan = null" />
                                </div>
                                <div class="flex h-60 md:h-auto ">
                                    <BaseInputSingleImageAt label="belakang" v-model="attachJaminan.file_belakang"
                                        @reset-image="attachJaminan.file_belakang = null" />
                                </div>
                                <div class="flex h-60 md:h-auto">
                                    <BaseInputSingleImageAt label="kanan" v-model="attachJaminan.file_kanan"
                                        @reset-image="attachJaminan.file_kanan = null" />
                                </div>
                                <div class="flex  h-60 md:h-auto">
                                    <BaseInputSingleImageAt label="kiri" v-model="attachJaminan.file_kiri"
                                        @reset-image="attachJaminan.file_kiri = null" />
                                </div>
                            </div>
                            <div class="flex flex-col bg-white  gap-4">
                                <div class="flex flex-col border p-4 gap-4 rounded-md">
                                    <div class="pb-4 ">Detail Jaminan
                                    </div>
                                    <div class="grid md:grid-cols-2 gap-4 ">
                                        <BaseSelectBoxAt label="Tipe Kendaraan" :options="optionList.tipe_kendaraan"
                                            v-model="jaminan.tipe" />
                                        <BaseInputAt label="merk" v-model="jaminan.merk" />
                                        <BaseInputAt label="tahun" v-model="jaminan.tahun" />
                                        <BaseInputAt label="warna" v-model="jaminan.warna" />
                                        <BaseInputAt label="atas nama" v-model="jaminan.atas_nama" />
                                        <BaseInputAt label="nilai data_jaminan" v-model="jaminan.nilai" />
                                        <BaseInputAt label="NO polisi" v-model="jaminan.no_polisi" />
                                        <BaseInputAt label="NO rangka" v-model="jaminan.no_rangka" />
                                        <BaseInputAt label="NO mesin" v-model="jaminan.no_mesin" />
                                        <BaseInputAt label="NO STNK" v-model="jaminan.no_stnk" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </KeepAlive>
        <KeepAlive>
            <div class="flex flex-col  gap-4 bg-white p-4 border rounded-md" v-if="stepper.isCurrent('survey')">
                <div class="">Data Survey</div>
                <div class="grid md:grid-cols-2 gap-4">
                    <BaseInputAt type="date" label="tanggal survey" v-model="survey.tgl_survey" />
                    <BaseInputAt label="lama bekerja" type="number" v-model="survey.lama_bekerja">
                        <template #trail>
                            bulan
                        </template>
                    </BaseInputAt>
                    <BaseInputAt label="pendapatan pelanggan" type="number" v-model="survey.penghasilan.pribadi">
                        <template #trail>
                            perbulan
                        </template>
                    </BaseInputAt>
                    <BaseInputAt label="pendapatan pasangan" type="number" v-model="survey.penghasilan.pasangan">
                        <template #trail>
                            perbulan
                        </template>
                    </BaseInputAt>
                    <BaseInputAt label="pendapatan lain-lain" type="number" v-model="survey.penghasilan.lainnya">
                        <template #trail>
                            perbulan
                        </template>
                    </BaseInputAt>
                    <BaseInputAt label="pengeluaran" type="number" v-model="survey.pengeluaran">
                        <template #trail>
                            perbulan
                        </template>
                    </BaseInputAt>
                    <BaseInputAt label="usaha" v-model="survey.usaha" />
                    <BaseInputAt label="sektor" v-model="survey.sektor" />
                    <div class="md:col-span-2">
                        <BaseTextareaAt label="Catatan Survey" v-model="survey.catatan_survey" />
                    </div>
                    <div class="md:col-span-2">
                        <div class="flex justify-between">Dokumen pendukung
                        </div>
                        <BaseInputMultiImageAt v-model="form.dokumen" />
                    </div>
                </div>
            </div>
        </KeepAlive>
        <div class="flex justify-between">
            <BaseButtonAt def class="my-4 font-semibold" v-if="!stepper.isFirst.value" @click="backStep">Sebelumnya
            </BaseButtonAt>
            <BaseButtonAt class="bg-pr !text-white my-4 font-semibold" v-if="stepper.isLast.value"
                @click="handleSubmit">
                Simpan
            </BaseButtonAt>
            <BaseButtonAt class="bg-pr !text-white my-4 font-semibold" v-else @click="nextStep">Selanjutnya
            </BaseButtonAt>
        </div>
    </form>
</template>
<script setup>
import { ref, reactive } from "vue";

//support
import useForm from "@/support/form";

// component
import BaseInputAt from "@/components/atoms/BaseInputAt.vue";
import BaseSelectBoxAt from "@/components/atoms/BaseSelectBoxAt.vue";
import BaseInputSingleImageAt from "@/components/atoms/BaseInputSingleImageAt.vue";
import SelectStateRegion from "@/components/organism/SelectStateRegion.vue";
import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
import PreRender from "../atoms/PreRender.vue";
import router from "@/router";
import BaseInputMultiImageAt from "../atoms/BaseInputMultiImageAt.vue";
import BaseTextareaAt from "../atoms/BaseTextareaAt.vue";
import { useStepper } from "@vueuse/core";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import useUuid from "@/support/uuid";
import LoaderComponent from "../atoms/LoaderComponent.vue";
import { useAPIPost } from "@/support/api";
// end of component


//---optionlist
const optionList = ref({
    tujuan_kredit: ['INVESTASI'],
    tenor: ['12', '18', '24', '36'],
    kategori: ['biaya kuliah'],
    cabang: ['JTW', 'KKNG', 'PBN'],
    pendidikan: ['SD', 'SMP', 'SMA', 'SARJANA'],
    tipe_kendaraan: ['MOTOR', 'MOBIl']
});

// stepper
const stepper = useStepper({
    'order': {
        title: 'Informasi Order',
        icon: 'hi-credit-card',
        isValid: () => form.flafond,
    },
    'pelanggan': {
        title: 'Data Pelanggan',
        icon: 'hi-user',
        isValid: () => form.nama && form.ktp && form.kk && form.tgl_lahir && form.alamat && form.hp,
    },
    'jaminan': {
        title: 'Data Jaminan',
        icon: 'hi-shield-check',
        isValid: () => form.usaha && form.sector && form.jaminan && form.location,
    },
    'survey': {
        title: 'Data Survey',
        icon: 'hi-home',
        isValid: () => form.usaha && form.sector && form.jaminan && form.location,
    }
    // 'selesai': {
    //     title: 'Selesai',
    //     icon: 'bi-patch-check-fill',
    //     isValid: () => form.usaha && form.sector && form.jaminan && form.location,
    // },
});
function allStepsBeforeAreValid(index) {
    return !Array(index)
        .fill(null)
        .some((_, i) => !stepper.at(i)?.isValid())
}
const backStep = () => {
    stepper.goToPrevious();
}

const nextStep = () => {
    stepper.goToNext();
}


//--form handle

const form = ref({
    // pinjaman
    tujuan_kredit: 'pilih',
    plafond: '....',
    tenor: 'pilih',
    category: 'pilih',
    //nasabah
    no_ktp: '....',
    nama: '....',
    tgl_lahir: '....',
    alamat: '....',
    rt: '....',
    rw: '....',
    provinsi: '....',
    kota: '....',
    kecamatan: '....',
    kelurahan: '....',
    no_hp: '....',
    //pekerjaan
    lama_bekerja: '....',
    penghasilan_pribadi: '....',
    penghasilan_pasangan: '....',
    penghasilan_lainnya: '....',
    pengeluaran: '....',
    usaha: '....',
    sektor: '....',
    catatan_survey: '....',
    //jaminan
    jaminan_kendaraan: [{
        tipe: '....',
        merk: '....',
        tahun: '....',
        warna: '....',
        atas_nama: '....',
        nilai: '....',
        no_polisi: '....',
        no_rangka: '....',
        no_mesin: '....',
        no_bpkp: '....',
    }],
});

const order = ref({
    tujuan_kredit: '',
    plafond: '',
    tenor: '',
    category: ''
});

const nasabah = ref({
    nama: '',
    tgl_lahir: '',
    no_ktp: '',
    no_hp: '',
    data_alamat: {
        alamat: '',
        rt: '',
        rw: '',
        provinsi: '',
        kota: '',
        kecamatan: '',
        keluarahan: ''
    }
});

const survey = ref({
    lama_bekerja: '',
    penghasilan: {
        pribadi: '',
        pasangan: '',
        lainnya: ''
    },
    pengeluaran: '',
    usaha: '',
    sektor: '',
    catatan_survey: '',
    tgl_survey: ''
});

const data_jaminan = ref({
    tipe: '',
    merk: '',
    tahun: '',
    warna: '',
    atas_nama: '',
    no_polisi: '',
    no_rangka: '',
    no_mesin: '',
    no_bpkb: '',
    nilai: ''
});

const attachJaminan = ref({
    file_no_rangka: '',
    file_no_mesin: '',
    file_stnk: '',
    file_depan: '',
    file_belakang: '',
    file_kanan: '',
    file_kiri: ''
});

const attachSingle = ref({
    file_ktp: '',
    file_ktp_pasangan: '',
    file_kk: '',
    file_jaminan: [attachJaminan]
});

//payload
const uuid = useUuid();
const payload = reactive({
    id: uuid,
    order: order,
    data_nasabah: nasabah,
    data_survey: survey,
    jaminan_kendaraan: [
        {
            tipe: '',
            merk: '',
            tahun: '',
            warna: '',
            atas_nama: '',
            no_polisi: '',
            no_rangka: '',
            no_mesin: '',
            no_bpkb: '',
            nilai: ''
        }
    ],

});

//ext support
const { numberOnly } = useForm();
const addJaminan = (index) => {
    payload.jaminan_kendaraan.push(
        {
            tipe: '',
            merk: '',
            tahun: '',
            warna: '',
            atas_nama: '',
            no_polisi: '',
            no_rangka: '',
            no_mesin: '',
            no_bpkb: '',
            nilai: ''
        }
    );
    index
};
function removeJaminan(index) {
    const { jaminan_kendaraan } = payload.value;
    jaminan_kendaraan.splice(index, 1);
}
const numberInput = {
    numeral: true,
    noImmediatePrefix: true
};
const $toast = useToast();

const overlayLoad = ref(false);
const handleSubmit = () => {
    overlayLoad.value = true;
    const token = localStorage.getItem("token");
    try {
        let post = useAPIPost('kunjungan', payload, token).then(([res]) => { console.log(res) });
        setTimeout(() => {
            $toast.open({
                message: 'data berhasil disimpan',
                type: 'success',
                duration: 2000,
            });
            overlayLoad.value = false;

        }, 2000);
        setTimeout(() => { router.replace('/task/survey'); }, 1000);
    } catch (error) {
        setTimeout(() => {
            overlayLoad.value = true;
            $toast.open({
                message: 'data gagal disimpan',
                type: 'error',
                duration: 2000,
            });
        }, 3000);
    }
}
</script>