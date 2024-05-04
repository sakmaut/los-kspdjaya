<!-- https://images.unsplash.com/photo-1506102383123-c8ef1e872756?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DS -->
<template>
    <ScaffMol class="bg-gradient-to-r from-pr-50 to-pr-100 dark:bg-sf-drk-200 min-h-screen md:p-10 md:px-20">
        <div class="flex bg-sf dark:bg-sf-drk-100 w-full md:rounded-xl overflow-clip md:border-2 border-pr-100">
            <div class="w-full md:w-1/2 p-4 md:p-0">
                <LoginForm />
            </div>
            <div class="hidden md:flex w-1/2 ">
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