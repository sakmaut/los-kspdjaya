<template>
    <CardAt class="p-4 bg-white dark:bg-sf-drk-300/50">
        <template #header>
            <div class="flex items-center gap-2 justify-between">
                <div class="flex items-center">
                    <div @click="backPage"
                        class="text-pr dark:text-pr-500 hover:bg-sfcls dark:hover:bg-sf-drk-200 rounded-full aspect-square p-1 cursor-pointer">
                        <v-icon name="ri-arrow-left-line" scale="1.5"></v-icon>
                    </div>
                    {{ dataPage.nama }}
                </div>
                <div class="flex gap-2">
                    <BaseButtonAt def @click="find" :class="findBox && 'text-red-500'">
                        <v-icon :name="!findBox ? 'ri-edit-2-line' : 'ri-close-circle-line'" />
                        <span class="hidden md:flex"></span>
                    </BaseButtonAt>
                    <BaseButtonAt def @click="deleteItem" class="bg-erc aspect-square text-red-500">
                        <v-icon name="ri-delete-bin-6-line" />
                        <span class="hidden md:flex"></span>
                    </BaseButtonAt>
                </div>
            </div>
            <div>
                <div>
                    <head-contain title="Informasi Produk & Kunjungan"
                        subtitle="data informasi produk & kunjungan"></head-contain>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <label-box label="Tanggal Kunjungan" :val="dataPage.visit_date" />
                        <label-box label="Tujuan Kredit" :val="dataPage.tujuan_kredit" />
                        <label-box label="Jenis Produk" v-for="produk in dataPage.jenis_produk" :val="produk.name" />
                        <label-box label="Plafond" :val="dataPage.plafond" />
                        <label-box label="Tenor" :val="dataPage.tenor" />
                    </div>
                    <div>
                        <head-contain title="Informasi Nasabah" subtitle="data informasi nasabah"></head-contain>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <label-box label="Nama Nasabah" :val="dataPage.nama" />
                            <label-box label="No KTP Nasabah" :val="dataPage.ktp" />
                            <label-box label="No KK Nasabah" :val="dataPage.kk" />
                            <label-box label="Tanggal Lahir Nasabah" :val="dataPage.tgl_lahir" />
                            <label-box label="Alamat Nasabah" :val="dataPage.alamat" />
                            <label-box label="No Hp Nasabah" :val="dataPage.hp" />
                            <label-box label="Usaha" :val="dataPage.usaha" />
                            <label-box label="Sektor" :val="dataPage.sector" />
                        </div>
                    </div>
                    <div>
                        <head-contain title="Lokasi Nasabah" subtitle="data lokasi nasabah"></head-contain>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <label-box label="Kordinat" :val="dataPage.coordinate" />
                            <label-box label="Akurasi" :val="dataPage.accurate" />
                            <a :href="`https://www.google.com/maps/?q=${dataPage.coordinate}`" target="_blank">
                                <BaseButtonAt class="gap-2 bg-sfc w-fit px-4">
                                    <v-icon name="ri-road-map-line" />
                                    Lihat Lokasi
                                </BaseButtonAt>
                            </a>
                        </div>
                    </div>
                    <div>
                        <head-contain title="Informasi Jaminan" subtitle="data Jaminan nasabah"></head-contain>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4" v-for="jaminan in dataPage.prospek_jaminan">
                            <label-box label="Tipe Jaminan" :val="jaminan.type" />
                            <label-box label="Nilai Jaminan" :val="jaminan.collateral_value" />
                            <label-box label="Keterangan Jaminan" :val="jaminan.description" />
                        </div>
                    </div>
                    <div>
                        <head-contain title="Informasi Penjamin" subtitle="data Jaminan nasabah"></head-contain>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4"
                            v-for="penjamin in dataPage.prospek_penjamin">
                            <label-box label="Nama Penjamin" :val="penjamin.nama_jaminan" />
                            <label-box label="No KTP Penjamin" :val="penjamin.ktp_jaminan" />
                            <label-box label="Tanggal Lahir Penjamin" :val="penjamin.tgl_lahir_jaminan" />
                            <label-box label="Perkerjaan Penjamin" :val="penjamin.pekerjaan_jaminan" />
                            <label-box label="Status Hubungan Penjamin" :val="penjamin.status_jaminan" />
                        </div>
                    </div>
                    <div>
                        <head-contain title="Permohonan & status SLIK" subtitle="data SLIK nasabah"></head-contain>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <label-box label="Permohonan SLIK" :val="dataPage.slik" />
                            <image-box label="File KTP" :val="dataPage.ktp_attachment" />
                            <image-box label="File KTP" :val="dataPage.kk_attachment" />
                            <image-box label="File KTP" :val="dataPage.buku_nikah" />
                            <label-box v-for="slikhistory in dataPage.slik_approval" label="Status SLIK"
                                :val="slikhistory.SLIK_RESULT" />
                        </div>
                    </div>
                    <div>
                        <head-contain title="Lampiran Kunjungan" subtitle="data lampiran kunjungan"></head-contain>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <image-box v-for="lampiran in dataPage.prospek_attachment" :val="lampiran.path" label="" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </CardAt>
    <bottom-sheet v-if="askBox">
        <div>data akan dihapus dalam {{ countDown }}</div>
    </bottom-sheet>
</template>
<script setup>
import CardAt from "@/components/atoms/CardAt.vue";
import BottomSheet from "@/components/atoms/BottomsheetAt.vue";
import HeadContain from "@/components/atoms/HeadContainerAt.vue";
import LabelBox from "@/components/atoms/LabelBoxAt.vue";
import ImageBox from "@/components/atoms/ImageBoxAt.vue";
import router from "../router/index.js";
import { useRoute } from "vue-router";
import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
const askBox = ref(false);
const id_page = ref();
const countDown = ref(10);
const baseRoute = useRoute();
const dataPage = ref([]);
const decBase64 = (link) => atob(link);
const deleteItem = () => {
    askBox.value = true;
    const rolback = setInterval(() => {
        countDown.value--;
        if (countDown.value == 0) {
            deletedData();
        }
    }, 1000);
    const deletedData = () => {
        console.log("data dihapus");
        clearInterval(rolback);
        askBox.value = false;
        countDown.value = 10;
    }
}
const backPage = () => router.back();
id_page.value = decBase64(baseRoute.params.prospect);

const apibase = import.meta.env.VITE_APP_API_BASE;

const token = localStorage.getItem("token");

const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
};
const getPage = async (id) => {
    let url = `${apibase}/kunjungan/${id_page.value}`;
    let payload = {
        "employee_id": id
    };
    try {
        let getHtpp = await axios.get(url, config);
        dataPage.value = getHtpp.data.response;
    } catch (error) {
        console.log(error)
    }
}
onMounted(
    getPage
);

</script>
