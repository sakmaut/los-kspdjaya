<template>
    <div class="flex justify-between items-center mb-4 bg-white">
        <div class="flex items-center">
            <div @click="backPage" v-if="leading"
                class="flex text-pr dark:text-pr-500 hover:bg-sfcls dark:hover:bg-sf-drk-200 rounded-full aspect-square p-1 cursor-pointer">
                <v-icon name="ri-arrow-left-line" scale="1.5"></v-icon>
            </div>
            <div class="flex flex-col">
                <span class="md:text-2xl" :class="leading && 'ps-2'">{{ title }}</span>
                <span class="md:text-sm text-sc-300 " :class="leading && 'ps-2'">{{ subtitle }}</span>
            </div>
        </div>
        <div>
            <slot name="action" />
        </div>
    </div>
</template>
<script setup>
import router from "@/router";
defineProps({
    title: String,
    subtitle: String,
    leading: Boolean,
});
const backPage = () => router.back();
</script>