<template>
    <div class="input-wrap w-full inline-block">
        <label v-if="label" :for="label" class="flex text-sf-drk-600 text-sm font-medium">{{ label }}</label>
        <input :value="modelValue" :id="label" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs"
            class="
            disabled:text-reg disabled:cursor-not-allowed dark:bg-sf-drk-200 dark:border-sf-drk-100
            file:absolute file:right-0 w-full p-2 border-2 shadow-sm focus:outline-none focus:shadow rounded-md"
            :class="error ? 'ring-2 ring-pink-500' : 'border-plate'" readonly />
        <label v-if="error" class="flex text-pink-500 pt-2 text-sm">{{ error }}</label>
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
    modelValue: {
        type: String,
        default: "",
    },
});
</script>