<template>
    <div class="flex flex-col gap-4 mt-2">
        <div class="w-full rounded-xl border-2 border-plate text-white overflow-auto h-full">
            <Disclosure as="div">
                <DisclosureButton class="rounded-xl w-full flex items-start">
                    <div class="bg-pr flex min-w-full items-center p-2">
                        <v-icon name="bi-cup-straw" scale="1.5" />
                        <span class="font-bold">
                            {{ props.label }}</span>
                    </div>
                </DisclosureButton>
                <DisclosurePanel>
                    <div class="p-2 bg-pr">
                        <pre v-text="props.data" class="text-sf" />
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </div>
    </div>
</template>

<script setup>
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/vue'
const props = defineProps({
    data: Object,
    label: String
});
</script>