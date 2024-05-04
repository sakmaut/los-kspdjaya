<template>
    <nav-head leading="true" :title="`${$route.name} `" class="capitalize">
    </nav-head>
    <FieldSet legends="permohonan pembiayaan" ref="pembiayaan">
        <RadioField legends="Pengajuan" :radios="radioAttr.pengajuan"></RadioField>
        <InputAt label="Jumlah yang diajuakan" outer>
            <template #leading>
                Rp.
            </template>
        </InputAt>
        <InputAt label="Jangka Waktu" outer>
            <template #action>
                Bulan
            </template>
        </InputAt>
        <InputAt label="Jenis Kredit" outer />
        <RadioField legends="tujuan penggunaan" :radios="radioAttr.tujuan_penggunaan"></RadioField>
        <RadioField legends="cara pembayaran" :radios="radioAttr.cara_pembayaraan"></RadioField>
        <RadioField legends="jenis angsuran" :radios="radioAttr.jenis_angsuran"></RadioField>
    </FieldSet>
    <FieldSet legends="data pribadi pemohon" ref="cr_personal">
        <RadioField legends="status pemohon" :radios="radioAttr.status_pemohon" />
        <RadioField legends="hubungan dengan BPR" :radios="radioAttr.hubungan_dengan_bpr" />
        <InputAt label="Nama (sesuai KTP)" outer />
        <RadioField legends="jenis kelamin" :radios="radioAttr.jenis_kelamin" />
        <InputAt label="Tempat Lahir" outer />
        <InputAt label="tanggal lahir" type="date" outer />
        <RadioField legends="pendidikan terakhir" :radios="radioAttr.pendidikan_terakhir" />
        <Fieldset legends="Identitas">
            <InputAt label="no KTP" type="text" maxlength="16" outer />
            <InputAt label="tanggal terbit" type="date" outer />
            <InputAt label="berlaku sampai" type="date" outer />
        </Fieldset>
        <RadioField legends="status perkawainan" :radios="radioAttr.status_perkawainan" />
        <InputAt label="Jumlah Tanggungan" type="number" outer />
        <RadioField legends="agama" :radios="radioAttr.agama" />
        <InputAt label="Alamat Domisili" type="text" outer />
        <InputAt label="Kota" type="text" outer />
        <InputAt label="Kode POS" type="number" outer />
        <InputAt label="Lama Tinggal dialamat ini" type="text" outer>
            <template #action>
                bulan
            </template>
        </InputAt>
        <InputAt label="Telepon Rumah" type="number" outer />
        <InputAt label="HP" type="number" outer />
        <RadioField legends="status tempat tinggal" :radios="radioAttr.status_tempat_tinggal" />
        <InputAt label="Nama Gadis Ibu Kandung" type="number" outer />
        <RadioField legends="NPWP" :radios="radioAttr.npwp" />
    </FieldSet>
    <FieldSet legends="data pekerjaan / usaha" ref="cr_business">
        <RadioField legends="Pekerjaan" :radios="radioAttr.pekerjaan" />
        <InputAt label="Nama Perusahaan" type="text" outer />
        <InputAt label="Bidang Usaha" type="text" outer />
        <InputAt label="Jabatan" type="text" outer />
        <InputAt label="Alamat Perusahaan" type="text" outer />
        <InputAt label="Telepon Perusahaan" type="text" outer />
        <InputAt label="Penghasilan Bersin / Bulan" type="number" outer>
            <template #leading>
                Rp.
            </template>
        </InputAt>
        <InputAt label="Lama Bekerja / Usaha" type="number" outer>
            <template #action>
                bulan
            </template>
        </InputAt>
        <InputAt label="Usaha Sampingan" type="text" outer />
        <InputAt label="Penghasilan Bersin / Bulan" type="number" outer>
            <template #leading>
                Rp.
            </template>
        </InputAt>
    </FieldSet>
    <FieldSet legends="data suami / istri" ref="cr_spouse">
        <InputAt label="Nama (sesuai KTP)" outer />
        <RadioField legends="Pendidikan terakhir" :radios="radioAttr.jenis_kelamin" />
        <InputAt label="Tempat Lahir" outer />
        <InputAt label="tanggal lahir" type="date" outer />
        <RadioField legends="Pendidikan terakhir" :radios="radioAttr.pendidikan_terakhir" />
        <Fieldset legends="Identitas">
            <InputAt label="no KTP" type="text" maxlength="16" outer />
            <InputAt label="tanggal terbit" type="date" outer />
            <InputAt label="berlaku sampai" type="date" outer />
        </Fieldset>
        <RadioField legends="pekerjaan" :radios="radioAttr.pekerjaan" />
        <InputAt label="Bidang Usaha" type="text" outer />
        <InputAt label="Lama Bekerja / Usaha" type="number" outer>
            <template #action>
                bulan
            </template>
        </InputAt>
        <InputAt label="Jabatan" type="text" outer />
        <InputAt label="Telepon Perusahaan" type="text" outer />
        <InputAt label="HP" type="text" outer />
        <InputAt label="Penghasilan Bersin / Bulan" type="number" outer>
            <template #leading>
                Rp.
            </template>
        </InputAt>
    </FieldSet>
    <FieldSet legends="data Penjamin" ref="cr_col_gold">
        <InputAt label="Nama (sesuai KTP)" outer />
        <InputAt label="Tempat Lahir" outer />
        <InputAt label="tanggal lahir" type="date" outer />
        <InputAt label="No KTP/SIM" type="text" outer />
        <InputAt label="Alamat Domisili" type="text" outer />
        <InputAt label="Kota" type="text" outer />
        <InputAt label="Kode POS" type="number" outer />
        <InputAt label="Lama Tinggal dialamat ini" type="text" outer>
            <template #action>
                Bulan
            </template>
        </InputAt>
        <InputAt label="Telepon Rumah" type="number" outer />
        <InputAt label="HP" type="number" outer />
        <InputAt label="Hubungan dengan debitur" type="text" outer />
        <InputAt label="Pekerjaan / Usaha" type="text" outer />
        <InputAt label="Penghasilan / Bulan" type="number" outer>
            <template #leading>
                Rp.
            </template>
        </InputAt>
    </FieldSet>
    <FieldSet legends="data jaminan" ref="cr_info">
        <InputAt label="jenis jaminan" outer />
    </FieldSet>
    <FieldSet legends="informasi" ref="cr_info">
        <RadioField legends="PBB atas nama" :radios="radioAttr.pbb_atas_nama" />
        <RadioField legends="rek listrik atas nama" :radios="radioAttr.rek_listrik_atas_nama" />
        <RadioField legends="daya listrik" :radios="radioAttr.daya_listrik" />
        <RadioField legends="rek telepon atas nama" :radios="radioAttr.rek_telepon_atas_nama" />
    </FieldSet>
    <FieldSet legends="data referensi keluarga atau kawan terdekat yang bukan serumah (wajib diisi)" ref="cr_referral">
        <InputAt label="Nama (sesuai KTP)" outer />
        <InputAt label="Alamat Domisili" type="text" outer />
        <InputAt label="Kota" type="text" outer />
        <InputAt label="Kode POS" type="number" outer />
        <InputAt label="Lama Tinggal dialamat ini" type="text" outer />
        <InputAt label="Telepon Rumah" type="number" outer />
        <InputAt label="HP" type="number" outer />
        <InputAt label="Hubungan dengan debitur" type="text" outer />
    </FieldSet>
    <FieldSet legends="Denah Lokasi Alamat Rumah" ref="cr_referral">
        <img class="w-full"
            src="https://imgsrv2.voi.id/HpO09gZIQxpPSpVKdPkkZwaQELHpXUDAgoUw26q-tiA/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy8xNTE4MjMvMjAyMjAzMzEwODA3LW1haW4uSlBH.jpg" />
    </FieldSet>
</template>
<script setup>
import { useStepper, useGeolocation, useOnline, useMediaQuery } from "@vueuse/core";
import { ref, reactive } from "vue";
import NavHead from "@/components/atoms/NavHeaderAt.vue";
import FieldSet from "@/components/atoms/FieldsetAt.vue";
import RadioField from "@/components/molecules/RadioFieldset.vue";
import InputAt from "@/components/atoms/InputAt.vue";
const form = ref();

const radioAttr = reactive({
    pengajuan: ['baru', 'RO'],
    tujuan_penggunaan: ['modal kerja', 'investasi', 'konsumsi'],
    cara_pembayaraan: ['diangsur', 'sekaligus'],
    jenis_angsuran: ['arreart', 'advance'],
    status_pemohon: ['perorangan', 'PT', 'lainnya'],
    hubungan_dengan_bpr: ['pihak terkait', 'pihak tidak terkait'],
    jenis_kelamin: ['laki-laki', 'perempuan'],
    pendidikan_terakhir: ['SD', 'SMP', 'SMA', 'D3', 'S1/S2'],
    status_perkawainan: ['belum menikah', 'menikah', 'janda/duda'],
    agama: ['islam', 'kristen', 'hindu', 'budha', 'lainnya'],
    status_tempat_tinggal: ['pribadi', 'keluarga', 'sewa/kontrak', 'dinas', 'lainnya'],
    npwp: ['ada', 'tidak ada'],
    pekerjaan: ['pegawai negeri', 'pegawai swasta', 'wiraswasta', 'profesional', 'tidak bekerja'],
    pbb_atas_nama: ['sendiri/pasangan', 'orangtua/keluarga', 'orang lain', 'tidak ada'],
    rek_listrik_atas_nama: ['sendiri/pasangan', 'orangtua/keluarga', 'orang lain', 'tidak ada'],
    daya_listrik: ['450 W', '900 W', '1300 W', '2200 W', '>2200 W'],
    rek_telepon_atas_nama: ['sendiri/pasangan', 'orangtua/keluarga', 'orang lain', 'tidak ada'],
});

console.log(radioAttr);
const steps = {
    'application': {
        title: 'permohonan pembiayaan',
        isValid: () => form.tujuan_kredit && form.plafond && form.tenor && form.jenis_produk,
    },
    'personal': {
        title: 'data pribadi pemohon',
        isValid: () => form,
    },
    'business': {
        title: 'data pekerjaan / usaha',
        isValid: () => form,
    },
    'spouse': {
        title: 'data suami / istri',
        isValid: () => form,
    },
    'guarantor': {
        title: 'data suami / istri',
        isValid: () => form,
    },
    'jaminan': {
        title: 'data jaminan',
        isValid: () => form,
    },
    'informasi': {
        title: 'data jaminan',
        isValid: () => form,
    },
    'referal': {
        title: 'referal',
        isValid: () => form,
    },
    'location': {
        title: 'lokasi',
        isValid: () => form,
    },
};
const stepper = useStepper(steps);
</script>
