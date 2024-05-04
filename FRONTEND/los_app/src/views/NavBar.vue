<template>
    <nav class="sticky z-50 top-10 flex-no-wrapflex w-full items-center justify-between backdrop-blur-sm ">
        <div class="bg-sf/80 flex w-full dark:bg-transparent items-center justify-between ps-2">
            <div class="flex w-fit hover:bg-sfd dark:hover:bg-sf-drk-200 p-1 rounded-full">
                <div class="hidden w-6 h-6 md:flex p-1 rounded-full justify-center items-center fle cursor-pointer text-pr dark:text-pr-500"
                    @click="$emit('toggle', toggleSideMenu)">
                    <v-icon name="bi-layout-sidebar-inset" class="" />
                </div>
                <div class="flex items-center md:hidden">
                    <div class="justify-center items-center flex">
                        <img class="w-8"
                            src="http://8a73085df21a.sn.mynetname.net:9000/storage/public/assets/nmhregd35XcxiUk6ABtZVwIa46XS9xrdQPM9upTW.svg" />
                    </div>
                    <div class="font-bold items-center">
                        {{ title }}
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <DropDownNotification />
                <DropDownAccount />
            </div>
        </div>
    </nav>
</template>
<script setup>
import { ref } from "vue";
import DropDownAccount from "@/components/DropDownAccount.vue";
import DropDownNotification from "@/components/DropDownNotification.vue";
const toggleSide = ref();
const toggleSideMenu = () => {
    toggleSide.value = !toggleSide.value;
    localStorage.setItem("sideMenu", toggleSide.value);
}
const title = ref(import.meta.env.VITE_APP_TITLE);
import { useAPIget } from "@/support/api";
const token = localStorage.getItem("token");
const dataMe = ref();
const me = useAPIget('me', token).then(([res]) => { dataMe.value = res });
</script>