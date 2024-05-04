<template>
    <div class=" h-[calc(100vh-5rem)] p-4 overflow-auto">
        <slot></slot>
    </div>
   
</template>
<script>
export default{
    props:[
        'bg'
    ]
}
</script>