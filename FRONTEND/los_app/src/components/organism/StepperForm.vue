<template>
    <div class="bg-plate m-4 p-4 gap-2 flex justify-around rounded-xl">
        <div class="flex gap-2 text-primary">
            <div class="w-11 rounded-full flex items-center justify-center p-2 aspect-square bg-primary text-white">
                <v-icon name="ri-bank-card-fill"></v-icon>
            </div>
            <div class="inline-block">
                <div class="text-sm"> langkah 1/5</div>
                <div class="font-semibold">Tujuan Kredit</div>
            </div>
        </div>
        <div class="flex items-center">
            <div class="w-5 border-2 border-primary h-0">
            </div>
        </div>
        <div class="flex gap-2 text-reg">
            <div class="w-11 rounded-full flex items-center justify-center p-2 aspect-square bg-reg/20 text-reg">
                <v-icon name="ri-folder-user-line"></v-icon>
            </div>
            <div class="hidden">
                <div class="text-sm"> Step 1/5</div>
                <div class="font-semibold">Biodata Pribadi</div>
            </div>
        </div>
        <div class="flex items-center">
            <div class="w-10 border-2 border-reg h-0">
            </div>
        </div>
        <div class="flex gap-2 text-reg">
            <div class="w-11 rounded-full flex items-center justify-center p-2 aspect-square bg-reg/20 text-reg">
                <v-icon name="ri-community-line"></v-icon>
            </div>
            <div class="hidden">
                <div class="text-sm"> Step 1/5</div>
                <div class="font-semibold">Biodata Pribadi</div>
            </div>
        </div>
        <div class="flex items-center">
            <div class="w-10 border-2 border-reg h-0">
            </div>
        </div>
        <div class="flex gap-2 text-reg">
            <div class="w-11 rounded-full flex items-center justify-center p-2 aspect-square bg-reg/20 text-reg">
                <v-icon name="ri-file-shield-2-line"></v-icon>
            </div>
            <div class="hidden">
                <div class="text-sm"> langkah 1/5</div>
                <div class="font-semibold">Biodata Pribadi</div>
            </div>
        </div>
        <div class="flex items-center">
            <div class="w-10 border-2 border-reg h-0">
            </div>
        </div>
        <div class="flex gap-2 text-reg">
            <div class="w-11 rounded-full flex items-center justify-center p-2 aspect-square bg-reg/20 text-reg">
                <v-icon name="ri-check-line"></v-icon>
            </div>
            <div class="hidden">
                <div class="text-sm"> Step 1/5</div>
                <div class="font-semibold">Biodata Pribadi</div>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-2 p-4 bg-white mt-4 rounded-xl">
        <BaseInputAt label="Tujuan Kredit" />
        <BaseInputAt label="Plafond" />
        <div class="col-span-2">
            <RadiogroupAt />
        </div>
        <div class="col-span-2">
            <BaseInputAt label="Tenor" />
        </div>
        <div class="w-full border-2 col-span-2 my-2 border-plate"></div>
        <BaseInputAt label="Nama" />
        <BaseInputAt label="KTP" />
        <BaseInputAt label="KK" />
        <BaseInputAt label="Tanggal Lahir" type="date" />
        <BaseInputAt label="Alamat" />
        <BaseInputAt label="No Handphone" />
        <div class="w-full border-2 col-span-2 my-2 border-plate"></div>
        <BaseInputAt label="Usaha" />
        <BaseInputAt label="Sector" />
        <BaseInputAt label="Jaminan" />
        <BaseInputFileAt label="Attachment" />
        <div class="w-full border-2 col-span-2 my-2 border-plate"></div>
        <ResumeApply />
    </div>
    <div class="flex w-full px-2 justify-items-end">
        <div class="flex w-32 p-2">
            <ButtonAt label="selanjutnya" class="w-1/4" />
        </div>
    </div>
</template>
<script setup>
import BaseInputAt from '../atoms/BaseInputAt.vue';
import BaseInputFileAt from '../atoms/BaseInputFileAt.vue';
import ButtonAt from '../atoms/ButtonAt.vue';
import RadiogroupAt from '../atoms/RadiogroupAt.vue';
import ResumeApply from '@/views/ResumeApply.vue';
</script>