<template>
    <ScaffMol class="w-full h-svh">
        <div class="w-1/5 md:flex bg-white dark:bg-sf-drk-100 p-0" ref="el" v-if="sidebarVisible">
            <div class="w-full">
                <SideBar />
            </div>
        </div>
        <div class="w-full h-full overflow-auto p-0 bg-sc-50">
            <div class="flex flex-col h-screen md:h-full justify-between md:justify-start z-10">
                <div class="sticky z-50 px-4 top-0 py-4 bg-sc-50 text-sc">
                    <NavHeaderAt :title="$route.name">
                        <div class="flex md:hidden p-2 items-center justify-center gap-2">
                            <div class="h-10">
                                <img class="w-10" src="../assets/logo.png" />
                            </div>
                            <div class="hidden lg:flex font-bold items-center">
                                {{ name_app }}
                            </div>
                        </div>
                        <template #action>
                            <div class="flex gap-2">
                                <div class="flex gap-2">
                                    <BaseButton def>
                                        <v-icon name="hi-bell" />
                                    </BaseButton>
                                </div>
                                <div class="flex gap-2">
                                    <BaseButton def @click="logout">
                                        <div class="flex gap-1">
                                            <v-icon name="hi-logout" class="text-er" /> logout
                                        </div>
                                    </BaseButton>
                                </div>
                            </div>
                        </template>
                    </NavHeaderAt>
                </div>
                <router-view v-slot="{ Component }">
                    <Transition name="slide-fade">
                        <component :is="Component" />
                    </Transition>
                </router-view>
            </div>
        </div>
    </ScaffMol>
</template>

<script setup>
import ScaffMol from "@/components/molecules/ScaffMol.vue";
import SideBar from "./SideBar.vue";
import { useElementBounding } from '@vueuse/core';
import { reactive, ref } from 'vue';
import router from "@/router";
const el = ref(null);
import { useMediaQuery } from "@vueuse/core";
import NavHeaderAt from "@/components/atoms/NavHeaderAt.vue";
import BaseButton from "@/components/atoms/BaseButtonAt.vue";
import { useAPIget } from "@/support/api.js";


const sidebarVisible = ref(useMediaQuery('(min-width:1024px)'));
const rect = reactive(useElementBounding(el));
if (!localStorage.getItem("token")) {
    router.replace("/");
}
const showHideLeft = () => {
    sidebarVisible.value = !sidebarVisible.value;
}
const token = localStorage.getItem("token");

const logout = () => {
    useAPIget('auth/logout', token);
    localStorage.removeItem("token");
    router.push("/login");
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