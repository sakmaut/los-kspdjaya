import { createApp } from "vue";
import { createPinia } from "pinia";
import Cleave from "vue-cleave-component";
import App from "./App.vue";
import router from "./router";
import JsonExcel from "vue-json-excel3";
import VueKonva from "vue-konva";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as BIcons from "oh-vue-icons/icons/bi";
import * as RIcons from "oh-vue-icons/icons/ri";
import * as HIIcons from "oh-vue-icons/icons/hi";
const Bi = Object.values({ ...BIcons });
const Ri = Object.values({ ...RIcons });
const Hi = Object.values({ ...HIIcons });
addIcons(...Bi, ...Hi, ...Ri);

import PrimeVue from "primevue/config";

import "@/assets/index.css";
import Wind from "@/components/wind";

import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Cleave);
app.use(VueKonva);
app.use(ToastPlugin);
app.component("downloadExcel", JsonExcel);
app.use(PrimeVue, {
  unstyled: true,
  pt: Wind,
});
app.component("v-icon", OhVueIcon);
app.mount("#app");
