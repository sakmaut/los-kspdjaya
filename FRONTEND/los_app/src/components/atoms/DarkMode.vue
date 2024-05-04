<template>
    <TabGroup v-if="isLargeScreen">
        <TabList class="flex space-x-1 rounded-xl bg-sf dark:bg-sf-drk-200 p-1">
            {{ selected }}
            <Tab as="template" v-slot="{ selected }">
                <button @click="toggleDark(false)" :class="[
        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none text-nowrap px-2',
        selected
            ? 'bg-sfcls dark:bg-sf-drk-200 text-tr shadow'
            : 'text-osfcl hover:bg-sf dark:hover:bg-sf-drk hover:text-tr',
    ]">
                    <v-icon :name="selected ? 'ri-sun-fill' : 'ri-sun-line'" />
                    Light
                </button>
            </Tab>
            <Tab as="template" v-slot="{ selected }">
                <button @click="toggleDark(true)" :class="[
        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none text-nowrap px-2',
        selected
            ? 'bg-sf dark:bg-sf-drk text-pr-500 shadow'
            : 'text-pr hover:bg-sfcl dark:hover:bg-sfcl-drk hover:text-pr',
    ]">
                    <v-icon :name="selected ? 'ri-moon-fill' : 'ri-moon-line'" /> Dark
                </button>
            </Tab>
        </TabList>
    </TabGroup>
    <div v-else class="flex">
        <button @click="toggleDark()" class="bg-sfcl dark:bg-sf-drk-200 p-2 rounded-full w-10 aspect-square ">
            <Transition mode="out-in" name="slide-up">
                <v-icon :name="selected ? 'ri-moon-fill' : 'ri-sun-line'" v-if="isDark" class="text-tr" />
                <v-icon :name="selected ? 'ri-sun-fill' : 'ri-moon-line'" v-else class="text-pr" />
            </Transition>
        </button>
    </div>
</template>
<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { useMediaQuery } from "@vueuse/core";
import { TabGroup, TabList, Tab } from '@headlessui/vue';
// import { useDarkMode } from "@/stores/useDarkMode";
const isDark = useDark();
const toggleDark = useToggle(isDark);
// const darkMode = useDarkMode();

//media query
const isLargeScreen = useMediaQuery('(min-width:1024px)');
</script>
<style>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.25s ease-out;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(-15px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(15px);
}
</style>