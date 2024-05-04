<template>
    <div v-for="list in listMenu.response.submenu">
        <RouterLink :to="list.subroute">
            <div class="flex gap-4 bg-sf p-4 w-full">
                <div>
                    <v-icon :name="list.leading[1]" />
                </div>
                <div>{{ list.sublabel }}</div>
            </div>
        </RouterLink>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
const apibase = import.meta.env.VITE_APP_API_BASE;
const props = defineProps({
    id: String
});
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

const menuid = {
    "menu_id": props.id
};


const getMenus = async () => {
    try {
        let getListMenu = await axios.post(`${apibase}/getSubMenu`, menuid, config);
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