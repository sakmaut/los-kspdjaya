
<template>
    <div class="left-0 top-0 backdrop-blur-md fixed min-h-screen bg-white/30 w-full">
        <div class="flex w-full min-h-screen items-center justify-center">

            <CardAt :bordered="false" class="bg-white">
                <template #header>
                    <div class="flex py-2 items-center gap-2">
                        <div
                            class="w-8 rounded-full flex items-center justify-center  aspect-square bg-tertiary text-white">
                            <v-icon name="ri-alarm-warning-line"></v-icon>
                        </div>
                        Error
                    </div>
                </template>
                <template #body>
                    <div class=" text-reg border-t-2 border-plate">Anda tidak terhubung ke jaringan</div>
                </template>
            </CardAt>
        </div>
    </div>
</template>
<script setup>
import CardAt from './CardAt.vue';
</script>