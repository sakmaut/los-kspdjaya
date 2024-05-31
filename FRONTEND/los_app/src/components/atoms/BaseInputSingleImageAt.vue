<template>
    <Teleport to="body">
        <PopLayer :isImage="popdata" @pop="pop" v-show="expand" />
    </Teleport>
    <div
        class="relative flex flex-col overflow-clip justify-between items-center bg-sf/30 dark:bg-sf-drk-200 border-plate border border-pr border-dashed w-full aspect-square rounded-xl">
        <div class="flex w-full h-full">
            <div v-if="upload.preview" class="w-full h-full">
                <img :src="upload.preview" class="w-full" />
            </div>
            <div v-else class="w-full h-full flex flex-col items-center justify-center">
                <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clip-rule="evenodd" />
                </svg>
                <label :for="label"
                    class="relative cursor-pointer rounded-md bg-pr font-bold dark:bg-pr-500 text-sf p-1 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary">
                    <span>{{ label }}</span>
                    <input :id="label" type="file" class="sr-only" accept="image/*" @change="previewImage"
                        @input="$emit('update:modelValue', $event.target.files[0])">
                </label>
                <p class="text-xs leading-5 text-gray-600">PNG, JPG maks 1MB</p>
            </div>
        </div>
        <div class="absolute w-full h-fit font-semibold items-center text-reg flex justify-between">
            <span class="p-2 text-xs" v-if="upload.preview"> {{ label }}</span>
            <div v-if="upload.preview" class="flex gap-0">
                <BaseButtonAt
                    class="bg-plate/50 w-8 bg-sf-drk/40 hover:bg-red-500 m-2 flex items-center justify-center cursor cursor-pointer text-white aspect-square rounded-full "
                    @click="expandImage(index)">
                    <v-icon name="bi-arrows-angle-expand" scale="1" class="text-reg hover:text-white" />
                </BaseButtonAt>
                <BaseButtonAt
                    class="bg-plate w-8 hover:bg-red-500 bg-sf-drk/40 m-2 flex items-center justify-center cursor cursor-pointer text-white aspect-square rounded-full "
                    @click="resetImage">
                    <v-icon name="bi-x" scale="1.5" class="text-reg hover:text-white" />
                </BaseButtonAt>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import PopLayer from "@/components/atoms/PopLayer.vue";
defineProps({
    label: String,
    modelValue: {
        type: String,
    },
});
const expand = ref(false);
const popdata = ref(false);
const pop = () => expand.value = false;


const emit = defineEmits(["reset-image"]);
const previewImage = (evt) => {
    var input = evt.target;
    if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
            upload.preview = e.target.result;
        }
        upload.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
    }
    console.log(upload);
}
const expandImage = (index) => {
    expand.value = true;
    popdata.value = upload.preview;
}
const resetImage = () => {
    emit("reset-image", upload.preview = null);
}
const upload = reactive({
    preview: null,
    image: null,
});
</script>