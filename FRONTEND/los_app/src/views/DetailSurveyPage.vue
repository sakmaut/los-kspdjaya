<template>
    <Teleport to="body">
        <PopLayer @pop="pop" v-show="expand">
            <div class="flex w-[50lvh] p-4 pt-10">
                <div class="flex flex-col gap-4 w-full">
                    <BaseTextareaAt label="catatan" v-model="keterangan" />
                    <div class="flex gap-2">
                        <BaseButtonAt class="bg-pr !font-bold !text-white hover:bg-pr-800" @click="buttonAction('yes')">
                            Setuju
                        </BaseButtonAt>
                        <BaseButtonAt class="bg-er !text-white !font-bold hover:bg-er/80" @click="buttonAction('no')">
                            Tolak
                        </BaseButtonAt>
                    </div>
                </div>
            </div>
        </PopLayer>
    </Teleport>
    <div class="px-4">
        <form @submit.prevent="submit" class="py-4" v-for="data in dataPage" :key="data">
            <div class="sticky top-16 flex bg-white/80 backdrop-blur p-4 border justify-between">
                <div class="bg-sc-50 p-2 rounded-md">no order: <strong>{{ data.id }}</strong></div>
                <div class="bg-pr text-white p-2 rounded-md cursor-pointer" @click="expandBox"
                    v-if="data.prospect_approval.status.charAt(0) == '0'">approval
                </div>
                <div v-else class="bg-sc-50 p-2 rounded-md text-pr">{{ data.prospect_approval.status }}
                </div>
            </div>
            <div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 border">
                    <div class="flex justify-between col-span-2">Data Order
                    </div>
                    <label-box label="Plafond" :val="data.data_order.plafond" />
                    <label-box label="tujuan kredit" :val="data.data_order.tujuan_kredit" />
                    <label-box label="tenor" :val="data.data_order.tenor" />
                    <label-box label="kategory" :val="data.data_order.kategory" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 border ">
                    <div class=" col-span-3">Data Pelanggan</div>
                    <div class="flex gap-4 py-4 col-span-3">
                        <ImageBoxRead label="KTP Pelanggan" src="asdasdsad"></ImageBoxRead>
                        <ImageBoxRead label="KTP Pasangan" src="asdasdsad"></ImageBoxRead>
                        <ImageBoxRead label="KK" src="asdasdsad"></ImageBoxRead>
                    </div>
                    <div class="col-span-3 gap-4 grid grid-cols-2 p-2">
                        <label-box label="No KTP" :val="data.data_nasabah.no_ktp" />
                        <label-box label="nama" :val="data.data_nasabah.nama" />
                        <label-box label="Tanggal lahir" :val="data.data_nasabah.tgl_lahir" />
                        <div class="grid grid-cols-6 gap-4">
                            <label-box label="alamat" :val="data.data_nasabah.alamat" class="col-span-4" />
                            <label-box label="rt" :val="data.data_nasabah.rt" />
                            <label-box label="rw" :val="data.data_nasabah.rw" />
                        </div>
                        <label-box label="provinsi" :val="data.data_nasabah.provinsi" class="col-span-4" />
                        <label-box label="kota" :val="data.data_nasabah.kota" />
                        <label-box label="kecamatan" :val="data.data_nasabah.kecamatan" />
                        <label-box label="kelurahan" :val="data.data_nasabah.kelurahan" />
                        <label-box label="no Handphone" :val="data.data_nasabah.no_hp" />
                    </div>
                </div>
                <div>
                    <div class="flex flex-col gap-4 bg-white p-4 border ">
                        <div class="flex justify-between">Data Jaminan
                        </div>
                        <div v-for="(jaminan, i) in data.jaminan_kendaraan" key="jaminan">
                            <div class="flex justify-between py-2 items-center gap-2 jus">
                                <div class="flex w-full">Jaminan {{ i + 1 }}</div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="flex flex-col gap-4">
                                    <div class="flex gap-4 col-span-3 ">
                                        <ImageBoxRead label="no rangka" src="asdasdsad"></ImageBoxRead>
                                        <ImageBoxRead label="no mesin" src="asdasdsad"></ImageBoxRead>
                                        <ImageBoxRead label="no STNK" src="asdasdsad"></ImageBoxRead>
                                    </div>
                                    <div class="flex gap-4 col-span-3">
                                        <ImageBoxRead label="Depan" src="asdasdsad"></ImageBoxRead>
                                        <ImageBoxRead label="belakang" src="asdasdsad"></ImageBoxRead>
                                        <ImageBoxRead label="kanan" src="asdasdsad"></ImageBoxRead>
                                        <ImageBoxRead label="kiri" src="asdasdsad"></ImageBoxRead>
                                    </div>
                                </div>
                                <div class="grid bg-white p-4 border rounded-md gap-4">
                                    <div class="pb-4">Detail Jaminan</div>
                                    <div class="grid grid-cols-3 gap-4">
                                        <label-box label="Tipe" :val="jaminan.tipe" />
                                        <label-box label="merk" :val="jaminan.merk" />
                                        <label-box label="tahun" :val="jaminan.tahun" />
                                        <label-box label="warna" :val="jaminan.warna" />
                                        <label-box label="atas nama" :val="jaminan.atas_nama" />
                                        <label-box label="nilai jaminan" :val="jaminan.nilai" />
                                        <div class="flex gap-2 col-span-3">
                                            <label-box label="no polisi" :val="jaminan.no_polisi" />
                                            <label-box label="no rangka" :val="jaminan.no_rangka" />
                                            <label-box label="no mesin" :val="jaminan.no_mesin" />
                                            <label-box label="no BPKB" :val="jaminan.no_bpkb" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 border rounded-b-md">
                    <div class="col-span-2">Data Survey</div>
                    <label-box label="tanggal survey" :val="data.data_survey.tgl_survey" />
                    <label-box label="usaha" :val="data.data_survey.usaha" />
                    <label-box label="sektor" :val="data.data_survey.sektor" />
                    <label-box label="lama bekerja" :val="data.data_survey.lama_bekerja" />
                    <label-box label="tanggungan" :val="data.data_survey.tanggungan" />
                    <label-box label="penghasilan pribadi" :val="data.data_survey.penghasilan_pribadi" />
                    <label-box label="penghasilan pasangan" :val="data.data_survey.penghasilan_pasangan" />
                    <label-box label="penghasilan lainnya" :val="data.data_survey._lainnya" />
                    <label-box label="pengeluaran" :val="data.data_survey.pengeluaran" />
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useAPIget, useAPIPost } from "@/support/api.js";
import { useRoute } from "vue-router";
import axios from "axios";
import router from "@/router";

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import BaseInputRead from "@/components/atoms/BaseInputRead.vue";
import BaseSelectBoxAt from "@/components/atoms/BaseSelectBoxAt.vue";
import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
import BaseTextareaAt from "@/components/atoms/BaseTextareaAt.vue";
import LabelBox from "@/components/atoms/LabelBoxAt.vue";
import ImageBoxRead from "@/components/atoms/ImageBoxRead.vue";
import PopLayer from "@/components/atoms/PopLayer.vue";

const suspense = ref();
const id_page = ref();
const dataPage = ref();
const keterangan = ref();

const expand = ref(false);
const popdata = ref(false);
const $toast = useToast();
const pop = () => expand.value = false;
const expandBox = (index) => {
    expand.value = true;
}


const baseRoute = useRoute();
const decBase64 = (link) => atob(link);
id_page.value = decBase64(baseRoute.params.surveyId);
const token = localStorage.getItem("token");
useAPIget(`kunjungan/${id_page.value}`, token).then((res) => { dataPage.value = res; suspense.value = !suspense.value; });
const buttonAction = (e) => {
    let payload = {
        cr_prospect_id: id_page.value,
        flag: e,
        keterangan: keterangan.value,
    }
    const token = localStorage.getItem("token");
    let post = useAPIPost('kunjungan_approval', payload, token).then(([res]) => { console.log(res) });
    try {
        let post = useAPIPost('kunjungan_approval', payload, token).then(([res]) => { console.log(res) });
        setTimeout(() => {
            $toast.open({
                message: 'yeaaay approval berhasil',
                type: 'success',
                duration: 2000,
            });
            expand.value = false;
        }, 2000);
        setTimeout(() => { router.replace('/task/approval'); }, 1000);
    } catch (error) {
        setTimeout(() => {
            $toast.open({
                message: 'yaah approfval gagal',
                type: 'error',
                duration: 2000,
            });
        }, 3000);
    }
}
</script>