<template>
    <Transition>
        <div class="fixed top-0 z-50 left-0 w-full" v-if="closed">
            <div class="flex p-4 justify-end">
                <div class="w-full md:w-2/5 lg:w-2/6 bg-white p-1 rounded-xl shadow-md border-2 border-plate">
                    <div class="flex justify-between">
                        <div class="flex gap-3 items-center p-2">
                            <div class="flex justify-center items-center w-10 h-10 aspect-square rounded-full"
                                :class="typeToast">
                                <v-icon :name="props.leading" scale="1" class="text-white" />
                            </div>
                            <div>
                                <div class="font-semibold text-xl text-reg">{{ props.title }}</div>
                                <div class="text-reg text-sm">{{ props.subtitle }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
const closed = ref(true);
const errClass = "bg-signal-danger";
const warClass = "bg-signal-warning";
const okClass = "bg-signal-ready";
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
onMounted(() => {
    setTimeout(() => {
        closed.value = false;
    }, 2000)
});
</script>