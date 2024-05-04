<template>
    <div class="flex font-bold w-full p-2 py-3 justify-center cursor-pointer
    " :class="styles" @click="clickHandler">
        <Transition mode="out-in">
            <LoaderComponent v-if="loader" />
            <span v-else> {{ props.label }} </span>
        </Transition>

        <slot></slot>
    </div>
</template>
<script setup>
import { ref } from "vue";
import LoaderComponent from "./LoaderComponent.vue";
const styles = ref("");
const loader = ref(false);
const props = defineProps({
    variant: String,
    label: {
        type: String,
        default: ""
    }
});
const type = props.variant;
switch (type) {
    case 'primary':
        styles.value = "bg-pr rounded-xl text-opr dark:bg-pr-500"
        break;
    case 'out-primary':
        styles.value = "transition delay-150 text-pr hover:bg-sfcl rounded-xl"
        break;
    case 'tertiary':
        styles.value = "bg-tertiary text-white ring-2 ring-tertiary/50 rounded-xl"
        break;
    case 'out-tertiary':
        styles.value = "bg-white text-tertiary hover:bg-tertiary/20 rounded-xl"
        break;
    default:
        styles.value = "bg-primary rounded-xl text-plate hover:ring-2"
        break;
}
const clickHandler = () => {
    loader.value = true
    setTimeout(() => {
        loader.value = false
    }, 2000);
};
</script>
<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    transition: opacity 0.3s ease;
    opacity: 0;
}
</style>