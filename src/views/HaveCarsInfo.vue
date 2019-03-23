<template>
    <div class="HaveCarsInfo">
        <div class="cars-info" v-for="(item, index) in carsInfo" :key="item.id">
            <shadow-box>
                <van-field
                    :value="item.ownerName"
                    label="车主姓名"
                    disabled
                />
                <van-field
                    :value="item.carNumber"
                    label="车牌号"
                    disabled
                />
                <van-field
                    :value="item.carsBrand"
                    label="品牌"
                    disabled
                />
                <div class="button-box">
                    <van-button round size="small" @click.stop="modifyThis(index)">修改</van-button>
                    <van-button round size="small" @click.stop="deleteThis(index)">删除</van-button>
                </div>
            </shadow-box>
        </div>
        <submit-button-box
            buttonValue="添加车辆信息"
            @buttonSubmit="addCarsInfo"
        ></submit-button-box>
    </div>
</template>

<script>
    import {Toast, Dialog} from 'vant'
    export default {
        data() {
            return {
                carsInfo:[
                    {
                        ownerName: 'ownerName0',
                        carNumber: 'carNumber0',
                        carsBrand: 'carsBrand0',
                    },
                    {
                        ownerName: 'ownerName1',
                        carNumber: 'carNumber1',
                        carsBrand: 'carsBrand1',
                    },
                ]
            }
        },
        mounted(){
            Toast('加载数据')
        },
        methods: {
            addCarsInfo() {
                this.$router.push('/AddCarsInfo')
            },
            // 修改当前车辆信息
            modifyThis(index){
                this.$router.push({
                    path:'/AddCarsInfo',
                    query:{
                        ownerName:this.carsInfo[index].ownerName,
                        carNumber:this.carsInfo[index].carNumber,
                        carsBrand:this.carsInfo[index].carsBrand,
                    }
                })
            },
            // 删除当前车辆信息
            deleteThis(index){
                Dialog.confirm({
                    message: '确定要删除吗？'
                    }).then(() => {
                        this.carsInfo.splice(index,1)
                        Toast.success(`删除成功: ${index}`)
                    }).catch(() => {
                });
            }
        },
    }
</script>

<style scoped lang="scss">
.HaveCarsInfo{
    width: 100%;
    position: absolute;
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