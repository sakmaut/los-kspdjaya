<template>
    <TabGroup>
        <TabList class="flex bg-slate-200 rounded-md p-4 gap-2">
            <Tab class="flex p-2 rounded-md gap-2 hover:bg-slate-100">
                <div class="bg-blue-600 text-white w-6 rounded-full">
                    1
                </div>
                <p>Pengajuan Kredit</p>
            </Tab>
            <Tab class="flex p-2 rounded-md gap-2 hover:bg-slate-100">
                <div class="bg-blue-600 text-white w-6 rounded-full">
                    2
                </div>
                <p>Data Debitur</p>
            </Tab>
            <Tab class="flex p-2 rounded-md gap-2 hover:bg-slate-100">
                <div class="bg-blue-600 text-white w-6 rounded-full">
                    3
                </div>
                <p>Usaha & Jaminan</p>
            </Tab>
        </TabList>
        <TabPanels>
            <TabPanel><FormKredit/></TabPanel>
            <TabPanel><FormDebitur/></TabPanel>
            <TabPanel><FormJaminan/></TabPanel>
        </TabPanels>
    </TabGroup>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import FormKredit from "@/views/FormKredit.vue";
import FormDebitur from "@/views/FormDebitur.vue";
import FormJaminan from "@/views/FormJaminan.vue";
</script>