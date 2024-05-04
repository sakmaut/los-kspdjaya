<template>
    <div class="form-group" v-for="(input, k) in nested.inputs" :key="k">
        <input type="text" class="form-control" v-model="input.input" @keyup.enter="add(k)">
        <span>
            <button @click="add(k)">add</button> | <button @click="remove(k)" v-show="k">remove</button>
        </span>
    </div>
    <div>
        <PreRender :data="nested.inputs"></PreRender>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import PreRender from "@/components/atoms/PreRender.vue";
const nested = reactive({
    inputs: [
        {
            input: ''
        }
    ]
});
function add(index) {
    nested.inputs.push({ input: '' });
    index
}
function remove(index) {
    nested.inputs.splice(index, 1);
    index
}

</script>