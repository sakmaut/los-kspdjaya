<template>
    <div class="min-h-screen bg-sfcl items-center flex p-4 gap-4 justify-center">
        <div class="bg-primary w-5/6 h-[40vw] overflow-clip shadow-lg rounded-xl">
            <div class="bg-pr flex items-center justify-between p-2">
                <div class="w-4 h-4 aspect-square rounded-xl bg-red-500"></div>
                <span class="text-sm text-white/50">@BCF Component test LAB</span>
            </div>
            <div class="overflow-auto bg-white dark:bg-sfd-drk min-h-full max-h-80">
                <div class="mb-16">
                    <ImagesPlaceAt />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ImagesPlaceAt from "@/components/atoms/ImagesPlaceAt.vue";

</script>