<template>
    <div class="p-2 py-10 md:p-10 min-w-full min-h-full flex flex-col justify-between">
        <div>
            <div class="flex justify-between">
                <div>

                    <img class="h-10 md:hidden"
                        src="http://8a73085df21a.sn.mynetname.net:9000/storage/public/assets/nmhregd35XcxiUk6ABtZVwIa46XS9xrdQPM9upTW.svg"
                        alt="logo_company">
                </div>
                <DarkMode />
            </div>
        </div>
        <div>
            <div class="text-oprc dark:text-osf-drk">
                <p class="text-2xl font-semibold">Welcome Back!</p>
                <span class="flex text-sm mb-6 text-pr-600 dark:text-pr-300">Enter your username or email address
                    and
                    password to get your account </span>
            </div>

            <div class="gap-4 flex flex-col">
                <Transition>
                    <div class="w-full" v-if="credential.error">
                        <AlertboxAt leading="bi-exclamation" type="error" title="Ooops !"
                            subtitle="Periksa kembali username dan password anda" />
                    </div>
                </Transition>
                <InputAt label="username" v-model="credential.username" :hasError="credential.error">
                    <template #leading>
                        <v-icon name="ri-mail-line" />
                    </template>
                </InputAt>
                <InputAt label="Password" :type="showPass ? 'text' : 'password'" v-model="credential.password"
                    :hasError="credential.error" v-on:keyup.enter="login">
                    <template #leading>
                        <v-icon name="ri-lock-line" />
                    </template>
                    <template #action>
                        <v-icon :name="showPass ? 'ri-eye-line' : 'ri-eye-close-line'" @click="handlePassword" />
                    </template>
                </InputAt>
                <div class="flex gap-x-2">
                    <div class="w-3/5">
                        <ButtonAt label="MASUK" @click="login" variant="primary"></ButtonAt>
                    </div>
                    <div class="w-2/5">
                        <ButtonAt variant="out-primary" label="Bantuan ?"></ButtonAt>
                    </div>
                </div>
            </div>
        </div>
        <div>
        </div>
    </div>
</template>
<script setup>
import { reactive, onMounted, ref } from "vue";
import axios from "axios";
import ButtonAt from '../atoms/ButtonAt.vue';
import InputAt from '../atoms/InputAt.vue';
import AlertboxAt from "../atoms/AlertboxAt.vue";
import DarkMode from '@/components/atoms/DarkMode.vue';
import router from "@/router";

import InputNumber from 'primevue/inputnumber';

const showPass = ref(false);
const handlePassword = () => {
    showPass.value = !showPass.value;
}
const credential = reactive({
    username: "",
    password: "",
    device_info: "apple",

    error: false,
    response: [],
    errorMessage: [],
})
let apibase = import.meta.env.VITE_APP_API_BASE;
const login = async () => {
    try {
        let login = await axios.post(`${apibase}/auth/login`, credential);
        credential.response = login.data.response.token;
        localStorage.token = credential.response;
        localStorage.sideMenu = "expand";
        router.replace('/beranda');
    } catch (error) {
        console.log(error.response);
        credential.error = true;
        credential.errorMessage = error.response.data.message;
    }
}
onMounted(() => {
    if (localStorage.getItem("token")) {
        router.replace('/beranda');
    }
})
</script>