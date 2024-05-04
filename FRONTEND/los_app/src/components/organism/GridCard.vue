<template>
    <div class="grid gap-2 md:grid-cols-4">
        <CardAt class="border-2 border-sc-ot shadow overflow-clip" v-for="item in showData">
            <template #header>
                <div class="flex justify-between bg-sc-50 p-2">
                    header
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
                </div>
            </template>
            <template #body>
                <div v-for="itemhead, key in heading[0]">
                    <LabelCont :label="itemhead" :val="item[`${key}`]" bordered />
                </div>
            </template>
        </CardAt>
    </div>
</template>
<script setup>
import _ from "lodash";
import CardAt from "@/components/atoms/CardAt.vue";
import LabelCont from "@/components/atoms/LabelContAt.vue";
import { ref, computed } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
const props = defineProps({
    heading: Object,
    bodyData: Object
});
const rowData = ref(8);
const showData = computed(() => {
    return _.slice(props.bodyData, 0, rowData.value)
}
);
const showMore = (() => {
    rowData.value = rowData.value * 2;
});

</script>