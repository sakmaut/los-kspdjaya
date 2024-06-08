<template>
    <div class="px-4">
        <div class="flex mt-10 w-full justify-center" v-if="suspense">
            <LoaderComponent />
        </div>
        <table-view :heading :body-data="tableData" :action="tableAction" nav-head ref="tableref" v-else>
        </table-view>
    </div>
</template>
<script setup>
import { computed, ref } from "vue";
const tableref = ref(null);
import router from "@/router";
import { useAPIget } from "@/support/api.js";
import TableView from "@/components/atoms/TableBaseAt.vue";
import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
import LoaderComponent from "@/components/atoms/LoaderComponent.vue";

const tableData = ref([]);
const tableAction = {
    'add': false,
    'search': true,
    'update': false,
    'delete': false,
    'detail': false,
    'download': true,
}
const suspense = ref(true);
const token = localStorage.getItem("token");
useAPIget("kunjungan_admin", token).then(([res]) => { tableData.value = res; suspense.value = !suspense.value; });
const heading = [{ visit_date: "Tanggal Survey", nama_debitur: "Nama", alamat: "Alamat", hp: "No Handphone", plafond: "Plafond" }];
const createFpk = (e) => {
    console.log(e);
}
</script>