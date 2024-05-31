<template>
    <div class="absolute justify-center top-0 left-0 bg-black/30 backdrop-blur w-full z-50 h-full">
        <div class="flex w-full h-full items-center justify-center">
            <div class="relative min-w-1/2 bg-sf overflow-clip rounded-lg">
                <img :src="isImage" v-if="isImage" class="max-w-svh max-h-lvh">
                <slot />
                <BaseButtonAt @click="$emit('pop')"
                    class="absolute top-0 right-0 bg-plate/50 w-8 bg-sf-drk/40 hover:bg-red-500 m-2 flex items-center justify-center cursor cursor-pointer aspect-square text-white rounded-full ">
                    <v-icon name="bi-x" scale="1.5" class="text-reg hover:text-white" />
                </BaseButtonAt>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
    isImage: {
        type: [Boolean, String],
    }
});
defineEmits(['pop']);
</script>