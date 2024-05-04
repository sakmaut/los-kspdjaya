<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton class="flex items-center  dark:hover:bg-sf-drk-200 p-2 rounded-full">
                <v-icon name="bi-bell" class="text-osf dark:text-osf-drk"></v-icon>
                <p class="text-sm text-tr font-bold">22+</p>
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="absolute px-4 right-0 z-50 mt-2 w-96 origin-top-right divide-y divide-gray-100 rounded-md bg-sf dark:bg-pr-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <StackedList />
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import StackedList from '@/components/StackedList.vue'
</script>