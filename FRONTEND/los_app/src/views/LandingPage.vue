<template>
    <div class="flex min-w-full min-h-screen items-center justify-center animate-pulse dark:bg-sf-drk-100">
        <img class="h-16 "
            src="http://8a73085df21a.sn.mynetname.net:9000/storage/public/assets/nmhregd35XcxiUk6ABtZVwIa46XS9xrdQPM9upTW.svg"
            alt="logo_company">
    </div>
</template>
<script setup>
import router from "@/router";
import { onMounted } from "vue";
onMounted(() => {
    setTimeout(() => {
        router.replace('/login');
    }, 2000);
});
</script>