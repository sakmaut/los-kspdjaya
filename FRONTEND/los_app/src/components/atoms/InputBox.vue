<template>
    <div class="input-wrap w-full p-2 inline-block">
        <label v-if="label" :for="label" class="flex text-sc dark:text-sc-300 pb-1 font-normal text-sm">{{
            label.toUpperCase()
        }}</label>
        <input :value="modelValue" :id="label" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs"
            class="
            disabled:text-sc-500 disabled:cursor-not-allowed dark:bg-sf-drk-200 dark:text-sc dark:border-sf-drk-100
            shadow w-full p-2 border text-sm focus:outline-none rounded-md"
            :class="error ? 'ring-2 ring-pink-500' : 'border-plate'" :placeholder="label" />
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