<template>
    <Disclosure v-slot="{ open }">
        <DisclosureButton as="template" class="py-2">

            <div class="flex items-center justify-between p-2 bg-white border rounded-md">
                <slot name="head" />
                <v-icon :name="open ? 'hi-chevron-down' : 'hi-chevron-up'"></v-icon>
            </div>

        </DisclosureButton>

        <DisclosurePanel as="div" class="py-2">
            <slot name="panel" />
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/vue'
</script>