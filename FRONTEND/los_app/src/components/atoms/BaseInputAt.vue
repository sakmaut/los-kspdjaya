<template>
    <div class="">
        <div class="relative">

            <div class="flex">
                <div class="pe-1 text-sc-300 text-xs flex items-center peer-focus:text-pr">
                    <slot name="leading" />
                </div>
                <cleave :value="modelValue" :options :id="label"
                    @input="$emit('update:modelValue', $event.target.value)"
                    class="peer w-full border p-1 rounded-md placeholder:text-transparent focus:outline-none"
                    :placeholder="label" v-bind="$attrs" :maxlength="max" />
                <label :for="label" :class="error ? 'text-er' : 'text-sc-500'"
                    class="absolute left-2 ml-2 capitalize -translate-y-3 bg-white px-1 text-xs text-sc-500 duration-100 ease-linear peer-placeholder-shown:translate-y-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-sc-300 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-xs peer-focus:text-pr">{{
                    label }}</label>
                <div class="ps-1 text-sc-300 text-xs flex items-center peer-focus:text-pr">
                    <slot name="trail" />
                </div>
            </div>


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