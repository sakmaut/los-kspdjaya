<template>
    <div class="flex">
        <div class="fixed md:relative z-50 bg-white shadow-xl min-h-screen md:w-[20vw] w-1/2 border-r border-r-secondary"
            v-if="sidebarVisible">
            <SideBar @toggle="showHideLeft" />
        </div>
        <div class="w-[100vw] min-h-screen border-r border-secondary">
            <div class="w-full min-h-screen h-[20vw] overflow-auto">
                <div class="sticky z-40 top-0">
                    <NavBar @toggle="showHideLeft" />
                </div>
                <div class="p-2">
                    <RouterView />
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import SideBar from './SideBar.vue';
import NavBar from './NavBar.vue';
import MenuSm from './MenuSmView.vue';
import router from "@/router";
import { ref } from 'vue';
import { useMediaQuery } from "@vueuse/core";
const sidebarVisible = ref(useMediaQuery('(min-width:1024px)'));
if (!localStorage.getItem("token")) {
    router.replace("/");
}
const showHideLeft = () => {
    sidebarVisible.value = !sidebarVisible.value;
}
</script>