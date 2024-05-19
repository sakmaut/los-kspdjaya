<template>
    <HeadContainerAt title="Form Penambahan Karyawan" />
    <ContainerAt>
        <div class="grid grid-cols-2 gap-4">
            <div class="grid border rounded-md p-4 bg-white gap-4">
                <div class="col-span-2 text-sc-600">PERSONAL
                </div>
                <div class="grid grid-cols-6 col-span-2 gap-x-4">
                    <input-base label="NIK" class="col-span-2" />
                    <input-base label="nama" class="col-span-4" v-model="employeeModel.nama" />
                </div>
                <div class="grid grid-cols-4 col-span-2 gap-x-4">
                    <input-base label="tempat lahir" />
                    <input-base label="tanggal lahir" type="date" />
                    <input-base label="jenis kelamin" />
                    <input-base label="golongan darah" />
                </div>

                <input-base label="agama" />
                <input-base label="telepon" />
                <input-base label="handphone" />
                <input-base label="rekening" />
                <input-base label="email" />
                <input-base label="NPWP" />
            </div>
            <div class="grid grid-cols-4 border rounded-md p-4 gap-4 bg-white">
                <div class="col-span-4 text-sc-600">KTP</div>
                <BaseInputSingleImageAt label="KTP" class="row-span-3" />
                <input-base label="No KTP" class="col-span-3" />
                <div class="grid grid-cols-6 col-span-3">
                    <input-base label="alamat ktp" class="col-span-4" />
                    <input-base label="rt" />
                    <input-base label="rw" />
                </div>
                <SelectStateRegion />
                <input-base label="kode pos" />
            </div>
            <div class="grid grid-cols-2 border rounded-md p-4 gap-4 bg-white">
                <div class="col-span-2 text-sc-600">DOMISILI</div>
                <div class="grid grid-cols-6 col-span-2 gap-x-4">
                    <input-base label="alamat domisili" class="col-span-4" />
                    <input-base label="rt" />
                    <input-base label="rw" />
                </div>
                <SelectStateRegion />
                <input-base label="kode pos" />
            </div>
            <div class="grid grid-cols-2 border rounded-md p-4 gap-4 bg-white">
                <div class="col-span-2 text-sc-600">PASANGAN & PENDIDIKAN</div>
                <input-base label="nama ibu kandung" />
                <input-base label="status perkawinan" />
                <input-base label="nama pasangan" />
                <input-base label="jumlah tanggungan" />
                <input-base label="pendidikan" />
                <input-base label="jurusan" />
                <input-base label="IPK" />
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

import { useEmployees } from "@/stores/useEmployees.js";
import SelectStateRegion from "./SelectStateRegion.vue";


const employeesStore = useEmployees();
const employeeModel = toRef(employeesStore.formData);
const status = ['Active', 'Non-Active'];

const batal = () => { router.go(-1); }
</script>