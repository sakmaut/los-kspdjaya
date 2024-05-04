<template>
    <scaff-mol class="min-h-screen flex-col" @keydown.esc="clearInput">
        <div class="sticky top-0 flex bg-slate-200/50 backdrop-blur w-full p-4 gap-4">
            <div class="m-3 justify-center items-center flex">
                <img class="w-10"
                    src="http://8a73085df21a.sn.mynetname.net:9000/storage/public/assets/nmhregd35XcxiUk6ABtZVwIa46XS9xrdQPM9upTW.svg">
            </div>
            <InputAt class="w-full" label="Account Number" v-model="input.acc_number" @keyup.enter="findData">
                <template #action>
                    <span @click="clearInput" v-if="input.acc_number != ''"
                        class="flex bg-sfd items-center justify-center h-6 aspect-square p-0.5 border border-sf-drk-500 rounded text-sf-drk-500">esc</span>
                </template>
            </InputAt>
            <div class="flex w-fit h-18 items-center text-sf-drk-400" @click="findData">
                <v-icon name="ri-search-line" scale="2" />
            </div>
            <div v-if="dataResult.length != 0"
                class="flex w-fit h-18 items-center text-green-900 font-bold cursor-pointer" @click="exportFile">
                <v-icon name="ri-file-excel-2-fill" scale="2" />
                <span class="hidden md:flex">Export</span>
            </div>
        </div>
        <div class="justify-center flex">
            <div v-if="loader" class="flex mt-10">
                <Loader />
            </div>
            <div v-if="dataResult.length != 0" class="flex w-full">
                <table cellspacing="4" class="w-full table-auto">
                    <thead>
                        <tr class="bg-slate-300/50 backdrop-blur sticky top-24 border-y-2 text-sf-drk-500 text-xs">
                            <th class="p-2" align="left">ACC_NUMBER</th>
                            <th align="left">VALUE_DATE</th>
                            <th align="left">ENTRY_TIME</th>
                            <th align="center">TRANS_DESC</th>
                            <th align="center">AMOUNT</th>
                            <th align="left">NO_REF</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b hover:bg-sc/50" v-for="row in dataResult" :key="row.ID">
                            <td class="py-4 px-2">{{ row.ACC_NUMBER }}</td>
                            <td class="py-4 px-2" align="left">{{ row.VALUE_DATE }}</td>
                            <td class="py-4 px-2">{{ row.ENTRY_TIME }}</td>
                            <td class="py-4 px-2">{{ row.TRANS_DESC }}</td>
                            <td class="py-4 px-2" align="right">{{ num_format(row.AMOUNT) }}</td>
                            <td class="py-4 px-2">{{ row.NO_REF }}</td>
                        </tr>
                        <tr>
                            <td colspan="7" align="center" class="text-sf-drk-500 font-mono"> end data</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </scaff-mol>
</template>
<script setup>
import ScaffMol from "@/components/molecules/ScaffMol.vue";
import InputAt from "@/components/atoms/InputAt.vue";
import Loader from "@/components/atoms/LoaderComponent.vue";
import { reactive, ref } from "vue";
import axios from "axios";
import { read, utils, writeFileXLSX } from 'xlsx';

const input = reactive({
    acc_number: ''
});
const num_format = ((num) => {
    num = num.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(num))
        num = num.replace(pattern, "$1,$2");
    return num;
});
const dataResult = ref([]);
const dataWb = ref([]);
const loader = ref(false);

const clearInput = (() => {
    input.acc_number = "";
});
const findData = async () => {
    try {
        loader.value = true;
        let getData = await axios.post('http://8a73085df21a.sn.mynetname.net:9000/v2/historyAcc', input);
        dataResult.value = getData.data.response;
        loader.value = false;
    } catch (error) {
        console.log(error);
    }

}
function exportFile() {
    const ws = utils.json_to_sheet(dataResult.value);
    const wb = utils.book_new();
    const time = Date.now();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, `history_acc_${input.acc_number}.xlsx`);
}
</script>