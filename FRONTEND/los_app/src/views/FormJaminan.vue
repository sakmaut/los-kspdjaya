<template>
    <div class="grid grid-col-1">
        <div class="grid grid-cols-2 p-4 bg-white mt-4 rounded-xl">
            <BaseInputAt label="Usaha" />
            <BaseInputAt label="Sector" />
            <div class="bg-plate/20 border-plate border-2 border-dashed p-2 rounded col-span-2 m-2">
                <div class="flex justify-between">
                    <label class="flex text-reg pb-2 font-medium">Jaminan</label>
                    <BaseButtonAt class="flex bg-none gap-2 items-center text-primary w-fit h-fit p-2 "
                        @click="addJaminan()" v-if="form.jaminan.length <= 10">
                        <v-icon name="ri-add-circle-line" scale="1.2" />jaminan
                    </BaseButtonAt>
                </div>
                <div class="flex items-end" v-for="(jaminan, i) in form.jaminan" :key="i">
                    <BaseSelectBoxAt label="Jenis" :options="typeJaminan" v-model="jaminan.type" />
                    <BaseInputAt label="Nilai" type="number" v-model="jaminan.collateral_value" />
                    <BaseInputAt label="Deskripsi" v-model="jaminan.description" />
                    <div class="flex gap-2">
                        <BaseButtonAt class="mb-2 bg-plate/70 text-primary p-2 outline-1">
                            <div class="flex">
                                <v-icon name="ri-attachment-2" scale="1.2" />
                                berkas
                            </div>
                        </BaseButtonAt>
                        <BaseButtonAt class="mb-2 p-2" @click="removeJaminan(i)">
                            <v-icon name="ri-delete-back-2-line" scale="1.2"
                                class="text-reg hover:text-signal-danger" />
                        </BaseButtonAt>
                    </div>

                </div>
                <div class="flex items-end" v-if="form.jaminan == 0">
                    <BaseInputSus class="flex-1" />
                    <BaseInputSus class="flex-1" />
                    <BaseInputSus class="flex-1" />
                    <BaseButtonSus class="m-2" />
                </div>
            </div>
            <div class="bg-plate/20 border-plate border-2 border-dashed p-2 rounded col-span-2 m-2">
                <div class="flex justify-between">
                    <label class="flex text-reg pb-2 font-medium">Penjamin</label>
                    <BaseButtonAt class="flex bg-none gap-2 items-center text-primary w-fit h-fit p-2 "
                        @click="addPenjamin()" v-if="form.penjamin.length <= 10">
                        <v-icon name="ri-add-circle-line" scale="1.2" />penjamin
                    </BaseButtonAt>
                </div>
                <div class="flex items-end" v-for="(penjamin, i) in form.penjamin" :key="i">
                    <BaseInputAt label="Nama" v-model="penjamin.nama" />
                    <BaseInputAt label="KTP" v-model="penjamin.ktp" />
                    <BaseInputAt label="Tanggal Lahir" type="date" v-model="penjamin.tgl_lahir" />
                    <BaseInputAt label="Pekerjaan" v-model="penjamin.pekerjaan" />
                    <BaseSelectBoxAt label="Hubungan" :options="hubungan" v-model="penjamin.status" />
                    <BaseButtonAt class="mb-2 p-2" @click="removePenjamin(i)">
                        <v-icon name="ri-delete-back-2-line" scale="1.2" class="text-reg hover:text-signal-danger" />
                    </BaseButtonAt>
                </div>
                <div class="flex items-end" v-if="form.penjamin == 0">
                    <BaseInputSus class="flex-1" />
                    <BaseInputSus class="flex-1" />
                    <BaseInputSus class="flex-1" />
                    <BaseInputSus class="flex-1" />
                    <BaseInputSus class="flex-1" />
                    <BaseButtonSus class="m-2" />
                </div>
            </div>
            <div class="bg-plate/20 border-plate border-2 border-dashed p-2 rounded col-span-2 m-2">
                <div class="flex justify-between">
                    <label class="flex text-reg pb-2 font-medium">Pasangan</label>
                    <BaseButtonAt class="flex bg-none gap-2 items-center text-primary w-fit h-fit p-2 "
                        @click="addPasangan()" v-if="form.penjamin.length <= 10">
                        <v-icon name="ri-add-circle-line" scale="1.2" />pasangan
                    </BaseButtonAt>
                </div>
                <div class="flex items-end" v-for="(pasangan, i) in form.pasangan" :key="i">
                    <BaseInputAt label="Nama" v-model="pasangan.nama" />
                    <BaseInputAt label="KTP" v-model="pasangan.ktp" />
                    <BaseInputAt label="Tanggal Lahir" type="date" v-model="pasangan.tgl_lahir" />
                    <BaseInputAt label="Pekerjaan" v-model="pasangan.pekerjaan" />
                    <BaseInputAt label="Status" v-model="pasangan.pekerjaan" />
                    <BaseButtonAt class="mb-2 p-2" @click="removePasangan(i)">
                        <v-icon name="ri-delete-back-2-line" scale="1.2" class="text-reg hover:text-signal-danger" />
                    </BaseButtonAt>
                </div>
                <div class="flex items-end" v-if="form.pasangan == 0">
                    <BaseInputSus class="flex-1" />
                    <BaseInputSus class="flex-1" />
                    <BaseInputSus class="flex-1" />
                    <BaseInputSus class="flex-1" />
                    <BaseInputSus class="flex-1" />
                    <BaseButtonSus class="m-2" />
                </div>
            </div>
            <div class="p-2 col-span-2">
                <div class="w-full p-4 rounded-xl bg-signal-warning/10">
                    <div class="flex justify-between text-primary
                        font-semibold">
                        <div>Ajukan slik</div>
                        <div>
                            <SwitchAt v-model="reqSlik" />
                        </div>
                    </div>
                    <Transition>
                        <div v-if="form.slik"
                            class="bg-white mt-2 border-2 border-dashed border-signal-warning p-2 rounded col-span-2 ">
                            <div class="grid grid-flow-col p-2 gap-4"
                                :class="form.pasangan != 0 ? 'grid-cols-3' : 'grid-cols-2'">
                                <BaseInputSingleImageAt label="KTP" v-model="slikAttach.file_ktp"
                                    @reset-image="slikAttach.file_ktp = null" />
                                <BaseInputSingleImageAt label="Kartu Keluarga" v-model="slikAttach.file_kk"
                                    @reset-image="slikAttach.file_kk = null" />
                                <BaseInputSingleImageAt v-if="form.pasangan != 0" label="Buku Nikah"
                                    v-model="slikAttach.file_buknik" @reset-image="slikAttach.file_buknik = null" />
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
            <BaseInputMultiImageAt label="Lampiran Kunjungan" class="col-span-2" v-model="form.attachment">
            </BaseInputMultiImageAt>
            <div class="p-2 col-span-2">
                <div class="p-2 bg-plate/20 rounded-xl ">
                    <div class="flex w-full p-4 justify-between items-center text-primary font-semibold">
                        <div class="flex items-center gap-2">
                            <div
                                class="w-11 rounded-full flex items-center justify-center p-2 aspect-square bg-primary text-white">
                                <v-icon name="ri-map-pin-line"></v-icon>
                            </div>
                            <div>Buat Titik Lokasi</div>
                        </div>
                        <div>
                            <SwitchAt v-model="reqLocation" />
                        </div>
                    </div>
                    <div class="grid grid-cols-3 text-reg" v-if="!reqLocation">
                        <div>
                            <BaseInputSus />
                        </div>
                        <div>
                            <BaseInputSus />
                        </div>
                        <div>
                            <BaseInputSus />
                        </div>
                    </div>
                    <div v-else class="grid grid-cols-3">
                        <BaseInputAt label="Longitude" disabled />
                        <BaseInputAt label="Latitude" disabled />
                        <BaseInputAt label="Accuracy" disabled />
                    </div>
                </div>
            </div>
        </div>
        <PreRender :data="form" label="form"></PreRender>
        <pre>
        long : {{ location.coords.value.longitude }}
        lat : {{ location.coords.value.latitude }}
        accuracy : {{ location.coords.value.accuracy }}
    </pre>
        <PreRender :data="slikAttach" label="slik attach"></PreRender>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import SwitchAt from '@/components/atoms/SwitchAt.vue';
import BaseInputAt from '@/components/atoms/BaseInputAt.vue';
import BaseButtonAt from '@/components/atoms/BaseButtonAt.vue';
import BaseButtonSus from '@/components/atoms/BaseButtonSus.vue';
import BaseInputSingleImageAt from '@/components/atoms/BaseInputSingleImageAt.vue';
import BaseInputSus from "@/components/atoms/BaseInputSus.vue";
import PreRender from "@/components/atoms/PreRender.vue";
import BaseSelectBoxAt from "@/components/atoms/BaseSelectBoxAt.vue";
import BaseInputMultiImageAt from "@/components/atoms/BaseInputMultiImageAt.vue";
import { useGeolocation } from "@vueuse/core";

const location = useGeolocation();
const typeJaminan = ['bpkb', 'sertifikat'];
const hubungan = ['orang tua', 'saudara'];

const reqSlik = ref(false);
const reqLocation = ref(false);
const slik = computed(() => {
    return reqSlik.value ? 1 : 0
});
const form = reactive({
    slik: slik,
    location: reqLocation,
    longitude: location.coords.longitude,
    latitude: location.coords.latitude,
    accuracy: location.coords.longitude,
    jaminan: [],
    penjamin: [],
    pasangan: [],
    attachment: [],
});

const slikAttach = reactive({
    file_ktp: null,
    file_kk: null,
    file_buknik: null,
});
function addJaminan(index) {
    form.jaminan.push(
        {
            type: '',
            collateral_value: '',
            description: ''
        },
    );
    index
}
function addPenjamin(index) {
    form.penjamin.push(
        {
            nama: '',
            ktp: '',
            tgl_lahir: '',
            pekerjaan: '',
            status: '',
        },
    );
    index
}
function addPasangan(index) {
    form.pasangan.push(
        {
            nama: '',
            ktp: '',
            tgl_lahir: '',
            pekerjaan: '',
            status: '',
        },
    );
    index
}

function removeJaminan(index) {
    form.jaminan.splice(index, 1);
    index
}
function removePenjamin(index) {
    form.penjamin.splice(index, 1);
    index
}
function removePasangan(index) {
    form.pasangan.splice(index, 1);
    index
}
</script>