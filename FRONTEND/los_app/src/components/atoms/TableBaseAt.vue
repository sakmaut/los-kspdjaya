<template>
    <div class="md:px-2">
        <nav-head leading="true" :title="`${$route.name} `" class="capitalize" v-if="navHead">
            <template #action>
                <div class="flex">
                    <Transition>
                        <input type="text" ref="searchFocus"
                            class="focus:border-b-2 !py-0 ps-2 focus:outline-none dark:bg-sf-drk-300"
                            v-model="searchInput" placeholder="cari" v-if="findBox" />
                    </Transition>
                    <BaseButtonAt def @click="find" :class="findBox && 'text-red-500'" v-if="action.search">
                        <v-icon :name="!findBox ? 'ri-search-line' : 'ri-close-circle-line'" />
                        <span class="hidden md:flex">cari </span>
                        <span
                            class="text-[10px] bg-sfd dark:bg-sf-drk-300 h-4 flex items-center font-semibold p-1 m-1 rounded-sm">Esc</span>
                    </BaseButtonAt>
                    <RouterLink :to="`add-${$route.name}`">
                        <BaseButtonAt def v-if="action.add">
                            <v-icon name="ri-add-circle-line" />
                            <span class="hidden md:flex">tambah</span>
                        </BaseButtonAt>
                    </RouterLink>
                </div>
            </template>
        </nav-head>
        <table class="table-auto w-full text-class text-sm">
            <thead>
                <tr class="tr-class">
                    <th class="th-class">No</th>
                    <th class="th-class" v-for="item in heading[0]" :key="item">{{ item.toUpperCase() }}
                    </th>
                    <th class="th-class" v-if="action"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in showData" :key="i" class="row-class">
                    <td class="td-class">{{ i + 1 }}</td>
                    <td class="td-class" v-for="itemdata, key, col in heading[0]" :key="itemdata"
                        :class="col == 0 && 'td-lead-class'">
                        <v-icon v-if="key === 'leading'" :name="`${icon}`" :ref="leading = item['leading']" />
                        <long-string :val="item[`${key}`]" long="20" v-else />
                    </td>
                    <td class="td-class" align="right" v-if="action">
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
                                    <MenuItem v-slot="{ active }" as="div" v-if="action.update">
                                    <a class="flex gap-2"
                                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'cursor-pointer block px-2 py-2 text-sm']">
                                        <v-icon name="ri-edit-2-line" />
                                        Edit</a>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }" as="div" @click="removeData(i)" v-if="action.delete">
                                    <a class="flex gap-2"
                                        :class="[active ? 'bg-er/10 text-er' : 'text-gray-700', 'cursor-pointer block px-2 py-2 text-sm']">
                                        <v-icon name="ri-delete-bin-2-line" />
                                        Hapus</a>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }" as="div" @click="detailProspect(item.id)"
                                        v-if="action.detail">
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
        <div class="text-sm justify-center flex p-2 text-sf-drk-600" v-if="showData.length == 0">
            data tidak ditemukan
        </div>
        <div class="text-sm justify-center flex p-2 text-sf-drk-600" v-if="showData.length == bodyData.length">
            data ditampilkan semua
        </div>
        <div class="text-class text-sm flex justify-center p-2"
            v-if="showData.length != 0 && showData.length < bodyData.length && !search">
            <BaseButtonAt class="text-sm hover:bg-sc-100 p-2 rounded-xl cursor-pointer dark:hover:bg-sf-drk-300" def
                @click="showMore">
                <v-icon name="ri-arrow-drop-down-line" class="animate-bounce" /> tampilkan lebih banyak {{
            $route.name }}
            </BaseButtonAt>
        </div>
        <div
            class="sticky bottom-0 text-pr dark:text-sf-drk-600 text-sm bg-sfd backdrop-blur rounded-md dark:bg-sf-drk-300 p-2 flex justify-between">
            <div>
                <v-icon name="ri-list-check" /> {{ showData.length }} data
            </div>
            <div>total data :{{ bucket.length }} baris</div>
            <div><v-icon name="ri-filter-2-line" /> <select v-model="rowData" class="bg-sf dark:bg-sf-drk-400">
                    <option :value="bodyData.length">no limit</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                </select> data</div>
        </div>
    </div>
</template>
<script setup>
import LongString from "@/components/atoms/LongString.vue";
import _ from "lodash";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
import NavHead from "@/components/atoms/NavHeaderAt.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { computed, ref, onMounted } from "vue";
const leading = ref();
const icon = computed(() => {
    let text = `${leading.value}`;
    const mainLeading = text.split(',');
    return mainLeading[0]
});
const props = defineProps({
    heading: Object,
    bodyData: Object,
    action: Object,
    navHead: Boolean,
});
import { useFocus, useMagicKeys, whenever } from '@vueuse/core'
const findBox = ref(false);
const searchInput = ref();
const find = (() => {
    findBox.value = !findBox.value;
});
const keys = useMagicKeys();
whenever(keys.escape, () => {
    findBox.value = !findBox.value;
    search;
});
const searchFocus = ref()
const { focused, search } = useFocus(searchFocus, { initialValue: true })
const bucket = ref([]);
const rowData = ref(10);
const deletedItem = ref();
const showData = computed(() => {
    let data = props.bodyData;
    let sInput = searchInput.value;
    const includesValue = (word, obj) => _.some(obj, (value) => _.includes(value, word));
    const words = _.words(sInput);
    if (sInput) {
        return data.filter((obj) =>
            words.every((word) =>
                includesValue(word, obj)
            )
        );
    }
    return _.slice(bucket.value, 0, rowData.value)
}
);
onMounted(() => {
    bucket.value = props.bodyData
});
const showMore = (() => {
    rowData.value = rowData.value * 2;
});
const $toast = useToast();
const removeData = (e) => {
    const deleted = ref();
    deletedItem.value = bucket.value[e];
    console.log(deletedItem.value);
    bucket.value.splice(e, 1);
    const undoRemove = () => {
        deleted.value = 1;
        bucket.value.push(deletedItem.value);
        $toast.open({
            message: 'data batal dihapus',
            type: 'success',
            duration: 2000,
        });
    }

    $toast.open({
        message: 'data dihapus, klik untuk <b>batal</b>',
        type: 'success',
        duration: 3000,
        onClick: undoRemove,
        onDismiss: () => { console.log('toast di hapus') }
    });
}
</script>