<template>
    <div class="SearchPage">
        <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
        >
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: 'value'
            }
        },
        methods: {
            onSearch() {
                // console.log('onSearch')
            }
        },
    }
</script>

<style scoped lang="scss">
.SearchPage{
    width: 100%;
    position: absolute;
}
</style>