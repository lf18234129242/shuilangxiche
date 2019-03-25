<template>
    <div class="SearchPage">
        <div class="search-box">
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                show-action
                shape="round"
                @search="onSearch"
                @focus="show=true"
            >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>
        <!-- 弹出层   列表 -->
        <van-popup v-model="show" position="top" :overlay="false">
            <van-cell-group v-for="(item,index) in searchList" :key="index">
                <van-cell
                    is-link
                    :value="item.value"
                    to=""
                />
            </van-cell-group>
        </van-popup>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value:'',
                show: false,
                searchList:[
                    {
                        value:'哇哈哈',
                        id:'111'
                    },
                    {
                        value:'可乐',
                        id:'222'
                    },
                    {
                        value:'红茶',
                        id:'333'
                    },
                ]
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
    .search-box{
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2001;
    }
    .van-popup--top{
        top: 4rem;
    }
}
</style>