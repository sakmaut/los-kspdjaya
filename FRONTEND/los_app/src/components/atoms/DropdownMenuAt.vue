<template>
    <Menu as="div">
        <MenuButton v-if="display">more</MenuButton>
        <RouterLink to="apply" v-else>
            <div>more</div>
        </RouterLink>
        <MenuItems v-if="display">
            <MenuItem v-slot="{ active }">
            <a :class='{ "bg-blue-500": active }' href="/account-settings">
                Account settings
            </a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
            <a :class='{ "bg-blue-500": active }' href="/account-settings">
                Documentation
            </a>
            </MenuItem>
            <MenuItem disabled>
            <span class="opacity-75">Invite a friend (coming soon!)</span>
            </MenuItem>
        </MenuItems>
    </Menu>
</template>

<script setup>
import { ref } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { useMediaQuery } from "@vueuse/core";
const display = ref();
const isXL = useMediaQuery('(min-width: 1024px)');
console.log(isXL.value);
if (isXL) {
    display.value = isXL.value
}
</script>