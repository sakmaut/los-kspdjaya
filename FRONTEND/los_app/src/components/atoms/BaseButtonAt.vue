<template>
    <button
        class="button-reg flex items-center cursor-pointer p-2 rounded-full text-pr dark:text-pr-500 font-normal text-lg"
        :class="def ? 'hover:bg-sc-100 hover:text-pr hover:dark:bg-sf-drk-300 bg-white' : ''">
        <slot></slot>
    </button>
</template>
<script setup>
defineProps({
    def: Boolean
});
</script>
<style scoped>
.button-reg {
    @apply p-2 text-sm text-sc-300 border rounded-xl
}
</style>