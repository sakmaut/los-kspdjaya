<template>
    <div class="bg-sfcl h-screen px-4 md:px-10">
        <div class="flex justify-center border-b">
            <div class="p-4 justify-center items-center flex">
                <img class="w-10"
                    src="http://8a73085df21a.sn.mynetname.net:9000/storage/public/assets/nmhregd35XcxiUk6ABtZVwIa46XS9xrdQPM9upTW.svg">
            </div>
            <div class="flex font-bold items-center">
                PT. BPR CAHAYA FAJAR
            </div>
        </div>
        <div class="flex flex-col justify-between" v-if="pageAvailable">
            <div class="text-center md:text-left py-4 mt-4 md:mt-0">
                <h3 class="text-xl text-gray-900">Hi, halaman ini khusus untuk kamu</h3>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-sf-drk-600">ini adalah halaman pemberitahuan dan
                    konfirmasi
                    datamu akan di slik OJK</p>
            </div>
            <div class="bg-sfcls w-full p-4 rounded-lg" v-if="!aggre">
                <p class="mt-1 max-w-2xl text-md leading-6 pb-2">Data Kunjungan </p>
                <DividedAt />
                <LabelContAt label="atas nama" val="">{{ kunjungan.nama }}</LabelContAt>
                <LabelContAt label="tanggal kunjungan" val="">{{ kunjungan.visit_date }}</LabelContAt>
                <LabelContAt label="Jumlah Pengajuan Pinjaman" val="">{{ kunjungan.plafond }}</LabelContAt>
                <LabelContAt label="tenor" val="">{{ kunjungan.tenor }}</LabelContAt>
                <LabelContAt label="tujuan kredit" val="">{{ kunjungan.tujuan_kredit }}</LabelContAt>
                <!-- <LabelContAt :val="kunjungan.nama" label="Atas Nama" long="def"></LabelContAt> -->
                <!-- <LabelContAt :val="kunjungan.visit_date" label="Waktu Kunjungan"></LabelContAt>
                <LabelContAt :val="kunjungan.alamat" label="Alamat Kunjungan"></LabelContAt> -->
                <!-- <LabelContAt :val="kunjungan.data_ao" label="Petugas"></LabelContAt> -->
                <DividedAt />
                <label class="text-sm text-signal-red" v-if="!terms">terms harus di ceklis</label>
                <div class="flex justify-center md:justify-start">
                    <BaseButtonAt @click="confirm" :disabled="!terms && 'disabled'"
                        class="mt-6 text-white bg-pr rounded-lg flex !p-2 w-full md:w-1/5 justify-center !font-bold">
                        Setuju
                    </BaseButtonAt>
                </div>
            </div>
            <div v-else class="flex">
                <div class="flex flex-col w-full bg-sf p-4">
                    <h1 class="text-2xl flex">Terimakasih</h1>
                    <p class="text-sf-drk-500">telah melakukan approval</p>
                </div>
            </div>
        </div>
        <div v-else class="py-10 text-center">
            <div class="flex justify-center" v-if="suspense">
                <LoaderComponent />
            </div>
            <!-- <div v-else class="bg-sf rounded-xl py-10">
                <v-icon name="ri-checkbox-circle-line" scale="2" class="text-signal-green my-4"></v-icon>
                <h1 class="text-2xl flex justify-center">Terimakasih</h1>
                <p class="text-sf-drk-500">telah melakukan approval</p>
            </div> -->
            <div class="bg-sf rounded-xl py-10" v-else>
                <v-icon name="ri-emotion-sad-line" scale="2" class="text-signal-red my-4"></v-icon>
                <h1 class="text-2xl flex justify-center">Yaah Maaf!</h1>
                <p class="text-sf-drk-500">Halaman yang anda minta tidak ada / sudah kadaluwarsa</p>
            </div>
        </div>
        <div class="mt-4 flex justify-between">
            <p class="max-w-2xl text-sm leading-6 text-sf-drk-600">
                ID Halaman : {{ page_id = $route.params.id }}<br />
            </p>
            <img class="w-8 filter grayscale opacity-80"
                src="http://8a73085df21a.sn.mynetname.net:9000/storage/public/assets/nmhregd35XcxiUk6ABtZVwIa46XS9xrdQPM9upTW.svg" />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import routes from "@/router/index.js";
import axios from "axios";
import BaseButtonAt from '@/components/atoms/BaseButtonAt.vue';
import DividedAt from '@/components/atoms/DividedAt.vue';
import LabelContAt from '@/components/atoms/LabelContAt.vue';
import LoaderComponent from "@/components/atoms/LoaderComponent.vue";
const decBase64 = (link) => atob(link);
onMounted(async () => {
    param_id.value = decBase64(page_id.value);
    await getExpLink(param_id.value);
    await getDataDetail();
});
const terms = ref(true);
const page_id = ref();
const param_id = ref();
const aggre = ref(false);
const exp_link = ref();
const debitur = ref(false);
const suspense = ref(false);
const pageAvailable = ref(true);
const kunjungan = ref([]);

const apibase = import.meta.env.VITE_APP_API_BASE;
const token = localStorage.getItem("token");
const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
};
const getExpLink = async (id) => {
    let url = `${apibase}/getExpiredLink/${id}`;
    try {
        let getExpLinkHttp = await axios.get(url, config);
        exp_link.value = getExpLinkHttp.data.response[0].url;
    } catch (error) {
        console.log(error)
    }
}
const getDataDetail = async () => {
    let url = exp_link.value;
    try {
        let dataDetailHttp = await axios.get(url);
        kunjungan.value = dataDetailHttp.data.response;
    } catch (error) {
        pageAvailable.value = !pageAvailable.value
    }
}

const confirm = async () => {
    aggre.value = true;
    let prospect_id = kunjungan.value.id;
    let url = `${apibase}/approval`;
    const payload = {
        "cr_prospect_id": prospect_id,
        "deb_approval": "yes",
        "deb_description": "nodesc"
    }
    try {
        await axios.put(url, payload, config);
    } catch (error) {
        console.log(error)
    }
    suspense.value = true;
    setTimeout(() => suspense.value = false, 2000);
}
</script>