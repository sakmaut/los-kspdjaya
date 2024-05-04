<template>
    <div>
        <div :class="`hidden md:grid grid-head grid-cols-${props.head.length}`">
            <div v-for="(td) in props.head" :key="td">
                {{ td }}
            </div>
        </div>
        <div v-for="td in props.body.data" :key="td.id">
            <div :class="`hidden md:grid grid-body grid-cols-${props.head.length}`">
                {{ td }}
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    head: Object,
    body: Object
});
</script>

<style scoped>
.grid-head {
    @apply bg-sfch text-osc p-2 rounded-t-md
}

.grid-body {
    @apply border-2 block bg-sf md:grid
}
</style>