<template>
    <div class="input-wrap w-full p-2 inline-block">
        <label v-if="label" :for="label" class="flex text-reg pb-2 font-medium">{{ label }}</label>
        <textarea :value="modelValue" :id="label" @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs"
            class="file:absolute file:right-0 w-full p-2 dark:bg-sf-drk-200 border-2 dark:border-sf-drk-100 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
            :class="error && 'border-er focus:ring-2 ring-er focus:ring-er'"></textarea>
        <label v-if="error" class="flex text-er pt-2 text-sm">{{ error }}</label>
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