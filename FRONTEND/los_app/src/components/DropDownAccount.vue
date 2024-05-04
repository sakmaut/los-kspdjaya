<template>
    <Menu as="div" class="z-50 inline-block text-left">
        <div v-for="me in dataMe">
            <MenuButton class="p-2 rounded-full ">
                <div class="flex gap-x-3">
                    <div class="hidden md:block">
                        <p class="text-xs">{{ me.NAMA }}</p>
                        <p class="text-xs text-gray-500">@{{ me.USERNAME }}</p>
                    </div>
                    <div
                        class="w-8 h-8 aspect-square ring-2 ring-pr dark:ring-pr-500 flex-none rounded-full bg-gray-50 bg-center bg-cover bg-[url('https://i.pinimg.com/originals/cc/fa/fa/ccfafa7d3f0085259373767048fa223c.jpg')]">
                    </div>
                </div>
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                    <RouterLink to="/pengaturan/akun">
                        <MenuItem v-slot="{ active }">
                        <a
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Akun</a>
                        </MenuItem>
                    </RouterLink>
                    <RouterLink to="login">
                        <MenuItem v-slot="{ active }">
                        <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Ganti
                            Password</a>
                        </MenuItem>
                    </RouterLink>
                    <RouterLink to="/pengaturan/umum">
                        <MenuItem v-slot="{ active }">
                        <a
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Pengaturan</a>
                        </MenuItem>
                    </RouterLink>
                </div>
                <div class="py-1">
                    <MenuItem v-slot="{ active }">
                    <span :class="[active ? 'bg-gray-100 text-gray-900' : 'text-red-700', 'block px-4 py-2 text-sm']"
                        @click="logout">Log
                        Out</span>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { ref } from "vue";
import router from '@/router';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
const token = localStorage.getItem("token");
const logout = () => {
    useAPIget('auth/logout', token);
    localStorage.removeItem("token");
    router.push("/login");
}
import { useAPIget } from "@/support/api";
const dataMe = ref();
useAPIget('me', token).then(([res]) => { dataMe.value = res });
</script>