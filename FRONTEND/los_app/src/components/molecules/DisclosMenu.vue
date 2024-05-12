<template>
    <div class="flex flex-col gap-1">
        <div v-for="menu in  props.menus " :key="menu.menuid" @click="!open">
            <Disclosure v-slot="{ open }" as="div">
                <DisclosureButton v-if="menu.menuitem.submenu.length == 0" class="rounded-xl w-full flex">
                    <router-link :to="menu.menuitem.routename" class="flex w-full">
                        <MenuAt>
                            <template #leading>
                                <v-icon
                                    :name="open ? menu.menuitem.leading[1] ? menu.menuitem.leading[1] : menu.menuitem.leading[0] : menu.menuitem.leading[0]"
                                    scale="2" class="p-2" />
                            </template>
                            <template #label>
                                {{ typeMenus ? menu.menuitem.labelmenu.toUpperCase() : "" }}
                            </template>
                            <template #action v-if="!menu.menuitem.action">
                                <div class="w-fit min-w-6">
                                    <BadgeAt :val="menu.menuitem.action" variant="danger">
                                    </BadgeAt>
                                </div>
                            </template>
                        </MenuAt>
                    </router-link>
                </DisclosureButton>
                <div v-else :class="open && 'bg-pr-50 flex flex-col w-full rounded-xl'">
                    <DisclosureButton class="rounded-xl w-full flex">
                        <MenuAt>
                            <template #leading>
                                <v-icon
                                    :name="open ? menu.menuitem.leading[1] ? menu.menuitem.leading[1] : menu.menuitem.leading[0] : menu.menuitem.leading[0]"
                                    scale="2" class="p-2" />
                            </template>
                            <template #label>
                                {{ typeMenus ? menu.menuitem.labelmenu.toUpperCase() : "" }}
                            </template>
                            <template #action v-if="!menu.menuitem.action">
                                <v-icon :name="open ? 'hi-solid-chevron-up' : 'hi-solid-chevron-down'" scale="2"
                                    class="p-2" />
                            </template>
                        </MenuAt>
                    </DisclosureButton>
                    <DisclosurePanel class="relative" v-if="menu.menuitem.submenu.length > 0">
                        <div
                            :class="!typeMenus && 'bg-primary/10 backdrop-blur-sm absolute left-12 -top-10 p-2 z-50 shadow-md rounded-md'">
                            <ul class="list-none2 flex flex-col gap-1">
                                <li v-for="sub in  menu.menuitem.submenu " :key="sub.subid"
                                    class="text-sm ps-4 pe-4 dark:text-pr-400 rounded-md cursor-pointer">
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
                </div>
            </Disclosure>
        </div>
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