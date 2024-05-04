<template>
    <nav-head leading="true" :title="`${$route.name} `" class="capitalize">
    </nav-head>
    <div class="grid md:grid-cols-4">
        <input-base label="Icon" />
        <input-base label="Menu" v-model="formMenu.menu_name" />
        <input-base label="Route" v-model="formMenu.route" lead="/" />
        <select-base label="Parent" :options="dataParent" />
        <input-base label="Order" type="number" v-model="formMenu.order" />
        <select-base label="Status" :options="status" />
        <!-- <v-icon v-for="icon in dataicon" :name="icon.icon_name" @click="iconSelect" /> -->
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
const formMenu = reactive({
    "menu_name": "",
    "route": "",
    "parent": "",
    "order": 0,
    "leading": "",
    "status": ""
});
</script>