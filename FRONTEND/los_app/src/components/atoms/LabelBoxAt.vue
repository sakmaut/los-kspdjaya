<template>
    <div class="input-wrap w-full inline-block">
        <label class="flex text-sf-drk-600 text-sm font-medium">{{ label }}</label>
        <span class="text-xl disabled:cursor-not-allowed dark:bg-sf-drk-200 dark:border-sf-drk-100
          w-full p-2 ps-0"> {{ val }}</span>

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