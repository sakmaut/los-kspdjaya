<template>
    <div>
        <input type="radio" :id="option" name="radio-input" :value="option"
            @change="$parent.$emit('update:modelValue', $event.target.value)" v-bind="$attrs" class="hidden peer" />
        <label :for="option" class="flex items-center p-2
                        text-gray-500 bg-sc-100 dark:bg-sf-drk-200 border 
                        rounded-lg cursor-pointer
                         peer-checked:shadow peer-checked:ring-pr peer-checked:bg-pr-500 peer-checked:text-sf
                         hover:text-gray-600 hover:bg-pr-50">
            <slot></slot>
        </label>
    </div>
</template>

<script setup>
defineProps({
    option: {
        type: String,
    },
});
</script>