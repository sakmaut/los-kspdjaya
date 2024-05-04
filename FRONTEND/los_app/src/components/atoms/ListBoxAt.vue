<template>
    <div class="p-2 z-0">
        <label class="flex text-reg pb-2 font-medium"> {{ label }}</label>
        <Listbox v-model="selectedData">
            <div>
                <ListboxButton v-if="!selectedData"
                    class="flex justify-between w-full border-2 cursor-default rounded-lg bg-white dark:bg-sf-drk-200 py-2 pl-3 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span class="block truncate">pilih</span>
                    <span class="pointer-events-none inset-y-0 right-0 flex items-center pr-2">
                        <v-icon name="bi-chevron-expand" />
                    </span>
                </ListboxButton>
                <ListboxButton v-else
                    class="bg-white dark:bg-sf-drk-200 border-2 items-center dark:border-sf-drk-100 flex justify-between w-full cursor-default rounded-lg py-2 pl-3 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span class="block truncate">
                        <div class="flex gap-4">
                            <div class="w-16">
                                <img
                                    :src="selectedData.image ? selectedData.image : 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'">
                            </div>
                            <div>
                                <div class="flex w-full text-lg font-semibold items-start flex-col">
                                    <span class="text-sky-500 text-sm">{{ selectedData.code }}</span>
                                    <span class="text-sm">{{ selectedData.codename }}</span>
                                    <span class="text-xs">{{ selectedData.description }}{{ selectedData.terms }}</span>
                                </div>
                            </div>
                        </div>
                    </span>
                    <span class="pointer-events-none inset-y-0 right-0 flex items-center pr-2">
                        <v-icon name="bi-chevron-expand" />
                    </span>
                </ListboxButton>
            </div>
            <div class="px-2 relative">
                <ListboxOptions class="absolute max-h-80 shadow-md mt-2 left-0 w-full overflow-auto rounded-md bg-sfc/50 dark:bg-sf-drk-200/80 backdrop-blur-lg py-1 text-base ring-1
                    ring-black/5 focus:outline-none border-2 dark:border-sf-drk-100 sm:text-sm">
                    <ListboxOption v-for="listdata in props.lists" :key="listdata.id" :value="listdata"
                        :disabled="listdata.unavailable"
                        class="border-b-2 dark:border-sf-drk-100 hover:bg-sfd hover:dark:bg-sf-drk-200"
                        @click="$emit('custom', listdata)">
                        <div class="flex p-2 gap-4">
                            <div>
                                <img :src="listdata.image ? listdata.image : 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'"
                                    class="w-16">
                            </div>
                            <div class="block">
                                <div class="w-full text-lg font-semibold">
                                    <span class="w-full text-sm text-sky-500">{{ listdata.code }}</span>
                                    {{ listdata.codename }}
                                </div>
                                <div class="w-full">
                                    {{ listdata.description }}
                                </div>
                                <div class="w-full text-sm text-reg">{{ listdata.terms }}</div>
                            </div>
                        </div>
                    </ListboxOption>
                </ListboxOptions>
            </div>
        </Listbox>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'

const props = defineProps({
    modelValue: Object,
    lists: Array,
    label: String,
});
defineEmits(['custom']);
const selectedData = ref(props.lists[0]);
</script>