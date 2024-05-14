<template>
    <HeadContainerAt title="Form Penambahan Karyawan" />
    <ContainerAt>
        <div class="grid grid-cols-2 gap-4">
            <div class="grid border rounded-md p-4 bg-white gap-4">
                <div class="col-span-2 text-sc-600">PERSONAL</div>
                <div class="grid grid-cols-6 col-span-2 gap-x-4">
                    <input-base label="NIK" v-model="employeeModel.code" class="col-span-2" />
                    <input-base label="nama" v-model="employeeModel.code" class="col-span-4" />
                </div>
                <div class="grid grid-cols-4 col-span-2 gap-x-4">
                    <input-base label="tempat lahir" v-model="employeeModel.code" />
                    <input-base label="tanggal lahir" v-model="employeeModel.code" type="date" />
                    <input-base label="jenis kelamin" v-model="employeeModel.code" />
                    <input-base label="golongan darah" v-model="employeeModel.code" />
                </div>

                <input-base label="agama" v-model="employeeModel.code" />
                <input-base label="telepon" v-model="employeeModel.code" />
                <input-base label="handphone" v-model="employeeModel.code" />
                <input-base label="rekening" v-model="employeeModel.code" />
                <input-base label="email" v-model="employeeModel.code" />
                <input-base label="NPWP" v-model="employeeModel.code" />
            </div>
            <div class="grid grid-cols-4 border rounded-md p-4 gap-4 bg-white">
                <div class="col-span-4 text-sc-600">KTP</div>
                <BaseInputSingleImageAt label="KTP" class="row-span-3" />
                <input-base label="No KTP" v-model="employeeModel.code" class="col-span-3" />
                <div class="grid grid-cols-6 col-span-3">
                    <input-base label="alamat ktp" v-model="employeeModel.code" class="col-span-4" />
                    <input-base label="rt" v-model="employeeModel.code" />
                    <input-base label="rw" v-model="employeeModel.code" />
                </div>
                <SelectStateRegion />
                <input-base label="kode pos" v-model="employeeModel.code" />
            </div>
            <div class="grid grid-cols-2 border rounded-md p-4 gap-4 bg-white">
                <div class="col-span-2 text-sc-600">DOMISILI</div>
                <div class="grid grid-cols-6 col-span-2 gap-x-4">
                    <input-base label="alamat domisili" v-model="employeeModel.code" class="col-span-4" />
                    <input-base label="rt" v-model="employeeModel.code" />
                    <input-base label="rw" v-model="employeeModel.code" />
                </div>
                <SelectStateRegion />
                <input-base label="kode pos" v-model="employeeModel.code" />
            </div>
            <div class="grid grid-cols-2 border rounded-md p-4 gap-4 bg-white">
                <div class="col-span-2 text-sc-600">PASANGAN & PENDIDIKAN</div>
                <input-base label="nama ibu kandung" v-model="employeeModel.code" />
                <input-base label="status perkawinan" v-model="employeeModel.code" />
                <input-base label="nama pasangan" v-model="employeeModel.code" />
                <input-base label="jumlah tanggungan" v-model="employeeModel.code" />
                <input-base label="pendidikan" v-model="employeeModel.code" />
                <input-base label="jurusan" v-model="employeeModel.code" />
                <input-base label="IPK" v-model="employeeModel.code" />
            </div>






        </div>
        <div class="flex  gap-4 p-2">
            <BaseButtonAt class="bg-pr !text-white my-4 font-semibold">Simpan</BaseButtonAt>
            <BaseButtonAt def class=" my-4 font-semibold" @click="batal">Batal</BaseButtonAt>
        </div>
    </ContainerAt>


</template>
<script setup>
import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
import InputBase from "@/components/atoms/BaseInputAt.vue";
import BaseInputSingleImageAt from '@/components/atoms/BaseInputSingleImageAt.vue';
import ContainerAt from "@/components/atoms/ContainerAt.vue";
import HeadContainerAt from "@/components/atoms/HeadContainerAt.vue";
import { useAPIget } from "@/support/api.js";
import { useIconLib } from "@/support/icon.js";
import { reactive, ref, toRef } from "vue";

import { useEmployees } from "@/stores/useEmployees";
import SelectStateRegion from "./SelectStateRegion.vue";


const employeesStore = useEmployees();
const employeeModel = toRef(employeesStore.formData);
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