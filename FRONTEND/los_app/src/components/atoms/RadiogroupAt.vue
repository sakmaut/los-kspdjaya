<template>
    <div class="p-2">
        <label class="flex text-reg pb-2 font-medium">Produk</label>
        <ul class="grid grid-cols-4 gap-4">
            <li>
                <input type="radio" id="kama" name="hosting" value="hosting-small" class="hidden peer" required
                    v-bind="$attrs" />
                <label for="kama" class="inline-flex items-center 
                    justify-between min-w-full p-5 
                    text-gray-500 bg-white border border-gray-200 
                    rounded-lg cursor-pointer 
                    dark:hover:text-gray-300 
                    dark:border-gray-700
                    dark:peer-checked:text-blue-500
                     peer-checked:outline-none
                     hover:text-gray-600 hover:bg-gray-100
                     dark:text-gray-400 
                     dark:bg-gray-800 
                     dark:hover:bg-gray-700">
                    <div class="block">
                        <div class="w-full text-lg font-semibold">KAMA</div>
                        <div class="w-full">Kredit Multiguna</div>
                        <div class="w-full text-sm text-sky-500">bunga mulai 0.0%</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id="kamu" name="hosting" value="hosting-small" class="hidden peer" required />
                <label for="kamu"
                    class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:ring-2 peer-checked:ring-primary peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div class="block">
                        <div class="w-full text-lg font-semibold">KAMU</div>
                        <div class="w-full">Kredit Multiguna</div>
                        <div class="w-full text-sm text-sky-500">bunga mulai 0.0%</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id="kpm" name="hosting" value="hosting-small" class="hidden peer" required />
                <label for="kpm"
                    class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:ring-2 peer-checked:ring-primary peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div class="block">
                        <div class="w-full text-lg font-semibold">KPM</div>
                        <div class="w-full">Kredit Multiguna</div>
                        <div class="w-full text-sm text-sky-500">bunga mulai 0.0%</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id="kpr" name="hosting" value="hosting-small" class="hidden peer" required />
                <label for="kpr"
                    class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:ring-2 peer-checked:ring-primary peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div class="block">
                        <div class="w-full text-lg font-semibold">KPR</div>
                        <div class="w-full">Kredit Multiguna</div>
                        <div class="w-full text-sm text-sky-500">bunga mulai 0.0%</div>
                    </div>
                </label>
            </li>
        </ul>
    </div>
</template>