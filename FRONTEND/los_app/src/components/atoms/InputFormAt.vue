<template>
    <div class="">
        <div class="relative">
            <input :value="modelValue" :options :id="label" @input="$emit('update:modelValue', $event.target.value)"
                class="peer w-full border  rounded-md placeholder:text-transparent p-2 focus:outline-none"
                :placeholder="label" v-bind="$attrs" :maxlength="max" />
            <label :for="label" :class="error ? 'text-er' : 'text-sc-500'"
                class="absolute left-0 ml-1 capitalize -translate-y-3 bg-white px-1 text-sm text-sc-500 duration-100 ease-linear peer-placeholder-shown:translate-y-2 peer-placeholder-shown:text-xl peer-placeholder-shown:text-sc-300 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm peer-focus:text-pr">{{
                label }}</label>
        </div>
        <label v-if="error" class="flex text-er pt-2 text-xs">{{ error }}</label>
    </div>
</template>

<script setup>
defineProps({
    lead: {
        type: [String, Boolean],
        default: false,
    },
    label: {
        type: [String, Boolean],
        default: false,
    },
    error: {
        type: [String, Boolean],
        default: false,
    },
    max: Number,
    modelValue: {
        type: String,
        default: "",
    },
    left: Boolean,
    options: Object,
});
</script>
<style scopped>
input:focus::-webkit-input-placeholder {
    color: transparent;
}
</style>