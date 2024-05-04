<template>
    <div class="loader reg-dark"></div>
</template>
<style scoped>
.loader {
    aspect-ratio: 1;
    border-radius: 50%;
    animation: l2 1s infinite linear;
}

.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.container {
    padding: 20px;
    border: 0px solid #0000ff;
    border-radius: 24px;
    background-color: rgba(0, 0, 0, 0.8);
}

.reg-light {
    border: 4px solid #01316E;
    border-right-color: #002049;
    width: 30px;
    height: 30px;
}
.reg-dark{
    border: 4px solid #DDEAF3;
    border-right-color: #013577;
    width: 30px;
    height: 30px;
}

.width2 {
    border: 2px solid #f4f4f4;
    border-right-color: #0000ff;
    width: 16px;
    height: 16px;
}

@keyframes l2 {
    to {
        transform: rotate(1turn)
    }
}
</style>