<template>
    <div class="rounded-xl" :class="$attrs.class" :isBlur="props.isBlur">
        <div class="text-2xl font-normal justify-between">
            <slot name="header"></slot>
        </div>
        <div>
            <slot name="body"></slot>
        </div>
        <div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    isBlur: {
        type: Boolean,
        default: false
    },
    bordered: {
        type: Boolean,
        default: false
    }
});
</script>