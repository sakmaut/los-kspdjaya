<template>
    <div :class="variantBadge"
        class="flex w-fit h-fit gap-2 px-2 justify-center antialiased font-medium items-center rounded-full text-base">
        {{ props.val }}
        <slot></slot>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const VarWar = "bg-signal-yellowsf text-signal-yellow";
const VarDan = "bg-signal-redsf text-signal-red";
const VarSuc = "bg-signal-greensf text-signal-green";
const VarDis = "bg-pr-100 text-pr-500";
const props = defineProps({
    val: {
        type: String,
        default: "",
    },
    variant: String,
});
const variantBadge = computed(() => {
    if (props.variant === "warning") {
        return VarWar
    }
    if (props.variant === "danger") {
        return VarDan
    }
    if (props.variant === "success") {
        return VarSuc
    }
    if (props.variant === "disabled") {
        return VarDis
    }
    return null
});
</script>
