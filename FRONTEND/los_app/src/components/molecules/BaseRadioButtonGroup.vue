<template>
    <div class="input-wrap w-full p-2 inline-block">
        <label class="flex text-reg pb-2 font-medium"> {{ label }}</label>
        <div class="grid grid-cols-4 gap-4">
            <BaseRadioButton v-for="option in options" :option="option.code" :key="option" class="w-full">
                <div class="flex w-full items-center justify-between">
                    <div class="block">
                        <div class="w-full text-lg font-semibold">
                            <span class="w-full text-sm ">{{ option.code }}</span>
                            {{ option.codename }}
                        </div>
                        <div class="w-full">
                            {{ option.description }}
                        </div>
                        <div class="w-full text-sm text-reg">{{ option.terms }}</div>
                    </div>
                    <div class="flex min-w-16">
                        <img :src="option.image ? option.image : 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'"
                            class="w-16">
                    </div>
                </div>
            </BaseRadioButton>
        </div>
    </div>
</template>

<script setup>
import BaseRadioButton from "@/components/atoms/BaseRadioButtonAt.vue";

defineProps({
    options: {
        type: Array,
    },
    label: {
        type: String
    }
});
</script>