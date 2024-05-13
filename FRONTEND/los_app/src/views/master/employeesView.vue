<template>

    <div class="p-4">
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
useAPIget("karyawan", token).then(([res]) => { tableData.value = res; suspense.value = !suspense.value; });
const heading = [{ NIK: "NIK", NAMA: "Nama", GENDER: "Jenis Kelamin", EMAIL: "Email", HP: "No Hp", STATUS_MST: "status", }];
</script>