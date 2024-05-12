<template>
    <div class="flex justify-between items-center">
        <div class="flex items-center">
            <div @click="backPage" v-if="leading"
                class="flex text-pr dark:text-pr-500 hover:bg-sfcls dark:hover:bg-sf-drk-200 rounded-full aspect-square p-1 cursor-pointer">
                <v-icon name="ri-arrow-left-line" scale="1.5"></v-icon>
            </div>
            <span class="hidden md:flex md:text-2xl md:font-semibold capitalize">{{ title }}</span>
        </div>
        <slot />
        <div>
            <slot name="action" />
        </div>
    </div>
</template>
<script setup>
import router from "@/router";
defineProps({
    title: String,
    leading: Boolean,
});
const backPage = () => router.back();
</script>