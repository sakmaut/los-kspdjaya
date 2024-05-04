<template>
    <div class="relative flex items-center justify-center left-0 z-50 h-1/6 bottom-0 w-[100vw] p-4">
        <div class="bg-white rounded-xl shadow-lg overflow-clip">
            <div class="text-signal-ready font-bold w-fit p-4 " :class="typeToast">
                <div class="flex gap-2">
                    {{ severity }}
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
const closed = ref(true);
const errClass = "bg-signal-danger/10 text-signal-danger";
const warClass = "bg-signal-warning";
const okClass = "bg-signal-ready";
const offClass = "bg-reg/30";
const regClass = "bg-white"
const props = defineProps({
    title: String,
    subtitle: String,
    leading: String,
    type: String,
    show: Boolean,
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
    return regClass
});
onMounted(() => {
    if (props.type === "success") {
        setTimeout(() => {
            closed.value = false;
        }, 2000)
    }
    if (props.show) {
        closed.value = true;
    }
});
</script>