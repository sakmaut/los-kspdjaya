<template>
    <div class="px-4">
        <div class="flex mt-10 w-full justify-center" v-if="suspense">
            <LoaderComponent />
        </div>

        <table-view :heading :body-data="tableData" :action="tableAction" nav-head v-else actionvisible ref="tableref">
            <template #th>
                STATUS
            </template>
            <template #td>
                <div class="justify-start flex w-full">
                    <BaseBadgeAt class="text-signal-yellow bg-signal-yellowsf" v-if="statusChild.at(0) == 0">menunggu
                    </BaseBadgeAt>
                    <BaseBadgeAt class="text-pr bg-pr-50" v-if="statusChild.at(0) == 1">Approved / reject
                    </BaseBadgeAt>
                    <BaseBadgeAt class="text-pr bg-pr-50" v-if="statusChild.at(0) == 2">pembuatan
                        FPK
                    </BaseBadgeAt>
                </div>
            </template>
        </table-view>
    </div>
</template>
<script setup>
import { ref, computed } from "vue";
const tableref = ref();
const idChild = computed(() => tableref.value?.idData);
const statusChild = computed(() => tableref.value?.statusData);
import { useAPIget } from "@/support/api.js";
import TableView from "@/components/atoms/TableBaseAt.vue";
import LoaderComponent from "@/components/atoms/LoaderComponent.vue";

const tableData = ref([]);
const tableAction = {
    'add': false,
    'search': true,
    'update': false,
    'delete': false,
    'detail': true,
    'download': true,
}
const suspense = ref(true);
const token = localStorage.getItem("token");
useAPIget("kunjungan_kapos", token).then(([res]) => { tableData.value = res; suspense.value = !suspense.value; });
const heading = [{ visit_date: "Tanggal Survey", nama_debitur: "Nama", alamat: "Alamat", hp: "No Handphone", plafond: "Plafond", status: 'status' }];
</script>