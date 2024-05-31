<template>
    <label class="flex items-center p-1 rounded dark:text-pr-500 font-normal text-sm">
        <slot></slot>
    </label>
</template>
<script setup>
defineProps({
    def: Boolean
});
</script>
<style scoped></style>