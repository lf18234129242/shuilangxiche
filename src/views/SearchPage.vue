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
                    :title="item.car_brand"
                    :value="item.plate_number"
                    :to="{
                        path:'/placeOrder',
                        query:{
                            ownerName:item.car_owner,
                            c_user_id:item.c_user_id,
                            car_brand:item.car_brand,
                            plate_number:item.plate_number,
                            id:item.id,
                            isReload:true
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
            this.getSearchListFromStorage()
        },
        activated(){
            let isReload = this.$route.query.isReload;
            if(isReload){
                this.getSearchListFromStorage()
            }else{
                return false;
            }
        },
        methods: {
            onSearch() {
                // console.log('onSearch')
            },
            getSearchListFromStorage(){
                this.searchList = JSON.parse(localStorage.getItem('carsInfoList'))
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