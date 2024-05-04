<template>
    <button class="flex items-center cursor-pointer p-2 rounded-full text-pr dark:text-pr-500 font-normal text-lg"
        :class="def ? 'hover:bg-sc-100 hover:dark:bg-sf-drk-300' : ''">
        <slot></slot>
    </button>
</template>
<script setup>
defineProps({
    def: Boolean
});
</script>