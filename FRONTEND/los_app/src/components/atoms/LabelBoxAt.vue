<template>
    <div class="input-wrap w-full inline-block bg-sc-50 p-2 rounded-md">
        <label class="flex  text-sm font-medium capitalize text-pr">{{ label }}</label>
        <span class="text-xl disabled:cursor-not-allowed dark:bg-sf-drk-200 dark:border-sf-drk-100
          w-full p-2 ps-0"> {{ val ? val : 'u/n' }}</span>

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