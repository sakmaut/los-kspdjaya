<template>
    <div class="w-full bg-sfcls dark:bg-sf-drk-100 sticky border-t dark:border-sf-drk-200 bottom-0">
        <div class="sm-menu snap-x">
            <div class="sm-menu-item" v-for="menu in listMenu.response" key="menuid">
                <RouterLink :to="{ path: menu.menuitem.routename, query: { main: menu.menuid } }" v-slot="{ isActive }">
                    <div class="flex flex-col items-center text-sf-drk-600"
                        :class="[isActive && '!text-pr dark:!text-pr-500']">
                        <v-icon :name="isActive ? menu.menuitem.leading[1] : menu.menuitem.leading[0]" scale="1.5" />
                        <p class="sm text-xs">{{ menu.menuitem.labelmenu }}</p>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<style scoped>
.sm-menu {
    @apply flex justify-around items-center
}

.sm-menu-item {
    @apply flex flex-col p-2 pt-4 items-center justify-center
}
</style>
<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
const apibase = import.meta.env.VITE_APP_API_BASE;

const token = localStorage.getItem("token");
const listMenu = reactive(
    {
        message: "",
        status: "",
        response: []
    }
);
const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
};


const getMenus = async () => {
    try {
        let getListMenu = await axios.get(`${apibase}/menu`, config);
        listMenu.response = getListMenu.data.response;
    } catch (error) {
        console.log(error)
        suspense.value = true;
    }

}
onMounted(() => {
    getMenus();
});
</script>