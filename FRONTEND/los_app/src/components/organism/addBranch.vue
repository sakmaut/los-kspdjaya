<template>
    <HeadContainerAt title="Form Penambahan Cabang" />
    <ContainerAt>
        <div class="grid grid-cols-3 p-4 gap-4 border rounded-md bg-white">
            <input-base label="KODE CABANG" v-model="branchModel.code" />
            <input-base label="nama" v-model="branchModel.name" />
            <input-base label="lokasi" v-model="branchModel.location" />
            <div class="grid grid-cols-6 col-span-2 gap-4">
                <input-base label="alamat" v-model="branchModel.address" class="col-span-4" />
                <input-base label="RT" v-model="branchModel.rt" max="3" />
                <input-base label="RW" v-model="branchModel.rw" max="3" />
            </div>
            <SelectState />
            <input-base label="kode POS" v-model="branchModel.zip_code" max="5" />
            <input-base label="telepon 1" v-model="branchModel.phone_1" />
            <input-base label="telepon 2" v-model="branchModel.phone_2" />
            <input-base label="telepon 3" v-model="branchModel.phone_3" />
            <select-base label="Status" :options="status" v-model="branchModel.status" />
            <div class="col-span-3">
                <TextAreaAt label="deskripsi" v-model="branchModel.descr" />
            </div>
        </div>
        <div class="flex  gap-4 p-2">
            <BaseButtonAt class="bg-pr !text-white my-4 font-semibold">Simpan</BaseButtonAt>
            <BaseButtonAt def class=" my-4 font-semibold" @click="batal">Batal</BaseButtonAt>
        </div>
    </ContainerAt>


</template>
<script setup>
import { ref, reactive, toRef } from "vue";
import { useIconLib } from "@/support/icon.js";
import HeadContainerAt from "@/components/atoms/HeadContainerAt.vue";
import ContainerAt from "@/components/atoms/ContainerAt.vue";
import SelectState from "@/components/organism/SelectStateRegion.vue";
import InputBase from "@/components/atoms/BaseInputAt.vue";
import TextAreaAt from "@/components/atoms/TextAreaAt.vue";
import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
import SelectBase from "@/components/atoms/BaseSelectBoxAt.vue";
import { useBranch } from "@/stores/useBranch.js";

const branchStore = useBranch();
const branchModel = toRef(branchStore.formData);
const dataicon = ref(useIconLib);

const dataParent = ref();
const token = localStorage.getItem("token");
useAPIget("menu", token).then(([res]) => {
    let parentName = [];
    res.forEach(item => {
        parentName.push(item.menu_name);
    });
    parentName.sort();
    dataParent.value = parentName;
});
import { useAPIget } from "@/support/api.js";
const status = ['Active', 'Non-Active'];
const form = reactive({
    "menu_name": "",
    "route": "",
    "parent": "",
    "order": 0,
    "leading": "",
    "status": ""
});

const batal = () => { router.go(-1); }
</script>