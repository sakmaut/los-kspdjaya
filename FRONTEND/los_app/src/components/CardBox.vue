<template>
    <div class="hover:shadow bg-white rounded-md p-8">
        <div class="flex justify-center mb-3 bg-sky-300 items-center rounded-xl w-11 h-11">
            <unicon :name="icon" width="24" fill="white"></unicon>
        </div>
        <div class="block leading-5">
            <div class="text-4xl font-medium">{{ valueBox }}</div>
            <div class="text-sm rounded-full text-slate-400">
                {{ labelBox }}
            </div>
        </div>
        <div>
            <span class="bg-sky-200 p-1 text-xs rounded-full text-sky-800">
                {{ chip }}
            </span>
        </div>
        <slot></slot>
    </div>
</template>
<script>


export default {
    props: {
        labelBox: String,
        valueBox: Number,
        chip: Number,
        icon:String,
    },
}
</script>