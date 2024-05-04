<template>
    <div class="input-wrap w-full justify-between p-2" :class="flex && 'flex'">
        <label v-if="label" :for="label" class="flex text-sf-drk-600 text-sm font-medium">{{ label.toUpperCase()
            }}</label>
        {{ val.length > long ? useLongString(val) : val }}
        <slot></slot>
    </div>
</template>

<script setup>
import { useLongString } from "@/support/string_supp.js";
defineProps({
    label: {
        type: [String, Boolean],
        default: false,
    },
    long: {
        type: Number,
        default: 15,
    },
    flex: {
        type: Boolean,
        default: false,
    },
    bordered: {
        type: Boolean,
        default: false
    },
    val: String,
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