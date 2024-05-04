<template>
    <div
        class="text-sc-300 my-2 text-sm bg-sc-100/50 backdrop-blur rounded-md dark:bg-sf-drk-300 p-2 flex justify-between">
        <div>ditampilkan : {{ showData.length }} baris</div>
        <div>total data :{{ bodyData.length }} baris</div>
        <div>tampilkan : <select v-model="rowData">
                <option :value="bodyData.length">no limit</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
            </select> data</div>

    </div>
    <div class="grid gap-2 md:grid-cols-4">
        <CardAt class="border-2 border-sc-ot dark:border-sf-drk-200 dark:bg-sf-drk-200 shadow overflow-clip"
            v-for="(item, i) in showData">
            <template #header>
                <div class="flex justify-between p-2 text-lg font-medium">
                    {{ item.nama_debitur }}
                    <div class="flex gap-1">
                        <div v-if="item.slik_approval != null" class="flex gap-1">
                            <BadgeAt variant="success">
                                {{ item.slik_approval ? item.slik_approval.ONCHARGE_PERSON ? 'SPV' : 'spv' : ''
                                }}
                            </BadgeAt>
                            <BadgeAt variant="success">
                                {{ item.slik_approval ? item.slik_approval.DEB_APPRVL ? 'Debitur' : 'debitur' : ''
                                }}
                            </BadgeAt>
                        </div>
                        <BadgeAt variant="disabled" v-else>
                            <v-icon name="ri-send-plane-line"></v-icon>kirim approval
                        </BadgeAt>
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
                                    class="absolute right-0 z-10 w-fit origin-top-right divide-y divide-gray-100 dark:divide-sf-drk-500 overflow-clip rounded-md bg-white dark:bg-sf-drk-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem v-slot="{ active }" as="div">
                                    <a class="flex gap-2"
                                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'cursor-pointer block px-2 py-2 text-sm']">
                                        <v-icon name="ri-edit-2-line" />
                                        Edit</a>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }" as="div" @click="removeData(i)">
                                    <a class=" flex gap-2"
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
                    </div>
                </div>
            </template>
            <template #body>
                <LabelCont class="items-center" label="petugas" val="" flex>
                    <div class="flex items-center">
                        <AvatarAt class="w-8" />
                        <long-string :val="item.data_ao.nama_ao" long="15" />
                    </div>
                </LabelCont>
                <DividedAt />
                <LabelCont label="tanggal" :val="item.visit_date" flex />
                <DividedAt />
                <LabelCont label="handphone" :val="item.hp" flex />
                <DividedAt />
                <LabelCont label="alamat" :val="item.alamat" flex />
            </template>
        </CardAt>
    </div>
    <div class="text-sm justify-center flex p-2 text-sf-drk-600" v-if="showData.length == bodyData.length">
        data ditampilkan semua
    </div>
    <div class="text-class text-sm flex justify-center p-2" v-else>
        <BaseButtonAt class="text-sm" def @click="showMore">
            <v-icon name="ri-arrow-drop-down-line" class="animate-bounce" /> tampilkan lebih banyak {{
            $route.params.prospect }}
        </BaseButtonAt>
    </div>
</template>
<script setup>
import _ from "lodash";
import LongString from "@/components/atoms/LongString.vue";
import AvatarAt from "@/components/atoms/AvatarAt.vue";
import CardAt from "@/components/atoms/CardAt.vue";
import BadgeAt from "@/components/atoms/BadgeAt.vue";
import DividedAt from "@/components/atoms/DividedAt.vue";
import LabelCont from "@/components/atoms/LabelContAt.vue";
import { ref, computed, onMounted } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
const props = defineProps({
    heading: Object,
    bodyData: Object
});
const bucket = ref([]);
const deletedItem = ref();
const rowData = ref(8);
const showData = computed(() => {
    return _.slice(bucket.value, 0, rowData.value)
}
);
const showMore = (() => {
    rowData.value = rowData.value * 2;
});

onMounted(() => {
    bucket.value = props.bodyData
});

const removeData = (e) => {
    deletedItem.value = bucket.value[e];
    bucket.value.splice(e, 1);
}
</script>