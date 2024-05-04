<template>
    <table>
        <tr>
            <td v-for="datas in data">
                <component :is="comp"></component>
            </td>
        </tr>
    </table>

</template>
<script setup>
const data = ["1", "2", "3"];
defineProps({
    comp: Object
});
</script>