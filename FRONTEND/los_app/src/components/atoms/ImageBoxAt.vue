<template>
    <div class="input-wrap w-full inline-block">
        <label class="flex text-sf-drk-600 text-sm font-medium">{{ label }}</label>
        <img :src="val" class="w-full max-h-80" />

    </div>
</template>

<script setup>
defineProps({
    label: {
        type: [String, Boolean],
        default: false,
    },
    error: {
        type: [String, Boolean],
        default: false,
    },
    val: {
        type: String,
        default: "",
    },
});
</script>