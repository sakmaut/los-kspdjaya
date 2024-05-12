<template>
    <div class="h-full flex flex-col justify-between bg-white">
        <div class="wrap">
            <div class="flex p-2 items-center justify-center gap-2">
                <div class="h-10">
                    <img class="w-10" src="../assets/logo.png" />
                </div>
                <div class="hidden lg:flex font-bold items-center">
                    {{ name_app }}
                </div>
            </div>
            <div class="mt-4 p-2">
                <SideMenu />
            </div>
        </div>
        <div>
            <DropDownAccount />
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useEnvapp } from "@/stores/envapp.js";
import SideMenu from '@/components/organism/SideMenu.vue';
import DarkMode from "@/components/atoms/DarkMode.vue";
import DropDownAccount from "@/components/DropDownAccount.vue";
const toggleSide = ref();
const toggleSideMenu = () => {
    toggleSide.value = !toggleSide.value;
    localStorage.setItem("sideMenu", toggleSide.value);
}
const { name_app, theme_app } = useEnvapp();
const title = ref(import.meta.env.VITE_APP_TITLE);
</script>