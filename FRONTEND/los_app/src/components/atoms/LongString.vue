<template>
    <p v-if="val ? val.length > long : false" @click="expand = !expand">{{ !expand ? val.substring(0, long) : val }}
        <span>
            <span v-if="!expand">...</span>
            <span v-else class="text-sm text-pr">-hide-</span>
        </span>
    </p>
    <p v-else>{{ val }}</p>
</template>
<script setup>
import { ref } from "vue";
const expand = ref(false);
defineProps({
    val: String,
    long: {
        type: Number,
        default: 10
    }
});
</script>