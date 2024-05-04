<template>
    <div class="flex flex-col items-center justify-between">
        <div>
            <div class="flex items-center justify-between">
                <div class="flex">
                    <div class="m-3 pt-4 h-10 justify-center items-center flex">
                        <img class="w-10"
                            src="http://8a73085df21a.sn.mynetname.net:9000/storage/public/assets/nmhregd35XcxiUk6ABtZVwIa46XS9xrdQPM9upTW.svg" />
                    </div>
                    <div class="hidden lg:flex pt-4 font-bold items-center">
                        {{ title }}
                        {{ name_app }}
                        {{ theme_app }}
                    </div>
                </div>
            </div>
            <div class="p-2">
                <SideMenu />
            </div>
        </div>
        <div class="p-2">
            <DarkMode />
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useEnvapp } from "@/stores/envapp.js";
import SideMenu from '@/components/organism/SideMenu.vue';
import DarkMode from "@/components/atoms/DarkMode.vue";
const toggleSide = ref();
const toggleSideMenu = () => {
    toggleSide.value = !toggleSide.value;
    localStorage.setItem("sideMenu", toggleSide.value);
}
const { name_app, theme_app } = useEnvapp();
const title = ref(import.meta.env.VITE_APP_TITLE);
</script>