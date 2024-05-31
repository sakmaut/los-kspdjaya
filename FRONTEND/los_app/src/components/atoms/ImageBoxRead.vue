<template>
    <div class="input-wrap w-full inline-block bg-sc-50 p-2 rounded-md">
        <label class="flex  text-sm font-medium capitalize text-pr">{{ label }}</label>
        <img src="https://www.bprcahayafajar.co.id/_next/image?url=%2Fbg.jpg&w=1920&q=75" />
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