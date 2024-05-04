<template>
    <CardAt class="p-4 bg-white dark:bg-sf-drk-300/50">
        <template #header>
            <div class="flex justify-between pb-1 mb-3">
                <span>Prospek</span>
                <div class="flex">
                    <BaseButtonAt def @click="find" :class="findBox && 'text-red-500'">
                        <v-icon :name="!findBox ? 'ri-search-line' : 'ri-close-circle-line'" />
                        <span class="hidden md:flex">cari</span>
                    </BaseButtonAt>
                    <BaseButtonAt def @click="add">
                        <v-icon name="ri-add-circle-line" />
                        <span class="hidden md:flex">tambah</span>
                    </BaseButtonAt>
                    <BaseButtonAt def @click="vstyle = false">
                        <v-icon :name="!vstyle ? 'ri-table-fill' : 'ri-table-line'" />
                        <span class="hidden md:flex"></span>
                    </BaseButtonAt>
                    <!-- <BaseButtonAt def @click="vstyle = true">
                        <v-icon :name="vstyle ? 'ri-layout-grid-fill' : 'ri-layout-grid-line'" />
                        <span class="hidden md:flex"></span>
                    </BaseButtonAt> -->
                </div>
            </div>
            <Transition name="fade">
                <div class="flex items-center mb-4" v-if="findBox">
                    <input-box type="date" label="tanggal" />
                    <input-box label="nama" v-model="sBoxNama" />
                    <input-box label="alamat" />
                    <!-- <div>
                        {{ filterItems.length }}
                    </div> -->
                </div>

            </Transition>
        </template>
        <template #body>

            <div v-if="suspense" class="w-full justify-center my-10 flex">
                <LoaderComponent />
            </div>
            <Transition name="slide-fade" v-else>
                <!-- <grid-card :heading :body-data="filterItems" v-if="vstyle" /> -->
                <table-list :heading :body-data="filterItems" />
            </Transition>
        </template>
    </CardAt>
    <!-- Modal -->
    <div>
        <div v-if="showModal" class="fixed inset-0 bg-gray-500 bg-opacity-25 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-xl w-2/3 z-50">
                <h1 class="text-lg font-bold mb-4">Modal Title</h1>
                <p><strong>Nama:</strong> {{ selectedProspect.nama }}</p>
                <p><strong>Alamat:</strong> {{ selectedProspect.alamat }}</p>
                <button @click="closeModal"
                    class="bg-red-400 hover:bg-red-300 text-gray-600 font-bold py-1 px-2 rounded mt-4">
                    <v-icon name="bi-X" class="text-sm" />
                    Close
                </button>
            </div>
        </div>

        <div v-if="showModal" class="fixed inset-0 z-40"></div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import router from "@/router/index";
import CardAt from "@/components/atoms/CardAt.vue";
import TableList from "./VisitTable.vue";
import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
import InputBox from "@/components/atoms/InputBox.vue";
import GridCard from "./VisitGridCard.vue";

import LoaderComponent from "@/components/atoms/LoaderComponent.vue";

const suspense = ref(false);
const findBox = ref(false);
const vstyle = ref(false);

const sBoxNama = ref("");

// table
const heading = [{
    visit_date: "tanggal",
    nama_debitur: "nama",
    alamat: "alamat",
    petugas: "petugas",
    slik: "slik",
}];
const bodyData = ref([]);

const showModal = ref(false);

const find = (() => {
    findBox.value = !findBox.value;

});
const add = (() => {
    router.push('apply-loan')
});

const apibase = import.meta.env.VITE_APP_API_BASE;
const url = `${apibase}/kunjungan`;

const token = localStorage.getItem("token");

const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
};

const listProspect = async () => {
    suspense.value = true;
    try {
        let getListProspect = await axios.get(url, config);
        bodyData.value = getListProspect.data.response;
        console.log(getListProspect.data.response);
        suspense.value = false;
    } catch (error) {
        console.log(error)
        suspense.value = true;
    }

}
const filterItems = computed(
    () => {
        let findData = sBoxNama.value;
        let query = findData.toLowerCase();
        console.log(filterItems)
        return bodyData.value.filter(item => item.nama_debitur.toLowerCase().indexOf(query) >= 0);
    }
);

onMounted(() => {
    listProspect();
});
</script>