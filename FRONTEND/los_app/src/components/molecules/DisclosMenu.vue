<template>
    <div v-for="menu in  props.menus " :key="menu.menuid" @click="!open">
        {{ theme_app }}
        <Disclosure v-slot="{ open }" as="div">
            <div :class="typeMenus ? 'w-full' : 'w-11 aspect-square'">
                <DisclosureButton v-if="menu.menuitem.submenu.length == 0" class="rounded-xl w-full flex "
                    :class="open && 'bg-pr'">
                    <router-link :to="menu.menuitem.routename" class="flex w-full">
                        <MenuAt :class="[open ? 'text-pr' : 'text-osf']">
                            <template #leading>
                                <v-icon
                                    :name="open ? menu.menuitem.leading[1] ? menu.menuitem.leading[1] : menu.menuitem.leading[0] : menu.menuitem.leading[0]"
                                    scale="2" class="p-2" />
                            </template>

                            <template #label>
                                {{ typeMenus ? menu.menuitem.labelmenu.toUpperCase() : "" }}
                            </template>

                            <template #action v-if="menu.menuitem.action">
                                <div class="w-fit min-w-6">
                                    <BadgeAt :val="menu.menuitem.action" variant="danger">
                                    </BadgeAt>
                                </div>
                            </template>
                        </MenuAt>
                    </router-link>
                </DisclosureButton>
                <DisclosureButton v-else class="rounded-xl w-full flex" :class="open && 'bg-plate-drop'">
                    <MenuAt :class="[open ? 'text-primary' : 'text-reg']">

                        <template #leading>
                            <v-icon
                                :name="open ? menu.menuitem.leading[1] ? menu.menuitem.leading[1] : menu.menuitem.leading[0] : menu.menuitem.leading[0]"
                                scale="2" class="p-2" />
                        </template>

                        <template #label>
                            {{ typeMenus ? menu.menuitem.labelmenu.toUpperCase() : "" }}
                        </template>

                        <template #action v-if="menu.menuitem.action">
                            <div class="w-fit min-w-6">
                                <BadgeAt :val="menu.menuitem.action" variant="danger">
                                </BadgeAt>
                            </div>
                        </template>
                    </MenuAt>
                </DisclosureButton>
            </div>
            <DisclosurePanel class="relative" v-if="menu.menuitem.submenu.length > 0">
                <div
                    :class="!typeMenus && 'bg-primary/10 backdrop-blur-sm absolute left-12 -top-10 p-2 z-50 shadow-md rounded-md'">
                    <ul class="list-none2">
                        <li v-for="sub in  menu.menuitem.submenu " :key="sub.subid"
                            class="text-sm ps-4 text-pr-700 dark:text-pr-400 rounded-md cursor-pointer">
                            <RouterLink :to="menu.menuitem.routename + '' + sub.subroute" v-slot="{ isActive }">
                                <div class="transition ease-in-out flex items-center text-nowrap w-full rounded-lg hover:bg-pr hover:text-sf dark:hover:bg-sf-drk-200"
                                    :class="isActive && 'bg-pr dark:bg-pr-500 text-sf hover:bg-pr-700 !dark:hover:bg-pr-400'">
                                    <div v-if="sub.leading[1]">
                                        <v-icon :name="!isActive ? sub.leading[0] : sub.leading[1]" scale="1.8"
                                            class="p-2" />
                                    </div>
                                    <div v-else>
                                        <v-icon name="ri-apps-2-line" scale="1.8" class="p-2" />
                                    </div>
                                    {{ sub.sublabel.charAt(0).toUpperCase() + sub.sublabel.slice(1) }}
                                </div>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </DisclosurePanel>
        </Disclosure>
    </div>
</template>

<script setup>
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/vue'
import MenuAt from '../atoms/MenuAt.vue';
import BadgeAt from '../atoms/BadgeAt.vue';
import { useEnvapp } from "@/stores/envapp.js";
const { theme_app } = useEnvapp;
const props = defineProps({
    menus: {
        type: Object,
    },
    typeMenus: {
        type: Boolean,
        default: true,
    }
});
</script>