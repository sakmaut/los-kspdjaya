<!-- https://images.unsplash.com/photo-1506102383123-c8ef1e872756?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DS -->
<template>
    <ScaffMol class="bg-sf dark:bg-sf-drk">
        <div class="flex gap-6 w-full h-svh p-4 items-center">
            <div class="h-full md:w-1/2 justify-center hidden md:block">
                <QuoteSection />
            </div>
            <div class="h-full w-full md:w-1/2 flex">
                <LoginForm />
            </div>
        </div>
    </ScaffMol>
</template>
<script setup>
import QuoteSection from "@/components/organism/QuoteSectionOr.vue";
import LoginForm from "@/components/organism/LoginformOr.vue";
import ScaffMol from '@/components/molecules/ScaffMol.vue';
</script>