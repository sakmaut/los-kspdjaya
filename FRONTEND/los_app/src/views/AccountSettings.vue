<template>
    <div class="p-4 bg-sf  dark:bg-sf-drk-300 dark:border-sf-drk-100 mt-4 rounded-xl" v-for="me in dataMe">
        <div class="divide-y divide-sfd dark:divide-sf-drk-200">
            <div class="py-4">
                <h3 class="text-sm text-gray-900">Informasi Akun</h3>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-sf-drk-600">Data User dan data personal</p>
            </div>
            <div class="py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-16 aspect-square flex-none rounded-full bg-gray-50 bg-center bg-cover bg-[url('https://i.pinimg.com/originals/cc/fa/fa/ccfafa7d3f0085259373767048fa223c.jpg')]">
                        </div>
                        <div>
                            <h3 class="text-sm text-gray-900">Avatar</h3>
                            <p class="mt-1 max-w-2xl text-sm leading-6 text-sf-drk-600">PNG,JPEG under 10Mb</p>
                        </div>
                    </div>
                    <div class="gap-2 flex">
                        <BaseButton
                            class="p-2 border-2 border-sfd dark:border-sf-drk-200 shadow text-sf-drk-600 dark:bg-pr-500 dark:text-sf-drk-100 text-sm rounded-lg">
                            Unggah avatar
                        </BaseButton>
                        <BaseButton
                            class="p-2 bg-sfd dark:bg-sf-drk-600 text-sf-drk-600 dark:text-sf-drk-100 text-sm rounded-lg">
                            Hapus
                        </BaseButton>
                    </div>

                </div>
                <div class="py-4">
                    <head-container title="Informasi User" subtitle="informasi data user" />
                    <div class="flex flex-col md:flex-row gap-4 my-2">
                        <Input label="Username" :value="me.USERNAME" />
                        <Input label="Email" :value="me.EMAIL" />
                        <Input label="Status" :value="me.STATUS" />
                    </div>
                    <head-container title="Informasi Biodata" subtitle="informasi data pribadi" />
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-2">
                        <Input label="NIK" :value="me.NIK" />
                        <Input label="NAMA" :value="me.NAMA" />
                        <Input label="AO CODE" :value="me.AO_CODE" />
                        <Input label="Golongan Darah" :value="me.BLOOD_TYPE" />
                        <Input label="Jenis Kelamin" :value="me.GENDER" />
                    </div>
                    <head-container title="Informasi Pendidikan" subtitle="informasi data pendidikan"
                        class="cols-span-4 md:col-span-4" />
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-2">
                        <Input label="Pendidikan" :value="me.PENDIDIKAN" />
                        <Input label="Universitas" :value="me.UNIVERSITAS" />
                        <Input label="Jurusan" :value="me.JURUSAN" />
                        <Input label="IPK" :value="me.IPK" />
                        <Input label="Nama Ibu Kandung" :value="me.IBU_KANDUNG" />
                        <Input label="Status Karyawan" :value="me.STATUS_KARYAWAN" />
                    </div>
                    <head-container title="Informasi Pasangan" subtitle="informasi data pasangan"
                        class="cols-span-2 md:col-span-4" />
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-2">
                        <Input label="Nama Pasangan" :value="me.NAMA_PASANGAN" />
                        <Input label="Jumlah Tanggungan" :value="me.TANGGUNGAN" />
                        <head-container title="Informasi Identitas" subtitle="informasi data identitas"
                            class="cols-span-2 md:col-span-4" />
                        <Input label="No KTP" :value="me.NO_KTP" />
                        <Input label="Nama" :value="me.NAMA_KTP" />
                        <Input label="Alamat" :value="me.ALAMAT_KTP" />
                        <Input label="Sektor" :value="me.SECTOR_KTP" />
                        <Input label="Distrik" :value="me.DISTRICT_KTP" />
                        <Input label="Sub Distrik" :value="me.SUB_DISTRICT_KTP" />
                        <Input label="Alamat Tinggal" :value="me.ALAMAT_TINGGAL" />
                        <Input label="Sektor Tinggal" :value="me.SECTOR_TINGGAL" />
                        <Input label="Distrik Tinggal" :value="me.DISTRICT_TINGGAL" />
                        <Input label="Sub Distrik Tinggal" :value="me.SUB_DISTRICT_TINGGAL" />
                        <Input label="Tanggal Lahir" :value="me.TGL_LAHIR" />
                        <Input label="Tempat Lahir" :value="me.TEMPAT_LAHIR" />
                        <Input label="Agama" :value="me.AGAMA" />
                        <Input label="No Telepon" :value="me.TELP" />
                        <Input label="No HP" :value="me.HP" />
                        <Input label="No Rekening CF" :value="me.NO_REK_CF" />
                        <Input label="No Rekening Lainnya" :value="me.NO_REK_TF" />
                        <Input label="NO NPWP" :value="me.NPWP" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import BaseButton from "../components/atoms/BaseButtonAt.vue";
import Input from "../components/atoms/ReadOnlyInputAt.vue";
import HeadContainer from "../components/atoms/HeadContainerAt.vue";
import { useAPIget } from "@/support/api";
const token = localStorage.getItem("token");
const dataMe = ref();
const me = useAPIget('me', token).then(([res]) => { dataMe.value = res });
</script>