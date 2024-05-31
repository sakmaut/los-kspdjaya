<template>
    <div class="input-wrap w-full inline-block">
        <label v-if="label" :for="label" class="flex text-reg pb-2 ">{{ label }}</label>
        <textarea :value="modelValue" :id="label" @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs"
            class="peer w-full border p-1 ps-2  rounded-md placeholder:text-transparent focus:outline-none"
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