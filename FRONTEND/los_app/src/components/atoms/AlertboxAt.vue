<template>
    <div class="w-full shake" v-if="closed">
        <div class="flex justify-end">
            <div class="w-full p-1 rounded-xl" :class="typeToast">
                <div class="flex justify-between">
                    <div class="flex gap-3 items-center p-2">
                        <div class="flex justify-center items-center w-10 h-10 aspect-square rounded-full"
                            :class="typeToast">
                            <v-icon :name="props.leading" scale="1.5" :class="typeToast" />
                        </div>
                        <div>
                            <div class="font-semibold text-xl">{{ props.title }}</div>
                            <div class="text-reg text-sm">{{ props.subtitle }}</div>
                        </div>
                    </div>
                    <div class="flex items-center p-4">
                        <div class="sflex justify-center items-center aspect-square w-8 h-8 rounded-full"
                            @click="closeToast">
                            <v-icon name="bi-x" scale="1.5" class="text-reg" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
}

@keyframes shake {

    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}
</style>
<script setup>
import { ref, computed } from 'vue';
const closed = ref(true);
const errClass = "bg-erc text-oerc dark:bg-oerc dark:text-erc";
const warClass = "bg-signal-warning/20";
const okClass = "bg-signal-ready/20";
const offClass = "bg-reg/30";
const props = defineProps({
    title: String,
    subtitle: String,
    leading: String,
    type: String,
});
const typeToast = computed(() => {
    if (props.type == "error") {
        return errClass
    }
    if (props.type == "warning") {
        return warClass
    }
    if (props.type == "success") {
        return okClass
    }
    if (props.type == "off") {
        return offClass
    }
    return okClass
});
const closeToast = (() => {
    closed.value = !closed.value;
});
// onMounted(()=>{
//     if(props.type === "success"){
//         setTimeout(()=>{
//             closed.value = false;
//         },2000)
//     }
// });
</script>