<template>
    <div class="min-h-screen bg-sfcl items-center flex p-4 gap-4 justify-center">
        <div class="bg-primary w-5/6 h-[40vw] overflow-clip shadow-lg rounded-xl">
            <div class="bg-pr flex items-center justify-between p-2">
                <div class="w-4 h-4 aspect-square rounded-xl bg-red-500"></div>
                <span class="text-sm text-white/50">@BCF Component test LAB</span>
            </div>
            <div class="overflow-auto bg-white dark:bg-sfd-drk min-h-full max-h-80">
                <div class="mb-16">
                    <DialogAt />
                </div>
            </div>
        </div>
        <!-- <div class="bg-plate w-1/2 h-96 overflow-clip rounded-xl">
            <div class="bg-plate flex items-center justify-between p-2">
                <div class="w-4 h-4 aspect-square rounded-xl bg-red-500"></div>
                <span class="text-sm text-gray-400">@BCF Component test LAB</span>
            </div>
            <div class="overflow-auto max-h-80">
                <Testcomp2>
                </Testcomp2>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useFocus } from '@vueuse/core'

const target = ref()
const { focused } = useFocus(target, { initialValue: true })

watch(focused, (focused) => {
    if (focused)
        console.log('input element has been focused')
    else console.log('input element has lost focus')
})
// import Testcomp from "@/views/FormJaminan.vue";
import Testcomp from "@/components/organism/SmMenu.vue";
import DialogAt from "@/components/atoms/DialogAt.vue";
// import Testcomp2 from "@/components/molecules/DisclosMenuSusp.vue";
</script>