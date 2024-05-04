<template>
    <fieldset class="mb-4 border-2 border-sc-200 text-pr rounded-md">
        <legend class="ms-2 px-2  capitalize">{{ legends }}</legend>
        <p class="mt-1 text-sm leading-6 text-gray-600 capitalize">{{ subs }}</p>
        <div class="p-2 flex gap-2 md:flex md:gap-4">
            <Radio :id="radio" v-for="radio in radios" :val="radio" class="capitalize">{{ radio }}</Radio>
        </div>
    </fieldset>
</template>
<script setup>
import Radio from "@/components/atoms/BaseRadioButtonAt.vue";
defineProps({
    legends: String,
    subs: String,
    id: String,
    val: String,
    radios: Object
});
</script>