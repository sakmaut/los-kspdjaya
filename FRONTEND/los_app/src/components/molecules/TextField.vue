<template>
    <div class="group flex items-center text-sm">
        <label for="text" :class="fitlabel && '!w-fit'"
            class="w-40 flex ps-1 capitalize items-end text-sc-600 font-semibold text-nowrap">{{ label
            }}</label>
        <div class="w-full flex items-center">
            <div class="pe-2 text-sc-300">
                <slot name="leading" />
            </div>
            <input type="text" id="text"
                class="w-full p-1 focus:outline-none focus:group:text-pr border rounded-md ps-2 focus:shadow ">

            <div class="ps-2 text-sc-300">
                <slot name="trail" />
            </div>
        </div>
        <span class="flex item-center justify-center ps-2" v-show="error">
            <v-icon name="hi-solid-check" class="text-pr" />
            <v-icon name="hi-exclamation-circle" class="text-er" />
        </span>
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
    fitlabel: Boolean,
    modelValue: {
        type: String,
        default: "",
    },
    left: Boolean,
    options: Object,
});
</script>