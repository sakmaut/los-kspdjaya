<template>
    <div class="absolute top-0 left-0 w-fit bg-primary text-white rounded-md flex justify-between p-2 font-weight-normal text-sm"
        v-if="closed">

        <div class="whitespace-pre-wrap">

            <slot></slot>
        </div>
        <div class="flex"><span class="text-plate">render block | <v-icon name="bi-x-circle"
                    @click="closeButton"></v-icon></span></div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const closed = ref(true);
const closeButton = (() => {
    closed.value = !closed.value;
});
</script>