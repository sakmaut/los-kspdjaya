<template>
    <div class="py-2">
        <fieldset v-if="outer">
            <legend class=" leading-6 text-gray-900 capitalize">{{ label }}</legend>
            <p class="mt-1 text-sm leading-6 text-gray-600">{{ sublabel }}</p>
        </fieldset>
        <div id="container"
            class="p-2 flex bg-white  dark:bg-sf-drk-200 rounded-xl items-center text-oprc shadow-md border border-sfc dark:border-pr-200"
            :class="[hasError ? errorClass : '']" :hasError="hasError">
            <div class=" text-sf-drk-500 dark:text-pr-300 font-bold">
                <slot name="leading"></slot>
            </div>
            <div class="w-full">
                <label v-if="!outer" :for="label"
                    class="block text-xs font-medium leading-6 text-pr dark:text-pr-300 capitalize">{{
            label }}</label>
                <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="label"
                    :type="type"
                    class="ps-2 bg-transparent w-full text-oprc dark:text-osf-drk text-xl font-medium focus:outline-none focus:border-sky-500 focus:ring-0 focus:ring-sky-500" />
            </div>
            <div class=" text-sf-drk-500 dark:text-pr-200 font-bold">
                <slot name="action"></slot>
            </div>
        </div>
        <span v-if="hasError" class="text-sm" :class="[hasError ? 'text-tertiary' : '']">{{ errorMessage
            }}</span>
    </div>
</template>
<script setup>
import { ref } from "vue";
const errorClass = ref('bg-tertiary-drop text-tertiary');
defineProps({
    label: {
        type: String,
        default: ""
    },
    outer: Boolean,
    sublabel: String,
    type: {
        type: String,
        default: "text"
    },
    modelValue: {
        type: String,
        default: "",
    },
    hasError: Boolean,
    errorMessage: String
});


</script>
