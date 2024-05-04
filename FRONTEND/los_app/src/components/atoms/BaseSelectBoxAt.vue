<template>
    <div class="input-wrap w-full p-2 inline-block">
        <label v-if="label" :for="label" class="flex text-reg pb-2 font-medium">{{ label }}</label>
        <select :value="modelValue" :id="label" @change="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs"
            class="w-full shadow p-2 rounded-lg dark:border-sf-drk-100 bg-white dark:bg-sf-drk-200focus:shadow:lg border-2 text-xl  focus:outline-none"
            :class="error && 'border-pink-500 focus:ring-2 focus:ring-pink-500'">
            <option v-for="option in options" :key="option" :value="option">{{ option.toUpperCase()
                }}</option>
        </select>
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
    options: {
        type: Object,
    },
    modelValue: {
        type: String,
        default: "kosong",
    },
});
</script>