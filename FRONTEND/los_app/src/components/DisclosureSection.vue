<template>
    <Disclosure>
        <DisclosureButton class="py-2">
            <slot name="head" />
        </DisclosureButton>
        <DisclosurePanel class="text-gray-500">
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