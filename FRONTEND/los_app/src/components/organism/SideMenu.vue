<template>
    <div>
        <DisclosMenu :menus="listMenu.response">
        </DisclosMenu>
        <!-- <pre>{{ listMenu.response }}</pre> -->
    </div>
    <div v-if="suspense">
        <DisclosMenuSusp />
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import DisclosMenu from "@/components/molecules/DisclosMenu.vue";
import DisclosMenuSusp from "../molecules/DisclosMenuSusp.vue";

const suspense = ref(false);
const listMenu = reactive(
    {
        message: "",
        status: "",
        response: []
    }
);

const apibase = import.meta.env.VITE_APP_API_BASE;

const token = localStorage.getItem("token");

const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
};


const getMenus = async () => {
    suspense.value = true;
    try {
        let getListMenu = await axios.get(`${apibase}/menu-sub-list`, config);
        listMenu.response = getListMenu.data.response;
        suspense.value = false;
    } catch (error) {
        console.log(error)
        suspense.value = true;
    }

}
onMounted(() => {
    getMenus();
});
</script>