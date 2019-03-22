<template>
    <div class="shadow-box">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.shadow-box{
    width: 21.5rem;
    box-shadow:  0px 0px 8px #aaa;
    background: #fff;
    border-radius: 2px;
    margin: auto;
    margin-top: .933rem;
    padding: 1rem;
    box-sizing: border-box;
}
</style>