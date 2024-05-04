<template>
    <table class="table-auto w-full text-class">
        <thead>
            <tr class="tr-class">
                <th class="th-class">No</th>
                <th class="th-class" v-for="item in heading[0]" :key="item">{{ item.toUpperCase() }}
                </th>
                <th class="th-class"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in  showData " :key="i" class="row-class">
                <td class="td-class td-lead-class">{{ i + 1 }}</td>
                <td class="td-class td-lead-class">{{ useIndDate(item.visit_date) }}</td>
                <td class="td-class ">{{ item.nama_debitur }}</td>
                <td class="td-class ">
                    <long-string :val="item.alamat" long="15" />
                </td>
                <td class="td-class">
                    <div class="flex items-center">
                        <AvatarAt class="w-8" />
                        <long-string :val="item.data_ao.nama_ao" long="15" />
                    </div>
                </td>
                <td class="td-class">
                    <router-link :to="{ name: 'Form Pengajuan Kredit', params: { prospectId: base64(item.id) } }">
                        <BaseButtonAt class="text-sm font-semibold" def @click="showMore">
                            ajukan kredit
                        </BaseButtonAt>
                    </router-link>
                    <!-- <BadgeAt variant="disable" v-if="item.slik_approval">
                        {{ item.slik_approval.SLIK_RESULT }}
                    </BadgeAt> -->
                    <!-- <div v-if="item.slik_approval != null" class="flex gap-1">
                        <BadgeAt variant="success">
                            {{ item.slik_approval ? item.slik_approval.ONCHARGE_PERSON ? 'SPV' : 'waiting spv' : ''
                            }}
                        </BadgeAt>
                        <BadgeAt variant="success">
                            {{ item.slik_approval ? item.slik_approval.DEB_APPRVL ? 'Debitur' : 'waiting spv' : ''
                            }}
                        </BadgeAt>
                    </div>
                    <BadgeAt variant="disabled" v-else>
                        u/n
                    </BadgeAt> -->
                </td>
                <td class="td-class">
                    <Menu as="div" class="relative inline-block text-left">
                        <MenuButton>
                            <BaseButtonAt>
                                <v-icon name="ri-more-2-line" />
                            </BaseButtonAt>
                        </MenuButton>
                        <transition enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0">
                            <MenuItems
                                class="absolute text-nowrap right-0 z-10 w-fit origin-top-right divide-y divide-gray-100 dark:divide-sf-drk-500 overflow-clip rounded-md bg-white dark:bg-sf-drk-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                <MenuItem v-slot="{ active }" as="div" @click="sendApprove(item.id)">
                                <a class="flex gap-2"
                                    :class="[active ? 'text-signal-green' : 'text-gray-700', 'cursor-pointer block px-2 py-2 text-sm']">
                                    <v-icon name="ri-mail-send-line" />
                                    kirim approval</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }" as="div">
                                <a class="flex gap-2"
                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'cursor-pointer block px-2 py-2 text-sm']">
                                    <v-icon name="ri-edit-2-line" />
                                    Edit</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }" as="div" @click="removeData(i)">
                                <a class="flex gap-2"
                                    :class="[active ? 'bg-er/10 text-er' : 'text-gray-700', 'cursor-pointer block px-2 py-2 text-sm']">
                                    <v-icon name="ri-delete-bin-2-line" />
                                    Hapus</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }" as="div" @click="detailProspect(item.id)">
                                <a class="flex gap-2"
                                    :class="[active ? 'bg-pr-100 text-pr' : 'text-gray-700', 'cursor-pointer block px-2 py-2 text-sm']">
                                    <v-icon name="ri-pages-line" />
                                    Detail</a>
                                </MenuItem>

                            </MenuItems>
                        </transition>
                    </Menu>

                </td>
            </tr>
        </tbody>
    </table>
    <div class="text-sm justify-center flex p-2 text-sf-drk-600" v-if="showData.length == bodyData.length">
        data ditampilkan semua
    </div>
    <div class="text-class text-sm flex justify-center p-2" v-else>
        <BaseButtonAt class="text-sm cursor-help" def @click="showMore">
            <v-icon name="ri-arrow-drop-down-line" class="animate-bounce" /> tampilkan lebih banyak {{
                    $route.params.prospect }}
        </BaseButtonAt>
    </div>
    <div
        class="sticky bottom-4 text-sc-300 text-sm bg-sc-100/50 backdrop-blur rounded-md dark:bg-sf-drk-300 p-2 flex justify-between">
        <div>ditampilkan : {{ showData.length }} baris</div>
        <div>total data :{{ bucket.length }} baris</div>
        <div>tampilkan : <select v-model="rowData">
                <option :value="bodyData.length">no limit</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
            </select> data</div>

    </div>
</template>
<script setup>
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useIndDate } from "@/support/date";
import _ from "lodash";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ref, computed, onMounted } from "vue";
const rowData = ref(10);
const currentRowData = ref(10);

const bsheet = ref(false);

const spvData = ref([]);
const kunjunganData = ref([]);
const id_petugas = ref();
const hp_spv = ref();
const link_approve = ref();
const hp_cust = ref();
const payloadWACust = ref();
const payloadWASpv = ref();
const base64 = (s) => btoa(s);

const apibase = import.meta.env.VITE_APP_API_BASE;
const urlbase = import.meta.env.VITE_APP_URL_BASE;

const token = localStorage.getItem("token");

const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
};




const getKunjungan = async (id) => {
    let url = `${apibase}/kunjungan/${id}`;
    try {
        let getKunjunganHttp = await axios.get(url, config);
        kunjunganData.value = getKunjunganHttp.data.response;
        hp_cust.value = kunjunganData.value.hp;
        id_petugas.value = kunjunganData.value.data_ao[0].id_ao;
        await getSpv(id_petugas.value);
        await createUrl(id);
        payloadWACust.value = {
            "phone_number": hp_cust.value,
            "message": `[cust] kirim link ini ${link_approve.value}`
        };
        await createUrl(id);
        payloadWASpv.value = {
            "phone_number": hp_cust.value,
            "message": `[spv] kirim link ini ${link_approve.value}`
        };

    } catch (error) {
        console.log(error)
    }
}
const getSpv = async (id) => {
    let url = `${apibase}/getSpv`;
    let payload = {
        "employee_id": id
    };
    try {
        let getSpvHtpp = await axios.post(url, payload, config);
        spvData.value = getSpvHtpp.data.response;
        hp_spv.value = spvData.value[0].HP;
    } catch (error) {
        console.log(error)
    }
}
const postWa = async (payload) => {
    let url = `${apibase}/waweb/logs`;
    let payloadData = payload;
    try {
        let postWAHttp = await axios.post(url, payloadData, config);
        console.log(postWAHttp);
    } catch (error) {
        console.log(error)
    }
}
const createUrl = async (id) => {
    let url = `${apibase}/createurl`;
    let payload = {
        "id": id
    };
    try {
        let createUrlHtpp = await axios.post(url, payload, config);
        link_approve.value = getConfirmUrl(createUrlHtpp.data.response.id);
    } catch (error) {
        console.log(error)
    }
}
const getConfirmUrl = (id) => {
    let idHash = base64(id);
    const url = `${urlbase}/konfirmasi/${idHash}`;
    return url;
}

const sendApprove = async (id) => {
    await getKunjungan(id);
    // await createUrl(id);
    await postWa(payloadWACust.value);
    await postWa(payloadWASpv.value);
    // //let idPetugas = kunjunganData.value.data_ao[0].id_ao;
    // // getSpv(idPetugas);
    // console.log(linkapprove);
    // // console.log(idPetugas);
    // console.log(hpcust);
    toast.success(`permintaan approval berhasil terkirim`, {
        autoClose: 3000,
        closeButton: false,
        toastClassName: 'rounded-xl bg-white dark:bg-sf-drk-100',
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
    });
}

import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
import LongString from "@/components/atoms/LongString.vue";
import router from "@/router";
import AvatarAt from "@/components/atoms/AvatarAt.vue";
import BadgeAt from "@/components/atoms/BadgeAt.vue";
import BottomSheet from "@/components/atoms/BottomsheetAt.vue";

const props = defineProps({
    heading: Object,
    bodyData: Object
});
const bucket = ref([]);
const deletedItem = ref();
const showData = computed(() => {
    return _.slice(bucket.value, 0, rowData.value)
}
);
onMounted(() => {
    bucket.value = props.bodyData
});
const showMore = (() => {
    rowData.value = rowData.value * 2;
});


const detailProspect = (key) => {
    let urldata = base64(key);
    router.push(`/task/visit/${urldata}`);
};

const removeData = (e) => {
    deletedItem.value = bucket.value[e];
    bucket.value.splice(e, 1);
    toast.success("data berhasil dihapus", {
        autoClose: 2000,
        closeButton: false,
        toastClassName: 'rounded-xl bg-white dark:bg-sf-drk-100',
        position: toast.POSITION.TOP_RIGHT,
    });
}
</script>

<style>
.text-class {
    @apply text-sc-600 dark:text-sc-200
}

.th-class {
    @apply text-left text-pr dark:text-pr-500 font-normal border-y-2 border-sc-ot dark:border-sc py-1
}

.tr-class {
    @apply -z-0 sticky top-10 bg-white/80 backdrop-blur dark:bg-sf-drk-200/80
}

.row-class {
    @apply hover:bg-sc-50 hover:dark:bg-sf-drk-300
}

.td-class {
    @apply py-2 border-b border-sc-ot dark:border-sc
}

.td-lead-class {
    @apply font-semibold text-sc-700 dark:text-sc-300
}

.suspended-text {
    @apply text-gray-500
}
</style>