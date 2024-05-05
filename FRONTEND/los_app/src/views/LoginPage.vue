<!-- https://images.unsplash.com/photo-1506102383123-c8ef1e872756?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DS -->
<template>
    <ScaffMol
        class="flex justify-center md:py-8 bg-gradient-to-r from-pr-100 to-pr-50 dark:bg-gradient  dark:from-sf-drk-100 dark:to-pr-500  min-h-screen">
        <div
            class="flex bg-sf dark:bg-sf-drk-100 w-full md:w-3/4 md:rounded-xl overflow-clip md:border-0 border-pr-100 dark:border-pr-500 shadow-md shadow-pr-200 dark:shadow-sf-drk-100">
            <div class="w-full md:w-2/4 p-4 md:p-4">
                <LoginForm />
            </div>
            <div class="hidden md:flex ">
                <QuoteSection />
            </div>
        </div>
    </ScaffMol>
</template>
<script setup>
import QuoteSection from "@/components/organism/QuoteSectionOr.vue";
import LoginForm from "@/components/organism/LoginformOr.vue";
import ScaffMol from '@/components/molecules/ScaffMol.vue';
</script>