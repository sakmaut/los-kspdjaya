<template>
    <fieldset class="mt-4">
        <legend class="font-semibold leading-6 text-sc-500 capitalize">{{ legends }}</legend>
        <p class="mt-1 text-sm leading-6 text-gray-600 capitalize">{{ subt }}</p>
        <slot />
    </fieldset>
</template>
<script setup>
const props = defineProps({
    legends: String,
    subt: String
});
</script>
Bulan
