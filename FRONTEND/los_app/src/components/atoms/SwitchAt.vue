<template>
    <Switch v-model="enabled" :class="enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-sf-drk-100'"
        class="relative inline-flex h-6 w-11 items-center rounded-full">
        <span class="sr-only">Enable notifications</span>
        <span :class="enabled ? 'translate-x-6' : 'translate-x-1'"
            class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
    </Switch>
</template>

<script setup>
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'

const enabled = ref(false)
</script>