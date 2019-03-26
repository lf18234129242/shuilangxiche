<template>
    <div class="submit-button-box">
        <van-button
            round
            size="normal"
            block
            @click.stop="$emit('buttonSubmit')"
        >{{buttonValue}}</van-button>
    </div>
</template>

<script>
    export default {
        props: {
            buttonValue: String,
        },
    }
</script>

<style scoped lang="scss">
.submit-button-box{
    .van-button{
        width: 13.8rem;
        height: 2.667rem;
        margin: 2.5rem auto 0;
        font-size: .8rem;
        line-height: 2.667rem;
        color: #fff;
        background: #00bff3;
        margin-bottom: 2rem;
    }
}
</style>