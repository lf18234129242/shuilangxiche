<template>
    <div class="SearchCommunity">
        <div class="search-box">
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                show-action
                shape="round"
                @search="onSearch"
                @focus="onFocus"
                @blur="onBlur"
                @input="inputSearch(searchList, value)"
            >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>
        <!-- 弹出层   列表 -->
        <van-popup v-model="show" position="top" :overlay="false">
            <van-cell-group v-for="(item,index) in searchList_keyword" :key="index">
                <van-cell
                    is-link
                    :title="item.r_name"
                    :value="item.address"
                    :to="{
                        path:'/placeOrder',
                        query:{
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
                searchList:[],
                searchList_keyword:[],
            }
        },
        mounted(){
            this.getJoinVillageFromStorage()
        },
        // activated(){
        //     let isReload = this.$route.query.isReload;
        //     if(isReload){
        //         this.getJoinVillageFromStorage()
        //     }else{
        //         return false;
        //     }
        // },
        methods: {
            onFocus(){
                this.show = true;
                this.searchList_keyword = '';
            },
            onBlur(){
                this.searchList_keyword = this.searchList;
            },
            onSearch() {
                // console.log('onSearch')
            },
            getJoinVillageFromStorage(){
                this.searchList = JSON.parse(localStorage.getItem('join_village'))
                this.searchList_keyword = JSON.parse(localStorage.getItem('join_village'))
            },
            // 更改输入就检索目标item
            inputSearch(searchList, keyWord){
                let arr = [];
                if(keyWord !== ''){
                    for (var i = 0; i < searchList.length; i++) {
                        if (searchList[i].r_name.indexOf(keyWord) >= 0) {
                            arr.push(searchList[i]);
                            // 去重
                            this.searchList_keyword=[...new Set(arr)]
                        }
                    }
                }else{
                    this.searchList_keyword = []
                }
            },
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