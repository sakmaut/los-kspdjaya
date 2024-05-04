<template>
    <div class="main-screen">
        <div class="sidebar">
            <div class="wrap">
                <div class="brand p-4 gap-2">
                    <img src="../../assets/logo.png" class="w-12" />
                    KSPDJAYA
                </div>
                <div class="menu">
                    <div class="menu-item">
                        <div class="p-2 flex items-center justify-between ">
                            <div class="wrap">
                                <v-icon name="hi-view-grid" scale="1.5" />
                                <span class="ps-2">Beranda</span>
                            </div>
                        </div>
                    </div>
                    <div class="menu-item menu-active">
                        <div class="p-2 flex items-center justify-between ">
                            <div class="wrap">
                                <v-icon name="hi-folder" scale="1.5" />
                                <span class="ps-2">Master</span>
                            </div>
                            <v-icon name="hi-solid-chevron-down" />
                        </div>
                        <div class="submenu active">
                            <v-icon name="hi-view-grid" scale="1.5" />
                            <span class="ps-2">Beranda</span>
                        </div>
                        <div class="submenu">
                            <v-icon name="hi-view-grid" scale="1.5" />
                            <span class="ps-2">Beranda</span>
                        </div>
                        <div class="submenu">
                            <v-icon name="hi-view-grid" scale="1.5" />
                            <span class="ps-2">Beranda</span>
                        </div>
                    </div>
                    <div class="menu-item">
                        <div class="p-2 flex items-center justify-between ">
                            <div class="wrap">
                                <v-icon name="hi-folder" scale="1.5" />
                                <span class="ps-2">Master</span>
                            </div>
                            <v-icon name="hi-solid-chevron-down" />
                        </div>
                    </div>
                    <div class="menu-item">
                        <div class="p-2 flex items-center justify-between ">
                            <div class="wrap">
                                <v-icon name="hi-folder" scale="1.5" />
                                <span class="ps-2">Master</span>
                            </div>
                            <v-icon name="hi-solid-chevron-down" />
                        </div>
                    </div>
                    <div class="menu-item">
                        <div class="p-2 flex items-center justify-between ">
                            <div class="wrap">
                                <v-icon name="hi-folder" scale="1.5" />
                                <span class="ps-2">Master</span>
                            </div>
                            <v-icon name="hi-solid-chevron-down" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom-menu p-2">
                <div class="p-2 flex items-center justify-between bg-pr-50 rounded-xl ">
                    <div class="wrap flex gap-2">
                        <img class="avatar w-10  object-cover rounded-full h-10"
                            src="https://abuhapsins.wordpress.com/wp-content/uploads/2013/09/dsc_1250-copy.jpg" />
                        <div>
                            <p class="text-sc">ahapsin</p>
                            <p class="text-xs text-pr">ahapsin02@gmail.com</p>
                        </div>
                    </div>
                    <v-icon name="hi-solid-chevron-down" />
                </div>
            </div>
        </div>
        <div class="main-content">
            <div class="topbar">
                <span>header title</span>
                <div>
                    <label for="input" class="text-base absolute pt-2 ps-2">
                        <v-icon name="hi-search" class="text-sc-200" /> </label>
                    <input id="input" type="text" placeholder="cari"
                        class="border w-full text-base dark:text-osf-drk p-2 ps-8 font-medium focus:outline-none focus:ring-2 focus:ring-pr rounded-xl" />
                </div>
                <div class="wrap gap-4 flex">
                    <div class="button-reg">
                        <v-icon name="hi-at-symbol" />
                    </div>
                    <div class="button-reg">
                        <v-icon name="hi-bell" />
                        <span class="notif w-3  -mt-3 rounded-full h-3 bg-red-500 absolute"></span>
                    </div>
                </div>
            </div>
            <div class="flexbox ">
                <div class="card">
                    <div class="flex items-center gap-2">
                        <div
                            class="flex p-2 bg-yellow-200 rounded-full w-10 h-10 aspect-square justify-center items-center">
                            <v-icon name="hi-calendar" />
                        </div>
                        <div>
                            <p class="font-semibold">Content</p>
                            <p>subcontent</p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="flex items-center gap-2">
                        <div
                            class="flex p-2 bg-yellow-200 rounded-full w-10 h-10 aspect-square justify-center items-center">
                            <v-icon name="hi-calendar" />
                        </div>
                        <div>
                            <p class="font-semibold">Content</p>
                            <p>subcontent</p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="flex items-center gap-2">
                        <div
                            class="flex p-2 bg-yellow-200 rounded-full w-10 h-10 aspect-square justify-center items-center">
                            <v-icon name="hi-calendar" />
                        </div>
                        <div>
                            <p class="font-semibold">Content</p>
                            <p>subcontent</p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="flex items-center gap-2">
                        <div
                            class="flex p-2 bg-yellow-200 rounded-full w-10 h-10 aspect-square justify-center items-center">
                            <v-icon name="hi-calendar" />
                        </div>
                        <div>
                            <p class="font-semibold">Content</p>
                            <p>subcontent</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="headerlead ">
                <span class="wrap">
                    <p class="text-2xl capitalize">hasil survey</p>
                    <p class="text-sm text-sc-500 capitalize">pengajuan hasil survey menunggu persetujuan</p>
                </span>
                <div class="flex gap-4">
                    <div class="button-reg bg-pr !text-sf !border-pr flex gap-1 items-center">
                        <v-icon name="hi-download" />
                        <p>Ekspor PDF</p>
                    </div>
                    <div class="button-reg flex gap-1 items-center">
                        <v-icon name="hi-plus-sm" />
                        <p>tambah survey</p>
                    </div>
                </div>
            </div>
            <div class="flexbox">
                <div class="border w-full p-2 rounded-xl">
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th><input type="checkbox" class="accent-pr"></th>
                                <th>col2</th>
                                <th>col3</th>
                                <th>col4</th>
                                <th>col5</th>
                                <th>col6 </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="odd:bg-white even:bg-slate-50">
                                <td><input type="checkbox" class="accent-pr"></td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr class="odd:bg-white even:bg-slate-50">
                                <td><input type="checkbox" class="accent-pr"></td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr class="odd:bg-white even:bg-slate-50">
                                <td><input type="checkbox" class="accent-pr"></td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr class="odd:bg-white even:bg-slate-50">
                                <td><input type="checkbox" class="accent-pr"></td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr class="odd:bg-white even:bg-slate-50">
                                <td><input type="checkbox" class="accent-pr"></td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="action flex mt-2 justify-between">
                        <div class="flex gap-2">
                            <div class="button-reg">
                                <v-icon name="hi-solid-chevron-left" />
                            </div>
                            <div class="button-reg aspect-square">
                                1
                            </div>
                            <div class="button-reg">
                                <v-icon name="hi-dots-horizontal" />
                            </div>
                            <div class="button-reg aspect-square">
                                8
                            </div>
                            <div class="button-reg">
                                <v-icon name="hi-solid-chevron-right" />
                            </div>
                        </div>
                        <div class="button-reg">
                            5 hasil
                            <v-icon name="hi-solid-chevron-up" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style  scoped>
td {
    @apply p-2 border-b
}

th {
    @apply first:rounded-s-md bg-pr-50 last:rounded-e-md p-2 first:w-10 text-left
}

.brand {
    @apply min-h-14 bg-sf text-xl font-semibold antialiased flex items-center
}

.topbar {
    @apply min-h-20 bg-sf sticky top-0 text-2xl font-semibold flex items-center p-4 justify-between px-10
}

.button-reg {
    @apply p-2 text-sm text-sc-300 border rounded-xl
}

.content {
    @apply p-2
}

.menu {
    @apply p-4
}

.flexbox {
    @apply flex gap-8 justify-between px-8
}

.card {
    @apply p-6 border rounded-xl w-1/4
}

.headerlead {
    @apply p-2 px-8 flex justify-between items-center py-8
}

.menu-active {
    @apply !bg-pr-50 rounded-lg
}

.menu-item {
    @apply p-2
}

.submenu {
    @apply ms-8 py-2 flex ps-2
}

.active {
    @apply bg-pr rounded-md text-sf
}

.main-screen {
    @apply flex min-h-screen
}

.sidebar {
    @apply flex bg-sf flex-col justify-between min-h-screen w-1/5
}

.main-content {
    @apply w-full h-lvh overflow-auto
}
</style>