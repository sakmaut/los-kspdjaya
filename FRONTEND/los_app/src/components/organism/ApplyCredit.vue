<script setup>
import { useAPIPost } from "@/support/api";
import { useDate } from "@/support/date";
import useForm from "@/support/form";
import useUuid from "@/support/uuid";
import { useMediaQuery, useOnline, useStepper } from "@vueuse/core";
import { ref, onMounted, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseButtonAt from "../atoms/BaseButtonAt.vue";
import BaseInputAt from '../atoms/BaseInputAt.vue';
import CardAt from "../atoms/CardAt.vue";
import OverlayAt from "../atoms/OverlayAt.vue";
import PreRender from "../atoms/PreRender.vue";
import SelectStateRegion from "./SelectStateRegion.vue";
const online = useOnline();
const isLargeScreen = useMediaQuery('(min-width:1024px)');
const visitDate = useDate();
const uuid = useUuid();
const { numberOnly } = useForm();
//init router
const router = useRouter();

//init route
const route = useRoute();
const numberInput = {
    numeral: true,
    prefix: 'Rp ',
    noImmediatePrefix: true
};

const loadingpost = ref(false);
const messagePost = ref();
const token = localStorage.getItem("token");


const stepper = useStepper({
    'pelanggan': {
        title: 'Data pelanggan',
        icon: 'hi-user',
    },
    'order': {
        title: 'Data Order',
        icon: 'hi-document-text',

    },
    'tambahan': {
        title: 'Data Tambahan',
        icon: 'hi-document-add',

    },
    'ekstra': {
        title: 'Data Ekstra',
        icon: 'hi-document-add',

    },
})

async function submit() {

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
const payload = {
    "cr_prospect_id": route.params.prospect,
    "cr_application_id": ""
}
const data_pelanggan = ref([]);
const data_order = ref();
const data_pelanggan_tambahan = ref();


const struktur_kredit = ref();
const bank = ref([]);
const jaminan_kendaraan = ref([]);
const prospect_approval = ref();
const attachment = ref([]);

onMounted(() => {
    useAPIPost("cr_applications", payload, token).then(([res]) => {
        data_pelanggan.value = res.data_pelanggan;
        data_order.value = res.data_order;
        data_pelanggan_tambahan.value = res.data_pelanggan_tambahan;
        bank.value = res.bank;
        jaminan_kendaraan.value = res.jaminan_kendaraan;
        prospect_approval.value = res.prospect_approval;
        attachment.value = res.attachment;
        struktur_kredit.value = res.struktur_kredit;
    })
});
const sum = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) {
        return undefined;
    }
    return num1 + num2;
};
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const calcCredit = reactive({
    plafond: 7000000,
    total_admin: 685000,
    net_admin: computed(() => parseInt(calcCredit.total_admin)),
    tenor: 12,
    bunga_eff: 44.2310,
    bunga_eff_actual: computed(() => calcCredit.bunga_eff / 100),
    bunga_margin: computed(() => calcCredit.bunga_flat / 12 * parseInt(calcCredit.tenor) * (parseInt(calcCredit.pokok_pembayaran)) / 100),
    pokok_margin: computed(() => parseInt(calcCredit.pokok_pembayaran) + parseInt(calcCredit.bunga_margin)),
    pokok_pembayaran: computed(() => sum(parseInt(calcCredit.plafond), parseInt(calcCredit.total_admin))),
    angsuran: computed(() => ((calcCredit.pokok_pembayaran + calcCredit.bunga_margin) / calcCredit.tenor)),
    bunga_flat: computed(() => (((calcCredit.tenor * (calcCredit.bunga_eff_actual / 12)) / (1 - (1 + (calcCredit.bunga_eff_actual / 12)) ** (-calcCredit.tenor))) - 1) * (12 / calcCredit.tenor) * 100),
});
const backPage = () => router.back();
const alamat_tagih = ref({
    alamat: 'alamat',
    rt: 'rt',
    rw: 'rw',
    provinsi: 'rw',
    kota: 'rw',
    kecamatan: 'rw',
    desa: 'rw',
    kode_pos: 'rw'
});
const copyAddress = () => {
    alamat_tagih.value.alamat = data_pelanggan.value.alamat;
    alamat_tagih.value.rt = data_pelanggan.value.rt;
    alamat_tagih.value.rw = data_pelanggan.value.rw;
    alamat_tagih.value.provinsi = data_pelanggan.value.provinsi;
    alamat_tagih.value.kota = data_pelanggan.value.kota;
    alamat_tagih.value.kecamatan = data_pelanggan.value.kecamatan;
    alamat_tagih.value.desa = data_pelanggan.value.kelurahan;
    alamat_tagih.value.kode_pos = data_pelanggan.value.kode_pos;
};
</script>

<template>
    <CardAt class="pb-4">
        <template #body>
            <!-- <PreRender :data="data_pelanggan" label="data_pelanggan" />
            <PreRender :data="data_order" label="data_order" />
            <PreRender :data="data_tambahan" label="data_tambahan" />
            <PreRender :data="data_pelanggan_tambahan" label="data_pelanggan_tambahan" />
            <PreRender :data="bank" label="bank" /> -->
            <div
                class="flex px-4 py-4 bg-sc-100 sticky top-16 z-50 md:flex-row dark:bg-sf-drk-300 dark:text-sf justify-between gap-2">
                <div class="flex gap-2">
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
                <div class="flex gap-2">
                    <BaseButtonAt def>
                        <v-icon name="ri-save-line" />
                        Simpan
                    </BaseButtonAt>
                    <BaseButtonAt def>
                        <v-icon name="ri-mail-send-line" />
                        kirim
                    </BaseButtonAt>
                </div>
            </div>
            <div class="bg-sc-50 px-4 py-2">
                <form @submit.prevent="submit">
                    <div class="mt-4 rounded-xl grid md:grid-cols-2 gap-4" v-if="stepper.isCurrent('pelanggan')">
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <BaseInputAt label="pelanggan" v-model="data_pelanggan.nama" />
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="nama panggilan" class="col-span-2"
                                    v-model="data_pelanggan.nama_panggilan" />
                                <BaseInputAt label="jenis kelamin" v-model="data_pelanggan.jenis_kelamin" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="tempat lahir" v-model="data_pelanggan.tempat_lahir" />
                                <BaseInputAt label="tanggal lahir" v-model="data_pelanggan.tanggal_lahir" type="date" />
                                <BaseInputAt label="golongan darah" v-model="data_pelanggan.golongan_darah" />
                            </div>
                            <div class="grid grid-cols-2 gap-x-2">
                                <BaseInputAt label="status kawin" />
                                <BaseInputAt label="tanggal kawin" type="date" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="identitas" v-model="data_pelanggan.identitas" />
                                <BaseInputAt label="NO identitas" class="col-span-2" v-model="data_pelanggan.no" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="No KK" class="col-span-2" v-model="data_pelanggan.no_kk" />
                                <BaseInputAt label="warganegara" v-model="data_pelanggan.warganegara" />
                            </div>
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <div class="grid grid-cols-2 gap-x-2">
                                <BaseInputAt label="pekerjaan" v-model="data_pelanggan.perkerjaan" />
                                <BaseInputAt label="pekerjaan ID" v-model="data_pelanggan.id_pekerjaan" />
                            </div>
                            <BaseInputAt label="agama" v-model="data_pelanggan.agama" />
                            <BaseInputAt label="pendidikan" v-model="data_pelanggan.pendidikan" />
                            <BaseInputAt label="status rumah" v-model="data_pelanggan.status_rumah" />
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="telepon rumah" v-model="data_pelanggan.telepon_rumah" />
                                <BaseInputAt label="telepon selular" v-model="data_pelanggan.telepon_selular" />
                                <BaseInputAt label="telepon kantor" v-model="data_pelanggan.telepon_kantor" />
                            </div>
                            <div class="grid grid-cols-2 gap-x-2">
                                <BaseInputAt label="ext 1" v-model="data_pelanggan.ext1" />
                                <BaseInputAt label="ext 2" v-model="data_pelanggan.ext2" />
                            </div>
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <div>Alamat Identitas</div>
                            <div class="grid grid-cols-4 gap-x-2">
                                <BaseInputAt label="alamat" class="col-span-2" v-model="data_pelanggan.alamat" />
                                <BaseInputAt label="RT" v-model="data_pelanggan.rt" />
                                <BaseInputAt label="RW" v-model="data_pelanggan.rw" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <!-- <SelectStateRegion v-model:provinsi="data_pelanggan.provinsi"
                                    v-model:kota="data_pelanggan.kota"
                                    v-model:kecamatan="data_pelanggan.kecamatan"
                                    v-model:desa="data_pelanggan.kelurahan" /> -->
                                <BaseInputAt label="provinsi" v-model="data_pelanggan.provinsi" />
                                <BaseInputAt label="KAB / kota" v-model="data_pelanggan.kota" />
                                <BaseInputAt label="kecamatan" v-model="data_pelanggan.kecamatan" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="Kel. / desa" v-model="data_pelanggan.kelurahan" />
                                <BaseInputAt label="kode POS" v-model="data_pelanggan.kode_pos" />
                            </div>
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <div class="flex justify-between">Alamat Tagih
                                <BaseButtonAt def @click="copyAddress">
                                    <v-icon name="ri-file-copy-line" />
                                    Salin Alamat identitas
                                </BaseButtonAt>
                            </div>
                            <div class="grid grid-cols-4 gap-x-2">
                                <BaseInputAt label="alamat" class="col-span-2" v-model="alamat_tagih.alamat" />
                                <BaseInputAt label="RT" v-model="alamat_tagih.rt" />
                                <BaseInputAt label="RW" v-model="alamat_tagih.rw" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="provinsi" v-model="alamat_tagih.provinsi" />
                                <BaseInputAt label="KAB / kota" v-model="alamat_tagih.kota" />
                                <BaseInputAt label="kecamatan" v-model="alamat_tagih.kecamatan" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="Kel. / desa" v-model="alamat_tagih.desa" />
                                <BaseInputAt label="kode POS" v-model="alamat_tagih.kode_pos" />
                            </div>
                        </div>
                    </div>
                    <!-- data order -->
                    <div class="mt-4 rounded-xl grid md:grid-cols-2 gap-4" v-if="stepper.isCurrent('order')">
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <BaseInputAt label="nama ibu" v-model="data_order.nama_ibu" />
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="kategori" class="col-span-2" v-model="data_order.kategori" />
                                <BaseInputAt label="gelar" v-model="data_order.gelar" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="lama kerja" v-model="data_order.lama_bekerja" />
                                <BaseInputAt label="tanggungan" type="number" v-model="data_order.tanggungan" />
                            </div>
                            <BaseInputAt label="pendapatan" type="number" v-model="data_order.pendapatan_pribadi" />
                            <BaseInputAt label="pendapatan pasangan" type="number"
                                v-model="data_order.pendaptan_pasangan" />
                            <BaseInputAt label="pendapatan lain-lain" type="number"
                                v-model="data_order.pendapatan_lainnya" />
                            <BaseInputAt label="biaya bulanan" type="number" v-model="data_order.biaya_bulanan" />
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <div class="grid grid-cols-2 gap-x-2">
                                <BaseInputAt label="tanggal order" type="date" v-model="data_order.order_tanggal" />
                                <BaseInputAt label="satus order" type="date" v-model="data_order.order_status" />
                            </div>
                            <BaseInputAt label="tipe order" v-model="data_order.order_tipe" />
                            <BaseInputAt label="pelanggan group" />
                            <BaseInputAt label="unit bisnis" v-model="data_order.unit_bisnis" />
                            <BaseInputAt label="cust service" v-model="data_order.cust_service" />
                            <BaseInputAt label="reff pelanggan" v-model="data_order.reff_pelanggan" />
                            <BaseInputAt label="surveyor" v-model="data_order.surveyor_id" />
                            <BaseInputAt label="catatan survey" v-model="data_order.catatan_survey" />
                            <BaseInputAt label="platform" />
                            <BaseInputAt label="prog marketing" v-model="data_order.program_marketing" />
                            <BaseInputAt label="cara bayar" v-model="data_order.cara_bayar" />
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
                    <div class="mt-4 rounded-xl grid md:grid-cols-2 gap-4" v-if="stepper.isCurrent('tambahan')">
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <BaseInputAt label="nama BI" v-model="data_pelanggan_tambahan.nama_bi" />
                            <BaseInputAt label="email" v-model="data_pelanggan_tambahan.email" />
                            <BaseInputAt label="info khusus" v-model="data_pelanggan_tambahan.info_khusus" />
                            <BaseInputAt label="usaha lain 1" v-model="data_pelanggan_tambahan.usaha_lain_1" />
                            <BaseInputAt label="usaha lain 2" v-model="data_pelanggan_tambahan.usaha_lain_2" />
                            <BaseInputAt label="usaha lain 3" v-model="data_pelanggan_tambahan.usaha_lain_3" />
                            <BaseInputAt label="usaha lain 4" v-model="data_pelanggan_tambahan.usaha_lain_4" />
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md ">
                            <div>Kerabat dalam kondisi darurat</div>
                            <BaseInputAt label="nama" v-model="data_pelanggan_tambahan.nama_kerabat_darurat" />
                            <div class="grid grid-cols-4 gap-x-2">
                                <BaseInputAt label="alamat" class="col-span-2"
                                    v-model="data_pelanggan_tambahan.alamat_kerabat_darurat" />
                                <BaseInputAt label="RT" v-model="data_pelanggan_tambahan.rt_kerabat_darurat" />
                                <BaseInputAt label="RW" v-model="data_pelanggan_tambahan.rw_kerabat_darurat" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="provinsi"
                                    v-model="data_pelanggan_tambahan.provinsi_kerabat_darurat" />
                                <BaseInputAt label="KAB / kota"
                                    v-model="data_pelanggan_tambahan.kota_kerabat_darurat" />
                                <BaseInputAt label="kecamatan"
                                    v-model="data_pelanggan_tambahan.kecamatan_kerabat_darurat" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="Kel. / desa"
                                    v-model="data_pelanggan_tambahan.kelurahan_kerabat_darurat" />
                                <BaseInputAt label="kode POS"
                                    v-model="data_pelanggan_tambahan.kode_pos_kerabat_darurat" />
                            </div>
                            <BaseInputAt label="telepon rumah"
                                v-model="data_pelanggan_tambahan.no_telp_kerabat_darurat" />
                            <BaseInputAt label="telepon selular"
                                v-model="data_pelanggan_tambahan.no_hp_kerabat_darurat" />
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md">
                            <div>Alamat Surat</div>
                            <div class="grid grid-cols-4 gap-x-2">
                                <BaseInputAt label="alamat" class="col-span-2"
                                    v-model="data_pelanggan_tambahan.surat_alamat" />
                                <BaseInputAt label="RT" v-model="data_pelanggan_tambahan.surat_rt" />
                                <BaseInputAt label="RW" v-model="data_pelanggan_tambahan.surat_rw" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="provinsi" v-model="data_pelanggan_tambahan.surat_provinsi" />
                                <BaseInputAt label="KAB / kota" v-model="data_pelanggan_tambahan.surat_kota" />
                                <BaseInputAt label="kecamatan" v-model="data_pelanggan_tambahan.surat_kecamatan" />
                            </div>
                            <div class="grid grid-cols-3 gap-x-2">
                                <BaseInputAt label="Kel. / desa" v-model="data_pelanggan_tambahan.surat_kelurahan" />
                                <BaseInputAt label="kode POS" v-model="data_pelanggan_tambahan.surat_kode_pos" />
                            </div>
                        </div>
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md">
                            <div>
                                Informasi Bank
                            </div>
                            <div class="grid grid-cols-9 gap-2">

                                <BaseInputAt label="kode bank" />
                                <BaseInputAt label="nama bank " class="col-span-2" />
                                <BaseInputAt label="Currency" />
                                <BaseInputAt label="Nomor Rekening" />
                                <BaseInputAt label="Nama Rekening" class="col-span-2" />
                                <BaseInputAt label="Status" />
                                <BaseButtonAt def class="w-fit">
                                    <v-icon name="ri-add-fill" />
                                </BaseButtonAt>
                            </div>
                        </div>
                    </div>
                    <!-- extra -->
                    <div class="mt-4 rounded-xl grid md:grid-cols-2 gap-4" v-if="stepper.isCurrent('ekstra')">
                        <div class="flex flex-col bg-white p-4 border gap-y-4 rounded-md col-span-2">
                            <div>Struktur Kredit by Angsuran
                            </div>
                            <div class="grid grid-cols-2 gap-x-4">
                                <div class="grid gap-y-4">
                                    <BaseInputAt label="pokok pembayaran" disabled
                                        v-model="calcCredit.pokok_pembayaran" />
                                    <BaseInputAt label="tipe angsuran" />
                                    <BaseInputAt label="advance / arrear" />
                                    <BaseInputAt label="jumlah angsuran" type="number" v-model="calcCredit.tenor">
                                        <template #trail>
                                            kali
                                        </template>
                                    </BaseInputAt>
                                    <BaseInputAt label="periode">
                                        <template #trail>
                                            bulan
                                        </template>
                                    </BaseInputAt>
                                    <BaseInputAt label="angsuran" disabled v-model="calcCredit.angsuran" />
                                    <BaseInputAt label="total admin" v-model="calcCredit.total_admin" />
                                    <BaseInputAt label="cadangan" disabled />
                                    <BaseInputAt label="biaya broker" disabled />
                                    <BaseInputAt label="provisi" disabled v-model="provisi">
                                        <template #trail>
                                            %
                                        </template>
                                    </BaseInputAt>
                                    <BaseInputAt label="asuransi" disabled />
                                    <BaseInputAt label="biaya transfer" disabled />
                                    <BaseInputAt label="bunga / margin eff" v-model="calcCredit.bunga_eff">
                                        <template #trail>
                                            %
                                        </template>
                                    </BaseInputAt>
                                    <BaseInputAt label="bunga / margin flat" v-model="calcCredit.bunga_flat" disabled>
                                        <template #trail>
                                            %
                                        </template>
                                    </BaseInputAt>
                                </div>
                                <div class="flex flex-col gap-y-4">
                                    <BaseInputAt label="bunga / margin" disabled v-model="calcCredit.bunga_margin" />
                                    <BaseInputAt label="pokok + margin" disabled
                                        v-model="calcCredit.pokok_pembayaran" />
                                    <BaseInputAt label="angsuran terakhir" disabled v-model="calcCredit.angsuran" />
                                    <BaseInputAt label="bunga / margin EFF actual" disabled
                                        v-model="calcCredit.bunga_eff">
                                        <template #trail>
                                            %
                                        </template>
                                    </BaseInputAt>
                                    <BaseInputAt label="bunga / margin EFF flat" disabled
                                        v-model="calcCredit.bunga_flat">
                                        <template #trail>
                                            %
                                        </template>
                                    </BaseInputAt>
                                    <BaseInputAt label="provisi" disabled v-model="provisi" />
                                    <BaseInputAt label="nett admin" disabled v-model="calcCredit.net_admin" />
                                    <div class="h-8"></div>
                                    <BaseInputAt label="nilai yang diterima" class="text-base"
                                        v-model="calcCredit.plafond" />
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