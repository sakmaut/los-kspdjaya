<template>
    <div class="input-wrap w-full p-2 inline-block">
        <label v-if="label" :for="label" class="flex text-reg pb-2 font-medium">{{ label }}</label>
        <cleave :value="modelValue" :options :id="label" @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs"
            class="shadow 
            disabled:text-reg disabled:cursor-not-allowed dark:bg-sf-drk-200 dark:border-sf-drk-100
            file:absolute file:right-0 w-full p-2 border-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
            :class="error ? 'ring-2 ring-er' : 'border-plate'" type="text" />
        <label v-if="error" class="flex text-er pt-2 text-sm">{{ error }}</label>
    </div>
</template>

<script setup>
defineProps({
    options: {
        type: Object,
    },
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