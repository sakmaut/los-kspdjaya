<template>
    <div class="px-4">
        <div class="flex mt-10 w-full justify-center" v-if="suspense">
            <LoaderComponent />
        </div>

        <table-view :heading :body-data="tableData" :action="tableAction" nav-head v-else actionvisible ref="tableref">
        </table-view>
    </div>
</template>
<script setup>
import { ref, computed } from "vue";
const tableref = ref();
import { useAPIget } from "@/support/api.js";
import TableView from "@/components/atoms/TableBaseAt.vue";
import LoaderComponent from "@/components/atoms/LoaderComponent.vue";
import BaseBadgeAt from "@/components/atoms/BaseBadgeAt.vue";

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
useAPIget("kunjungan", token).then(([res]) => { tableData.value = res; suspense.value = !suspense.value; });
const heading = [{ visit_date: "Tanggal Survey", nama_debitur: "Nama", alamat: "Alamat", hp: "No Handphone", plafond: "Plafond" }];
</script>