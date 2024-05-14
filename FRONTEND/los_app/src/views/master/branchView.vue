<template>
    <div class="px-4">
        <div class="flex mt-10 w-full justify-center" v-if="suspense">
            <LoaderComponent />
        </div>

        <table-view :heading :body-data="tableData" :action="tableAction" nav-head v-else />
    </div>
</template>
<script setup>
import { ref } from "vue";

import { useAPIget } from "@/support/api.js";
import TableView from "@/components/atoms/TableBaseAt.vue";
import LoaderComponent from "@/components/atoms/LoaderComponent.vue";

const tableData = ref([]);
const tableAction = {
    'add': true,
    'search': true,
    'update': true,
    'delete': true,
    'detail': true,
    'download': true,
}
const suspense = ref(true);
const token = localStorage.getItem("token");
useAPIget("cabang", token).then(([res]) => { tableData.value = res; suspense.value = !suspense.value; });
const heading = [{ kode: "Kode", nama: "Nama", alamat: "Alamat", lokasi: "Lokasi", telp_1: "No Telp 1", telp_2: "No Telp 2", telp_3: "No Telp 3", keterangan: "Deskripsi", status: "status", }];
</script>