<script setup>
import { ref } from "vue";
import ButtonAt from './ButtonAt.vue';
</script>

<template>
    <Transition name="slide">
        <div
            class="fixed rounded-t-2xl min-h-[30dvh] shadow-[rgba(0,0,0,0.1)_0px_-5px_15px_0px] bottom-0 left-0  w-full bg-white p-4">
            <div class="max-h-[75vh] overflow-auto">
                <slot></slot>
            </div>
            <span @click="closeSheet">tutup</span>
        </div>
    </Transition>
</template>
<style>
.slide-enter-active {
    transition: all 0.3s ease-out;
}

.slide-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(20px);
}
</style>