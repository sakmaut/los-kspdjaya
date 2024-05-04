<template>
    <ScaffMol class="overflow-hidden min-h-screen bg-sfcl">
        <div class="md:flex bg-sfcl dark:bg-sf-drk-100 w-fit p-0 md:p-2" ref="el" v-if="sidebarVisible">
            <SideBar />
        </div>
        <div class="w-full md:p-4 dark:bg-sf-drk-100">
            <div
                class="bg-sfcls dark:bg-transparent p-0 md:dark:bg-sf-drk-200 w-full h-full overflow-clip overflow-y-auto md:rounded-3xl">
                <div class="flex flex-col ">
                    <div class="h-80">
                        <div class="flex flex-col h-screen md:h-full p-2 justify-between md:justify-start z-10">
                            <div>
                                <div class="sticky x-50 -top-0.5 mb-2 z-50">
                                    <NavBar @toggle="showHideLeft" />
                                </div>
                                <div>
                                    <sm-list-menu :id="$route.query.main" />
                                </div>
                                <router-view v-slot="{ Component }">
                                    <Transition name="slide-fade">
                                        <component :is="Component" />
                                    </Transition>
                                </router-view>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ScaffMol>
</template>

<script setup>
import ScaffMol from "@/components/molecules/ScaffMol.vue";
import SmListMenu from "@/components/organism/SmListMenu.vue";
import SideBar from "./SideBar.vue";
import NavBar from './NavBar.vue';
import { useElementBounding } from '@vueuse/core';
import { reactive, ref } from 'vue';
import router from "@/router";
const el = ref(null);
import { useMediaQuery } from "@vueuse/core";
const sidebarVisible = ref(useMediaQuery('(min-width:1024px)'));
const rect = reactive(useElementBounding(el));
if (!localStorage.getItem("token")) {
    router.replace("/");
}
const showHideLeft = () => {
    sidebarVisible.value = !sidebarVisible.value;
}

</script>
<style>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>