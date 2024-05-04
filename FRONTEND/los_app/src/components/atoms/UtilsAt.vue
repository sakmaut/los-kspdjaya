<template>
    headup : {{ online }}
    <pre>network type: {{ network }}</pre>
    <pre>
        long : {{ location.coords.value.longitude }}
        lat : {{ location.coords.value.latitude }}
        accuracy : {{ location.coords.value.accuracy }}
    </pre>
    <Transition>
        <OverlayAt v-if="!online" />
    </Transition>
</template>
<script setup>
import OverlayAt from "./OverlayAt.vue";
import { useOnline, useNetwork, useGeolocation } from "@vueuse/core";
import { reactive } from "vue";
const network = reactive(useNetwork());
const online = useOnline();
const location = useGeolocation();
console.log(network.type)
</script>