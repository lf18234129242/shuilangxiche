<template>
    <div class="PlaceOrder">
        <shadow-box>
            <li class="first scale-1px">
                <span></span>
                <p>选择清洗车辆</p>
            </li>
            <div @click="toSearchPage">
                <van-search
                    placeholder="请输入搜索关键词"
                    disabled
                />
            </div>
            <!-- 车主信息 -->
            <div class="cars-info">
                <van-field
                    :value="ownerName"
                    label="车主姓名"
                    disabled
                />
                <van-field
                    :value="carNumber"
                    label="车牌号"
                    disabled
                />
                <van-field
                    :value="carsBrand"
                    label="品牌"
                    disabled
                />
                <div class="button-box">
                    <van-button round size="small" @click.stop="modifyThis">修改</van-button>
                    <van-button round size="small" @click.stop="deleteThis">删除</van-button>
                </div>
            </div>
        </shadow-box>
        <!-- 选择合作小区 -->
        <shadow-box>
            <li class="second scale-1px ">
                <span></span>
                <p>选择合作小区</p>
            </li>
            <div @click="toSearchPage">
                <van-search
                    placeholder="请输入搜索关键词"
                    disabled
                />
            </div>
        </shadow-box>
        <!-- 选择套餐 -->
        <shadow-box class="choose-package">
            <li class="third scale-1px">
                <span></span>
                <p>选择套餐</p>
            </li>
            <van-field
                class="scale-1px"
                :value="carsPackage"
                label="套餐"
                @click.stop="show=true"
            />
            <!-- 弹出层 -->
            <van-popup v-model="show" position="bottom" :overlay="true">
                <van-picker
                    show-toolbar
                    title="标题"
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                />
            </van-popup>
        </shadow-box>
    </div>
</template>

<script>
    import {Toast, Dialog} from 'vant'
    export default {
        data() {
            return {
                ownerName:'1111111111111',
                carNumber:'1111111111111',
                carsBrand:'1111111111111',
                carsPackage:'点击选择',
                show:false,
                columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
            }
        },
        methods: {
            toSearchPage() {
                this.$router.push('/SearchPage')
            },
            // 修改当前车辆信息
            modifyThis(){
                this.$router.push({
                    path:'/AddCarsInfo',
                    query:{
                        ownerName:this.ownerName,
                        carNumber:this.carNumber,
                        carsBrand:this.carsBrand,
                    }
                })
            },
            // 删除当前车辆信息
            deleteThis(){
                Dialog.confirm({
                    message: '确定要删除吗？'
                    }).then(() => {
                        this.ownerName = ''
                        this.carNumber = ''
                        this.carsBrand = ''
                        Toast.success(`删除成功`)
                    }).catch(() => {
                });
            },
            // 选择 套餐
            // 弹框 确认
            onConfirm(value, index) {
                Toast(`当前值：${value}, 当前索引：${index}`);
                this.show = false;
                this.carsPackage = value;
            },
            // 弹框 取消
            onCancel() {
                this.show = false;
            }
        },
    }
</script>

<style scoped lang="scss">
.scale-1px{
    position: relative;
    border: none;
}
.scale-1px:after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background: #eeeeee;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.icon-size{
    width: 1rem;
    height: 1rem;
    margin-right: .6rem;
}
.PlaceOrder{
    width: 100%;
    position: absolute;
    background: #f5f5f5;
    padding: 1rem 0 2rem;
    box-sizing: border-box;
    li{
        width: 100%;
        height: 2.5rem;
        font-size: .8rem;
        line-height: 2.5rem;
        display: flex;
        align-items: center;
    }
    .first{
        span{
            @extend .icon-size;
            background: url(./../assets/img/ioc.png) no-repeat -11.5rem -4.45rem;
            background-size: 25rem 19.8rem;
        }
        p{
            width: 100%;
        }
    }
    .second{
        span{
            @extend .icon-size;
            background: url(./../assets/img/ioc.png) no-repeat -11.5rem -7.3rem;
            background-size: 25rem 19.8rem;
        }
    }
    .third{
        span{
            @extend .icon-size;
            background: url(./../assets/img/ioc.png) no-repeat -11.5rem -10rem;
            background-size: 25rem 19.8rem;
        }
    }
    .cars-info{
        width: 100%;
        border: 1px solid #f5f5f5;
        padding-bottom: 0.5rem;
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
}

</style>


