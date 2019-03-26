<template>
    <div class="SearchCommunity">
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
                    :title="item.r_name"
                    :value="item.address"
                    :to="{
                        path:'/placeOrder',
                        query:{
                            isReload:true,
                            address:item.address,
                            r_name:item.r_name,
                            community_id:item.id
                        }
                    }"
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
                show: true,
                searchList:[]
            }
        },
        mounted(){
            this.getJoinVillageFromStorage()
        },
        activated(){
            let isReload = this.$route.query.isReload;
            if(isReload){
                this.getJoinVillageFromStorage()
            }else{
                return false;
            }
        },
        methods: {
            onSearch() {
                // console.log('onSearch')
            },
            getJoinVillageFromStorage(){
                this.searchList = JSON.parse(localStorage.getItem('join_village'))
            }
        },
    }
</script>

<style scoped lang="scss">
.SearchCommunity{
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