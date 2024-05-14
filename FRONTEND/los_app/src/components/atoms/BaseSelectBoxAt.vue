<template>
    <div class="relative">
        <select :value="modelValue" :id="label" @change="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs"
            class="peer w-full border bg-white text-sm rounded-md placeholder:text-transparent p-[7px]  focus:outline-none"
            :class="error && 'border-pink-500 focus:ring-2 focus:ring-pink-500'">
            <option disabled value="pilih">Pilih {{ label }}</option>
            <option v-for="option in options" :key="option" :value="option">{{ option.toUpperCase()
                }}</option>
        </select>
        <label v-if="label" :for="label"
            class="absolute left-0 ml-2 capitalize -translate-y-3 bg-white px-1 text-sm text-sc-500 duration-100 ease-linear peer-placeholder-shown:translate-y-2 peer-placeholder-shown:text-xl peer-placeholder-shown:text-sc-300 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm peer-focus:text-pr">{{
            label
        }}</label>
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