<template>
    <form @submit.prevent="">
        <PreRender :data="form" />
        <KeepAlive>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 border rounded-md">
                <BaseInputAt label="cust_code_ref" v-model="form.cust_code_ref" />
                <BaseSelectBoxAt label="Tujuan Kredit" :options="optionList.tujuan_kredit"
                    v-model="form.tujuan_kredit" />
                <BaseInputAt max=20 label="plafond" v-model="form.plafond" />
                <BaseSelectBoxAt label="Tenor" :options="optionList.tenor" v-model="form.tenor" />
                <BaseSelectBoxAt label="Kategori" :options="optionList.kategori" v-model="form.kategori" />
            </div>
        </KeepAlive>
        <KeepAlive>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 border rounded-md ">
                <div class="flex gap-4 py-4 col-span-3 h-52">
                    <BaseInputSingleImageAt label="KTP" v-model="attach.file_ktp"
                        @reset-image="attach.file_ktp = null" />
                    <BaseInputSingleImageAt label="KTP Pasangan" v-model="attach.file_ktp_pasangan"
                        @reset-image="attach.file_ktp = null" />
                    <BaseInputSingleImageAt label="KK" v-model="attach.file_kk" @reset-image="attach.file_ktp = null" />
                </div>
                <div class="col-span-3 gap-4 grid grid-cols-3 p-2">
                    <BaseInputAt label="No KTP" v-model="form.no_ktp" @keypress="numberOnly" max=16 />
                    <BaseInputAt label="nama" v-model="form.nama" />
                    <BaseInputAt label="tanggal lahir" type="date" v-model="form.tgl_lahir" />
                    <BaseInputAt label="alamat" v-model="form.alamat" />
                    <BaseInputAt label="rt" v-model="form.rt" />
                    <BaseInputAt label="rw" v-model="form.rw" />
                    <SelectStateRegion v-model:provinsi="form.provinsi" v-model:kota="form.kota"
                        v-model:kecamatan="form.kecamatan" v-model:desa="form.desa" />
                    <BaseInputAt label="No Handphone" max=13 v-model="form.hp" @keypress="numberOnly" />
                    <BaseInputAt label="Nama Ibu Kandung" v-model="form.nama_ibu_kandung" />
                    <BaseInputAt label="dependants" v-model="form.dependants" />
                    <BaseInputAt label="TIN Number" v-model="form.tin_number" />
                    <BaseInputAt label="title" v-model="form.title" />
                </div>
            </div>
        </KeepAlive>
        <KeepAlive>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 border rounded-md">
                <BaseInputAt label="lama bekerja" type="number" v-model="form.lama_bekerja">
                    <template #trail>
                        bulan
                    </template>
                </BaseInputAt>
                <BaseInputAt label="pendapatan" type="number" v-model="form.pendapatan">
                    <template #trail>
                        perbulan
                    </template>
                </BaseInputAt>
                <BaseInputAt label="pendapatan pasangan" type="number" v-model="form.pendapatan_pasangan">
                    <template #trail>
                        perbulan
                    </template>
                </BaseInputAt>
                <BaseInputAt label="pendapatan lain-lain" type="number" v-model="form.pendapatan_lain">
                    <template #trail>
                        perbulan
                    </template>
                </BaseInputAt>
                <BaseInputAt label="pengeluaran" type="number" v-model="form.pengeluaran">
                    <template #trail>
                        perbulan
                    </template>
                </BaseInputAt>
                <BaseInputAt label="referensi pembayaran" v-model="form.ref_pembayaran" />
                <BaseInputAt label="usaha" v-model="form.usaha" />
                <BaseInputAt label="sektor" v-model="form.sektor" />
                <BaseInputAt label="Catatan Survey" v-model="form.catatan_survey" />
            </div>
        </KeepAlive>

        <KeepAlive>
            <div>
                <div class="flex flex-col gap-4 bg-white p-4 border rounded-md">
                    <div class="flex justify-between">Lampiran Jaminan
                        <BaseButtonAt def @click="addJaminan">tambah jaminan</BaseButtonAt>
                    </div>
                    <div v-for="(jaminan, i) in form.jaminan.length">
                        <DisclosureSection>
                            <template #head>
                                <div class="flex w-full ">Jaminan {{ i + 1 }}</div>
                            </template>
                            <template #panel>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="flex flex-col gap-4">
                                        <div class="flex gap-4 col-span-3 h-32">
                                            <BaseInputSingleImageAt label="NO Rangka" v-model="attach.jaminan"
                                                @reset-image="attach.jaminan = null" />
                                            <BaseInputSingleImageAt label="No Mesin" v-model="attach.jaminan"
                                                @reset-image="attach.jaminan = null" />
                                            <BaseInputSingleImageAt label="STNK" v-model="attach.jaminan"
                                                @reset-image="attach.jaminan = null" />
                                        </div>
                                        <div class="flex gap-4 col-span-3 h-28">
                                            <BaseInputSingleImageAt label="depan" v-model="attach.jaminan"
                                                @reset-image="attach.jaminan = null" />
                                            <BaseInputSingleImageAt label="belakang" v-model="attach.jaminan"
                                                @reset-image="attach.jaminan = null" />
                                            <BaseInputSingleImageAt label="kanan" v-model="attach.jaminan"
                                                @reset-image="attach.jaminan = null" />
                                            <BaseInputSingleImageAt label="kiri" v-model="attach.jaminan"
                                                @reset-image="attach.jaminan = null" />
                                        </div>
                                    </div>
                                    <div class="grid bg-white p-4 border rounded-md gap-4">
                                        <div class="pb-4">Detail Jaminan</div>
                                        <div class="grid grid-cols-3 gap-4">
                                            <BaseSelectBoxAt label="Tipe Kendaraan" :options="tujuan"
                                                v-model="form.jaminan" />
                                            <BaseInputAt label="merk" v-model="form.jaminan" />
                                            <BaseInputAt label="tahun" v-model="form.jaminan" />
                                            <BaseInputAt label="warna" v-model="form.jaminan" />
                                            <BaseInputAt label="atas nama" v-model="form.jaminan" />
                                            <BaseInputAt label="nilai jaminan" v-model="form.jaminan" />
                                            <div class="flex gap-2 col-span-3">
                                                <BaseInputAt label="NO polisi" v-model="form.jaminan" />
                                                <BaseInputAt label="NO rangka" v-model="form.jaminan" />
                                                <BaseInputAt label="NO mesin" v-model="form.jaminan" />
                                                <BaseInputAt label="NO BPKB" v-model="form.jaminan" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </DisclosureSection>
                    </div>
                </div>

            </div>
        </KeepAlive>
    </form>
</template>
<script setup>
import { ref } from "vue";

//support
import useForm from "@/support/form";

// component
import BaseInputAt from "@/components/atoms/BaseInputAt.vue";
import BaseSelectBoxAt from "@/components/atoms/BaseSelectBoxAt.vue";
import DisclosureSection from "@/components/atoms/DisclosureSection.vue";
import BaseInputSingleImageAt from "@/components/atoms/BaseInputSingleImageAt.vue";
import SelectStateRegion from "@/components/organism/SelectStateRegion.vue";
import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
import PreRender from "../atoms/PreRender.vue";
// end of component




//---optionlist
const optionList = ref({
    tujuan_kredit: ['INVESTASI'],
    tenor: ['12', '20'],
    kategori: ['biaya kuliah'],
});

//--form handle
const form = ref({
    // pinjaman
    cust_code_ref: '....',
    tujuan_kredit: 'pilih',
    plafond: '....',
    tenor: 'pilih',
    kategori: 'pilih',
    //nasabah
    no_ktp: '....',
    nama: '....',
    tgl_lahir: '....',
    alamat: '....',
    rt: '....',
    rw: '....',
    provinsi: '....',
    kota: '....',
    kecamatan: '....',
    desa: '....',
    hp: '....',
    nama_ibu_kandung: '....',
    dependants: '....',
    tin_number: '....',
    title: '....',
    //pekerjaan
    lama_bekerja: '....',
    pendapatan: '....',
    pendapatan_pasangan: '....',
    pendapatan_lain: '....',
    pengeluaran: '....',
    ref_pembayaran: '....',
    usaha: '....',
    sektor: '....',
    catatan_survey: '....',
    //jaminan
    jaminan: [{
        tipe: '....',
        merk: '....',
        tahun: '....',
        warna: '....',
        atas_nama: '....',
        nilai: '....',
        no_polisi: '....',
        no_rangka: '....',
        no_mesin: '....',
        no_bpkp: '....',
    }],

});
const attach = ref({
    file_ktp: '....',
    file_ktp_pasangan: '....',
    file_kk: '....',
    jaminan: [{
        no_rangka: '....',
        no_mesin: '....',
        stnk: '....',
        depan: '....',
        belakang: '....',
        kanan: '....',
        kiri: '....',
    }]
});

//ext support
const { numberOnly } = useForm();
const addJaminan = () => {
    const { jaminan } = form.value;
    jaminan.push(
        {
            tipe: '',
            merk: '',
            tahun: '',
            warna: '',
            atas_nama: '',
            nilai: '',
            no_polisi: '',
            no_rangka: '',
            no_mesin: '',
            no_bpkp: '',
        }
    );
};

</script>