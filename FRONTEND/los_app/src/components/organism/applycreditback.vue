<script setup>
import { useStepper, useGeolocation, useOnline, useMediaQuery } from "@vueuse/core";
import { onMounted, reactive, ref, computed, watch } from 'vue'
import BaseInputAt from '../atoms/BaseInputAt.vue';
import TextField from '../molecules/TextField.vue';
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
import HeadContainerAt from "@/components/atoms/HeadContainerAt.vue";
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
    'pelanggan': {
        title: 'Data pelanggan',
        icon: 'hi-user',
        isValid: () => form.tujuan_kredit && form.plafond && form.tenor && form.jenis_produk,
    },
    'order': {
        title: 'Data Order',
        icon: 'hi-document-text',
        isValid: () => form.nama && form.ktp && form.kk && form.tgl_lahir && form.alamat && form.hp,
    },
    'tambahan': {
        title: 'Data Tambahan',
        icon: 'hi-document-add',
        isValid: () => form.usaha && form.sector && form.jaminan && form.location,
    },
    'ekstra': {
        title: 'Data Ekstra',
        icon: 'hi-document-add',
        isValid: () => form.usaha && form.sector && form.jaminan && form.location,
    },
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
    <CardAt class="pb-4">
        <template #body>
            <div
                class="flex px-4 py-4 bg-sc-100 sticky top-16 z-50 md:flex-row dark:bg-sf-drk-300 dark:text-sf justify-start gap-2">
                <div v-for="(step, id, i) in stepper.steps.value" :key="id" class="flex gap-2 cursor-pointer"
                    @click="stepper.goTo(id)" :class="stepper.isBefore(id) ? 'text-sc' : 'text-primary'">
                    <button class="flex w-full justify-start">
                        <div class="flex  bg-white border p-1 item-center rounded-xl gap-2 md:flex-row">
                            <div class="rounded-full flex items-center justify-center p-1 aspect-square"
                                :class="stepper.isBefore(id) ? 'bg-sc-200  text-white' : 'bg-pr text-white'">
                                <v-icon :name="step.icon"></v-icon>
                            </div>
                            <div class="text-left">
                                <div class="font-semibold text-xs md:text-base ">{{ step.title }}</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <div class="bg-sc-50 px-4 py-2">
                <form @submit.prevent="submit">
                    <div class="mt-4 rounded-xl grid grid-cols-2 gap-4" v-if="stepper.isCurrent('pelanggan')">
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <BaseInputAt label="pelanggan" />
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="nama panggilan" class="col-span-2" />
                                <BaseInputAt label="jenis kelamin" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="tempat lahir" />
                                <BaseInputAt label="tanggal lahir" type="date" />
                                <BaseInputAt label="golongan darah" />
                            </div>
                            <div class="grid grid-cols-2 gap-x-2">
                                <BaseInputAt label="status kawin" />
                                <BaseInputAt label="tanggal kawin" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="identitas" />
                                <BaseInputAt label="NO identitas" class="col-span-2" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="No KK" class="col-span-2" />
                                <BaseInputAt label="warganegara" />
                            </div>
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <div class="grid grid-cols-2 gap-x-2">
                                <BaseInputAt label="pekerjaan" />
                                <BaseInputAt label="pekerjaan ID" />
                            </div>
                            <BaseInputAt label="agama" />
                            <BaseInputAt label="pendidikan" />
                            <BaseInputAt label="status rumah" />
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="telepon rumah" />
                                <BaseInputAt label="telepon selular" />
                                <BaseInputAt label="telepon kantor" />
                            </div>
                            <div class="grid grid-cols-2 gap-x-2">
                                <BaseInputAt label="ext 1" />
                                <BaseInputAt label="ext 2" />
                            </div>
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <div>Alamat Identitas</div>
                            <div class="grid grid-cols-4 gap-x-2">
                                <BaseInputAt label="alamat" class="col-span-2" />
                                <BaseInputAt label="RT" />
                                <BaseInputAt label="RW" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="provinsi" />
                                <BaseInputAt label="KAB / kota" />
                                <BaseInputAt label="kecamatan" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="Kel. / desa" />
                                <BaseInputAt label="kode POS" />
                            </div>
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <div class="flex justify-between">Alamat Tagih
                                <BaseButtonAt def>Salin Alamat identitas</BaseButtonAt>
                            </div>
                            <div class="grid grid-cols-4 gap-x-2">
                                <BaseInputAt label="alamat" class="col-span-2" />
                                <BaseInputAt label="RT" />
                                <BaseInputAt label="RW" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="provinsi" />
                                <BaseInputAt label="KAB / kota" />
                                <BaseInputAt label="kecamatan" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="Kel. / desa" />
                                <BaseInputAt label="kode POS" />
                            </div>
                        </div>
                    </div>
                    <!-- data order -->
                    <div class="mt-4 rounded-xl grid grid-cols-2 gap-4" v-if="stepper.isCurrent('order')">
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <BaseInputAt label="nama ibu" />
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="kategori" class="col-span-2" />
                                <BaseInputAt label="gelar" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="lama kerja" />
                                <BaseInputAt label="tanggungan" type="date" />
                            </div>
                            <BaseInputAt label="pendapatan" />
                            <BaseInputAt label="pendapatan pasangan" />
                            <BaseInputAt label="pendapatan lain-lain" />
                            <BaseInputAt label="biaya bulanan" />
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <div class="grid grid-cols-2 gap-x-2">
                                <BaseInputAt label="tanggal order" />
                                <BaseInputAt label="satus order" />
                            </div>
                            <BaseInputAt label="tipe order" />
                            <BaseInputAt label="pelanggan group" />
                            <BaseInputAt label="unit bisnis" />
                            <BaseInputAt label="cust service" />
                            <BaseInputAt label="reff pelanggan" />
                            <BaseInputAt label="surveyor" />
                            <BaseInputAt label="catatan survey" />
                            <BaseInputAt label="platform" />
                            <BaseInputAt label="prog marketing" />
                            <BaseInputAt label="cara bayar" />
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md">
                            <div>NPWP</div>
                            <BaseInputAt label="No NPWP" />
                            <div class="grid grid-cols-4 gap-x-2">
                                <BaseInputAt label="alamat" class="col-span-2" />
                                <BaseInputAt label="RT" />
                                <BaseInputAt label="RW" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="provinsi" />
                                <BaseInputAt label="KAB / kota" />
                                <BaseInputAt label="kecamatan" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="Kel. / desa" />
                                <BaseInputAt label="kode POS" />
                            </div>
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <div>Barang Taksasi</div>
                            <BaseInputAt label="kode barang" />
                            <BaseInputAt label="ID Tipe" />
                            <BaseInputAt label="tahun" />
                            <BaseInputAt label="harga pasar" />
                        </div>
                    </div>
                    <!-- tambahan -->
                    <div class="mt-4 rounded-xl grid grid-cols-2 gap-4" v-if="stepper.isCurrent('tambahan')">
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <BaseInputAt label="nama BI" />
                            <BaseInputAt label="email" />
                            <BaseInputAt label="info khusus" />
                            <BaseInputAt label="usaha lain 1" />
                            <BaseInputAt label="usaha lain 2" />
                            <BaseInputAt label="usaha lain 3" />
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <div>Kerabat dalam kondisi darurat</div>
                            <BaseInputAt label="nama" />
                            <div class="grid grid-cols-4 gap-x-2">
                                <BaseInputAt label="alamat" class="col-span-2" />
                                <BaseInputAt label="RT" />
                                <BaseInputAt label="RW" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="provinsi" />
                                <BaseInputAt label="KAB / kota" />
                                <BaseInputAt label="kecamatan" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="Kel. / desa" />
                                <BaseInputAt label="kode POS" />
                            </div>
                            <BaseInputAt label="telepon rumah" />
                            <BaseInputAt label="telepon selular" />
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md">
                            <div>Alamat Surat</div>
                            <div class="grid grid-cols-4 gap-x-2">
                                <BaseInputAt label="alamat" class="col-span-2" />
                                <BaseInputAt label="RT" />
                                <BaseInputAt label="RW" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="provinsi" />
                                <BaseInputAt label="KAB / kota" />
                                <BaseInputAt label="kecamatan" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="Kel. / desa" />
                                <BaseInputAt label="kode POS" />
                            </div>
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md col-span-2">
                            <div>Informasi Bank</div>
                            <div class="grid grid-cols-8 gap-2">
                                <BaseInputAt label="kode bank" />
                                <BaseInputAt label="nama bank " class="col-span-2" />
                                <BaseInputAt label="Currency" />
                                <BaseInputAt label="Nomor Rekening" />
                                <BaseInputAt label="Nama Rekening" class="col-span-2" />
                                <BaseInputAt label="Status" />
                            </div>
                            <div class="grid grid-cols-8 gap-2">
                                <BaseInputAt label="kode bank" />
                                <BaseInputAt label="nama bank " class="col-span-2" />
                                <BaseInputAt label="Currency" />
                                <BaseInputAt label="Nomor Rekening" />
                                <BaseInputAt label="Nama Rekening" class="col-span-2" />
                                <BaseInputAt label="Status" />
                            </div>
                            <div class="grid grid-cols-8 gap-2">
                                <BaseInputAt label="kode bank" />
                                <BaseInputAt label="nama bank " class="col-span-2" />
                                <BaseInputAt label="Currency" />
                                <BaseInputAt label="Nomor Rekening" />
                                <BaseInputAt label="Nama Rekening" class="col-span-2" />
                                <BaseInputAt label="Status" />
                            </div>
                        </div>
                    </div>
                    <!-- extra -->
                    <div class="mt-4 rounded-xl grid grid-cols-2 gap-4" v-if="stepper.isCurrent('ekstra')">
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md col-span-2">
                            <div>Struktur Kredit by Angsuran</div>
                            <div class="grid grid-cols-2 gap-x-4">
                                <div class="grid gap-y-4">
                                    <BaseInputAt label="pokok pembayaran" />
                                    <BaseInputAt label="tipe angsuran" />
                                    <BaseInputAt label="advance / arrear" />
                                    <BaseInputAt label="jumlah angsuran">
                                        <template #trail>
                                            kali
                                        </template>
                                    </BaseInputAt>
                                    <BaseInputAt label="periode">
                                        <template #trail>
                                            bulan
                                        </template>
                                    </BaseInputAt>
                                    <BaseInputAt label="angsuran" />
                                    <BaseInputAt label="total" />
                                    <BaseInputAt label="cadangan" />
                                    <BaseInputAt label="biaya broker" />
                                    <BaseInputAt label="provisi">
                                        <template #trail>
                                            %
                                        </template>
                                    </BaseInputAt>
                                    <BaseInputAt label="asuransi" />
                                    <BaseInputAt label="biaya transfer" />
                                    <BaseInputAt label="bunga / margin eff">
                                        <template #trail>
                                            %
                                        </template>
                                    </BaseInputAt>
                                    <BaseInputAt label="bunga / margin flat">
                                        <template #trail>
                                            %
                                        </template>
                                    </BaseInputAt>
                                </div>
                                <div class="flex flex-col gap-y-4">
                                    <BaseInputAt label="bunga / margin" />
                                    <BaseInputAt label="pokok + margin" />
                                    <BaseInputAt label="angsuran terakhir" />
                                    <BaseInputAt label="bunga / margin EFF actual">
                                        <template #trail>
                                            %
                                        </template>
                                    </BaseInputAt>
                                    <BaseInputAt label="bunga / margin EFF flat">
                                        <template #trail>
                                            %
                                        </template>
                                    </BaseInputAt>
                                    <BaseInputAt label="provisi" />
                                    <BaseInputAt label="nett admin" />
                                    <div class="h-8"></div>
                                    <BaseInputAt label="nilai yang diterima" class="text-base" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </template>
    </CardAt>
    <Transition>
        <OverlayAt v-if="!online" />
    </Transition>
</template>