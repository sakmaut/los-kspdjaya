<template>
    <div>
        <label>
            <input id="two" :value="modelValue" type="checkbox" v-bind="$attrs" />
        </label>
    </div>
</template>

<script setup>
defineProps({
    modelValue: {
        type: Boolean,
    },
});
</script>