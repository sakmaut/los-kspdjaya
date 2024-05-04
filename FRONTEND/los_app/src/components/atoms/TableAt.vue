<template>
    <table class="table-auto w-full text-class">
        <thead>
            <tr class="tr-class">
                <th class="th-class" v-for="item in heading[0]" :key="item">{{ item }}
                </th>
                <th class="th-class"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in showData" :key="i" class="row-class">
                <td class="td-class" v-for="itemdata, key, col in heading[0]" :key="itemdata"
                    :class="col == 0 && 'td-lead-class'">{{
                        item[`${key}`] }}
                </td>
                <td class="td-class">
                    <Menu as="div" class="relative inline-block text-left">
                        <MenuButton>
                            <BaseButtonAt>
                                <v-icon name="ri-more-2-line" />
                            </BaseButtonAt>
                        </MenuButton>
                        <transition enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
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
                                <MenuItem v-slot="{ active }" as="div">
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
        <BaseButtonAt class="text-sm" def @click="showMore">
            <v-icon name="ri-arrow-drop-down-line" class="animate-bounce" /> tampilkan lebih banyak {{
                $route.params.prospect }}
        </BaseButtonAt>
    </div>
    <div
        class="sticky bottom-0 text-sc-300 text-sm bg-sc-100/50 backdrop-blur rounded-md dark:bg-sf-drk-300 p-2 flex justify-between">
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
</template>

<script setup>
import _ from "lodash";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import PreRender from "@/components/atoms/PreRender.vue";
import { ref, computed } from "vue";
const rowData = ref(10);
const currentRowData = ref(10);

import BaseButtonAt from "./BaseButtonAt.vue";
import router from "@/router";
const props = defineProps({
    heading: Object,
    bodyData: Object,
    action: Object
});
const showData = computed(() => {
    return _.slice(props.bodyData, 0, rowData.value)
}
);
const showMore = (() => {
    rowData.value = rowData.value * 2;
});

const detailProspect = (key) => {
    router.push(`/task/visit/${key}`);
};
</script>

<style scoped>
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