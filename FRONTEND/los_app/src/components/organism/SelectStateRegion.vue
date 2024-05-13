<template>
    <div class="relative">
        <select id="regional" v-model="sel_provinsi"
            class="peer w-full border bg-white text-sm rounded-md placeholder:text-transparent p-[7px] focus:outline-none"
            @change="provinsiChanged($event)">
            <option disabled value="pilih">Pilih Provinsi</option>
            <option v-for=" provinsi in col_provinsi" :key="provinsi.id" :value="provinsi">
                {{ provinsi.name }} </option>
        </select>
        <label for="regional"
            class="absolute left-0 ml-1 capitalize -translate-y-3 bg-white px-1 text-sm text-sc-500 duration-100 ease-linear peer-placeholder-shown:translate-y-2 peer-placeholder-shown:text-xl peer-placeholder-shown:text-sc-300 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm peer-focus:text-pr">Regional</label>
    </div>
    <div class="relative">
        <select id="kota" v-model="sel_kota"
            class="peer w-full border bg-white text-sm rounded-md placeholder:text-transparent p-[7px] focus:outline-none"
            @change="kotaChanged($event)">
            <option disabled value="pilih">Pilih Kota</option>
            <option v-for="kota in col_kota" :key="kota.id" :value="kota">
                {{ kota.name }} </option>
        </select>
        <label for="kota"
            class="absolute left-0 ml-1 capitalize -translate-y-3 bg-white px-1 text-sm text-sc-500 duration-100 ease-linear peer-placeholder-shown:translate-y-2 peer-placeholder-shown:text-xl peer-placeholder-shown:text-sc-300 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm peer-focus:text-pr">Kabupaten
            / Kota</label>
    </div>
    <div class="relative">
        <select id="kecamatan" v-model="sel_kec"
            class="peer w-full border bg-white text-sm rounded-md placeholder:text-transparent p-[7px] focus:outline-none"
            @change="kecChanged($event)">
            <option disabled value="pilih">Pilih Kecamatan</option>
            <option v-for="kec in col_kec" :key="kec.id" :value="kec">
                {{ kec.name }} </option>
        </select>
        <label for="kecamatan"
            class="absolute left-0 ml-1 capitalize -translate-y-3 bg-white px-1 text-sm text-sc-500 duration-100 ease-linear peer-placeholder-shown:translate-y-2 peer-placeholder-shown:text-xl peer-placeholder-shown:text-sc-300 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm peer-focus:text-pr">Kecamatan</label>
    </div>
    <div class="relative">

        <select id="desa" v-model="sel_desa"
            class="peer w-full border bg-white text-sm rounded-md placeholder:text-transparent p-[7px] focus:outline-none">
            <option disabled value="pilih">Pilih Desa</option>
            <option v-for="desa in col_desa" :key="desa.id" :value="desa">
                {{ desa.name }}</option>
        </select>
        <label for="desa"
            class="absolute left-0 ml-1 capitalize -translate-y-3 bg-white px-1 text-sm text-sc-500 duration-100 ease-linear peer-placeholder-shown:translate-y-2 peer-placeholder-shown:text-xl peer-placeholder-shown:text-sc-300 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm peer-focus:text-pr">Kelurahan
            / Desa</label>
    </div>
</template>

<script setup>
import { useOpenAPIget } from "@/support/api.js";
import axios from "axios";
import { ref } from "vue";

const sel_provinsi = ref('pilih');
const sel_kota = ref('pilih');
const sel_kec = ref('pilih');
const sel_desa = ref('pilih');
const col_provinsi = ref();
const col_kota = ref();
const col_kec = ref();
const col_desa = ref();

const provinsiChanged = async () => {
    let idprov = sel_provinsi.value.id;
    try {
        let getKota = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${idprov}.json`);
        col_kota.value = getKota.data;
    } catch (error) {
        console.log(error);
    }
};
const kotaChanged = async () => {
    let idKota = sel_kota.value.id
    try {
        let getKec = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${idKota}.json`);
        col_kec.value = getKec.data;
    } catch (error) {
        console.log(error);
    }
};
const kecChanged = async () => {
    let idKec = sel_kec.value.id
    try {
        let getKec = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${idKec}.json`);
        col_desa.value = getKec.data;
    } catch (error) {
        console.log(error);
    }
};

const getProvinsi = useOpenAPIget("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json").then(([res]) => { col_provinsi.value = res });
defineProps({
    label: {
        type: [String, Boolean],
        default: false,
    },
    error: {
        type: [String, Boolean],
        default: false,
    },
    options: {
        type: Object,
    },
    modelValue: {
        type: String,
        default: "kosong",
    },
    loop: {
        type: [Number, Boolean]
    }
});
</script>