<template>
    <nav-head leading="true" :title="`${$route.name} `" class="capitalize">
    </nav-head>
    <div class="grid md:grid-cols-4">
        <input-base label="key name" v-model="form.menu_name" />
        <input-base label="nama" v-model="form.route" />
        <input-base label="nilai" v-model="form.route" />
        <input-base label="deskripsi" v-model="form.route" />
    </div>
    <div class="p-2 py-4">
        <BaseButtonAt class="btn-pr">simpan</BaseButtonAt>
    </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useIconLib } from "@/support/icon.js";
import NavHead from "@/components/atoms/NavHeaderAt.vue";
import InputBase from "@/components/atoms/BaseInputAt.vue";
import BaseButtonAt from "@/components/atoms/BaseButtonAt.vue";
import SelectBase from "@/components/atoms/BaseSelectBoxAt.vue";
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
</script>