<template>
    <div class="relative input-wrap w-full p-2 inline-block">
        <Teleport to="body">
            <PopLayer :isImage="popdata" @pop="pop" v-show="expand" />
        </Teleport>
        <label for="cover-photo" class="flex text-reg pb-2 font-medium">{{ label }}</label>
        <div class="rounded-lg border border-dashed border-plate dark:bg-sf-drk-200 dark:border-sf-drk-100">
            <div class="flex justify-center ">
                <div class="text-center p-4">
                    <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                        aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            clip-rule="evenodd" />
                    </svg>
                    <div class="mt-4 flex text-sm justify-center leading-6 text-gray-600">
                        <label for="file-upload"
                            class="relative cursor-pointer rounded-md p-2 dark:bg-pr-500 dark:text-sf font-semibold text-sf bg-pr focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary">
                            <span>Upload files</span>
                            <input id="file-upload" name="file-upload" type="file" accept="image/*" class="sr-only"
                                multiple="multiple" @change="previewMultiImage"
                                @input="$emit('update:modelValue', upload.image_list)">
                        </label>
                        <p class="pl-1"></p>
                    </div>
                    <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
            <template v-if="upload.preview_list.length">
                <div class="grid grid-flow-col-dense gap-2 p-2">
                    <div v-for="item, index in upload.preview_list" :key="index"
                        class="border-2 border-plate rounded-lg overflow-clip">
                        <div class="relative">
                            <img :src="item" />
                            <div
                                class="absolute w-full top-0 h-fit font-semibold items-center text-reg flex justify-end">
                                <BaseButtonAt
                                    class="bg-plate/50 w-8 bg-sf-drk/40 hover:bg-red-500 m-2 flex items-center justify-center cursor cursor-pointer text-white aspect-square rounded-full "
                                    @click="expandImage(index)">
                                    <v-icon name="bi-arrows-angle-expand" scale="1" class="text-reg hover:text-white" />
                                </BaseButtonAt>
                                <BaseButtonAt
                                    class="bg-plate/50 w-8 bg-sf-drk/40 hover:bg-red-500 m-2 flex items-center justify-center cursor cursor-pointer text-white aspect-square rounded-full "
                                    @click="cancelImage(index)">
                                    <v-icon name="bi-x" scale="1.5" class="text-reg hover:text-white" />
                                </BaseButtonAt>
                            </div>
                        </div>
                        <p class="mb-0 p-2 text-sm text-reg">name: {{ upload.image_list[index].name }}</p>
                    </div>
                </div>
            </template>
        </div>
        <!-- <PreRender :data="upload.image_list" label="list image" /> -->
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import PopLayer from "@/components/atoms/PopLayer.vue";
// import PreRender from './PreRender.vue';
defineProps({
    label: String,
    modelValue: {
        type: String,
    },
});

const expand = ref(false);
const popdata = ref(false);

const pop = () => expand.value = false;
// const emit = defineEmits(["reset-image"]);
const previewMultiImage = (evt) => {
    var input = evt.target;
    var count = input.files.length;
    var index = 0;
    if (input.files) {
        while (count--) {
            var reader = new FileReader();
            reader.onload = (e) => {
                upload.preview_list.push(e.target.result);
            }
            upload.image_list.push(input.files[index]);
            reader.readAsDataURL(input.files[index]);
            index++;
        }
    }
    console.log(upload);
}
const cancelImage = (index) => {
    upload.image_list.splice(index, 1);
    upload.preview_list.splice(index, 1);
}
// const resetImage = () => {
//     emit("reset-image", upload.preview_list = []);
// }
const expandImage = (index) => {
    expand.value = true;
    popdata.value = upload.preview_list[index];
}
const upload = reactive({
    preview_list: [],
    image_list: [],
});
</script>