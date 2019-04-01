<template>
    <div class="HaveCarsInfo">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="cars-info" v-for="(item, index) in carsInfo" :key="item.index">
                <shadow-box>
                    <van-field
                        :value="item.car_owner"
                        label="车主姓名"
                        disabled
                    />
                    <van-field
                        :value="item.plate_number"
                        label="车牌号"
                        disabled
                    />
                    <van-field
                        :value="item.car_brand"
                        label="品牌"
                        disabled
                    />
                    <van-field
                        :value="item.parking ? item.parking : '暂无'"
                        label="车位号"
                        disabled
                    />
                    <div class="button-box">
                        <van-button round size="small" @click.stop="modifyThis(index)">修改</van-button>
                        <van-button round size="small" @click.stop="deleteThisInfo(index)">删除</van-button>
                    </div>
                </shadow-box>
            </div>
            <submit-button-box
                buttonValue="添加车辆信息"
                @buttonSubmit="addCarsInfo"
            ></submit-button-box>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {Toast, Dialog} from 'vant'
    import url from '@/serviceAPI.config.js'
    import mdFive from '@/md5.js'
    import ScrollPosition from './../scroll-position.js'
    export default {
        data() {
            return {
                isLoading: false,
                carsInfo:[],
                access_token:this.$md5(mdFive.prefix_str + mdFive.access_date + mdFive.api_key)
            }
        },
        updated(){
        // 微信获取用户 openid 
            localStorage.setItem('openid',this.$geturlpara.getUrlKey('openid'))
        },
        mounted(){
            // 获取骑车列表
            this.getCarList();

            // 重置滚动条位置
            ScrollPosition.get.call(this);
        },
        methods: {
            // 下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                    this.getCarList();
                }, 500);
            },
            addCarsInfo() {
                this.$router.push('/AddCarsInfo')
            },
            // 修改当前车辆信息
            modifyThis(index){
                this.$router.push({
                    path:'/ChangeCarsInfo',
                    query:{
                        car_owner:this.carsInfo[index].car_owner,
                        plate_number:this.carsInfo[index].plate_number,
                        car_brand:this.carsInfo[index].car_brand,
                        id:this.carsInfo[index].id,
                        parking:this.carsInfo[index].parking,
                        car_brand_pid:this.carsInfo[index].car_brand_pid,
                    }
                })
            },
            // 删除当前车辆信息
            deleteThisInfo(index){
                Dialog.confirm({
                    message: '确定要删除吗？'
                }).then(() => {
                    this.axios.post(url.deleteCarInfo,{
                        access_token:this.access_token,
                        id:this.carsInfo[index].id,
                    }).then(() => {
                        Toast.success(`删除成功!`)
                        // 删除对应数据
                        this.carsInfo.splice(index,1)
                    }).catch(err => {
                        Toast(`删除失败！<br> ${err.data}`)
                    })
                }).catch(() => {
                    Toast('删除失败！')
                });
            },
            getCarList(){
                this.axios.post(url.getCarList,{
                    access_token:this.access_token,
                }).then(res => {
                    this.carsInfo = res.data.data.data;
                }).catch(err => {
                    Toast(`获取信息失败！<br> ${err.data}`)
                })
            }
        },
    }
</script>

<style scoped lang="scss">
.HaveCarsInfo{
    width: 100%;
    height: auto;
    position: absolute;
    background: #f5f5f5;
    .button-box{
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-top: .8rem;
        box-sizing: border-box;
    }
    
}

</style>