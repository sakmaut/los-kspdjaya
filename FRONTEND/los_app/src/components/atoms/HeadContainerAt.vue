<template>
    <div class="p-2 m-4 ms-0">
        <h3 class="text-sm text-gray-900">{{ title }}</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-sf-drk-600">{{ subtitle }}</p>
    </div>
</template>
<script setup>
defineProps({
    title: String,
    subtitle: String,
});
</script>