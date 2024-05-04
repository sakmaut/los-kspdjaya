<template>
    <div
        class="absolute w-full bg-[url('https://t3.ftcdn.net/jpg/05/61/61/84/360_F_561618410_U1V63olrEmDBZD87FK1cMAoV4IparIcC.jpg')] bg-center bg-cover h-full">
        <div class="lg:flex items-center justify-center lg:p-40">
            <div class="flex gap-5 md:shrink-0 lg:justify-left items-center w-full lg:w-1/2 h-[40vh] p-10">
                <img class="h-16"
                    src="https://api.bprcahayafajar.co.id/storage/files/LdG6RK5QvW8DM7wZ5UA2cFZvbs4NtxCHjUqoeI6d.svg"
                    alt="Modern building architecture">
                <div>
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                        myCF
                    </h1>
                    <span class="dark:text-white text-white">New Application by <strong>BPRCF</strong></span>
                </div>

            </div>
            <div class="h-[60vh] lg:h-[50vh] p-10 bg-white backdrop-blur-md sm:rounded-t-3xl lg:rounded-3xl w-full">
                <div class="justify-center py-4">
                    <p class="mt-1 text-sm leading-6 text-gray-600">Enter email address and password to get your account.
                    </p>
                </div>
                <div class="flex bg-slate-100 p-2 rounded-xl items-center">
                    <div class="w-11/12">
                        <label for="first-name" class="block text-xs font-medium leading-6 text-gray-500">Username /
                            Email</label>
                        <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                            placeholder="username"
                            class="bg-transparent w-full text-xl font-medium focus:outline-none focus:border-sky-500 focus:ring-0 focus:ring-sky-500" />
                    </div>
                    <div class="w-fit">
                        <div class="h-[32px] w-[32px] justify-center items-center flex">
                            <unicon name="user" fill="gray"></unicon>

                        </div>
                        <b-icon-arrows-vertical class="text-cyan-500"></b-icon-arrows-vertical>
                    </div>
                </div>
                <div class="flex bg-biru p-2 rounded-xl items-center">
                    <div class="w-11/12">
                        <label for="first-name" class="block text-xs font-medium leading-6 text-gray-500">Username /
                            Email</label>
                        <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                            placeholder="username"
                            class="bg-transparent w-full text-xl font-medium focus:outline-none focus:border-sky-500 focus:ring-0 focus:ring-sky-500" />
                    </div>
                    <div class="w-fit">
                        <div class="h-[32px] w-[32px] justify-center items-center flex">
                            <unicon name="user" fill="gray"></unicon>
                        </div>
                    </div>
                </div>
                <div class="mt-4">
                    <button @click="login"
                        class="py-2 w-full text-white text-hover:bg-blue-600 bg-blue-800 rounded-md flex justify-center font-bold">Masuk</button>
                </div>
                <!-- <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div> -->
                <div class=" gap-2 mt-4 hidden">
                    <input type="checkbox">
                    <p class="mt-2 text-slate-500">Saya setuju dengan syarat dan ketentuan yang berlaku di
                        <a href="" class="text-blue-600 hover:[underline]">
                            PT. BPR CAHAYA FAJAR
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import router from '@/router';
import "../styles/index.css";
export default {
    methods: {
        login() {
            router.push('/home');
        }
    }
}
</script>