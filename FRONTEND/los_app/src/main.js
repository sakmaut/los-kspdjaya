import { createPinia } from "pinia";
import { createApp } from "vue";
import Cleave from "vue-cleave-component";
import JsonExcel from "vue-json-excel3";
import App from "./App.vue";
import router from "./router";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as BIcons from "oh-vue-icons/icons/bi";
import * as HIIcons from "oh-vue-icons/icons/hi";
import * as RIcons from "oh-vue-icons/icons/ri";
const Bi = Object.values({ ...BIcons });
const Ri = Object.values({ ...RIcons });
const Hi = Object.values({ ...HIIcons });
addIcons(...Bi, ...Hi, ...Ri);

import "@/assets/index.css";

import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Cleave);
app.use(ToastPlugin);
app.component("downloadExcel", JsonExcel);
app.component("v-icon", OhVueIcon);
app.mount("#app");
