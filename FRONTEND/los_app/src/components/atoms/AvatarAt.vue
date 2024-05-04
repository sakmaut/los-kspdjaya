<template>
    <div
        class="m-1 items-center text-white text-7xl flex justify-center aspect-square bg-primary rounded-full bg-[url('https://static.promediateknologi.id/crop/101x153:854x554/750x500/webp/photo/2022/10/14/3574785500.png')] bg-center bg-cover"
        :class="size"
        >
        {{ props.content }}
    </div>
</template>
<script setup>
defineOptions({
    name: "AvatarC"
});
const props = defineProps({
    content: String,
    size: String
});
</script>