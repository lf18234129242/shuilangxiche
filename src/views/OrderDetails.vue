<template>
    <div class="OrderDetails">
        <shadow-box>
            <van-steps
                :active="active"
                active-icon="success"
                active-color="#ffcc00"
            >
                <van-step>待付款</van-step>
                <van-step>已付款</van-step>
                <van-step>进行中</van-step>
            </van-steps>
            <div class="detail-title">
                <span></span>
                <h2>已下单清洗的车辆</h2>
            </div>
            <div class="detail-content">
                <div class="one">
                    <ul>
                        <li>车主姓名</li>
                        <p>{{ownerName}}</p>
                    </ul>
                    <ul>
                        <li>车牌号</li>
                        <p>{{carNumber}}</p>
                    </ul>
                    <ul>
                        <li>品牌</li>
                        <p>{{carsBrand}}</p>
                    </ul>
                </div>
                <ul class="username">
                    <li>小区信息</li>
                    <p>{{r_name}}</p>
                </ul>
                <ul class="username">
                    <li>套餐信息</li>
                    <p>{{package_detail}}</p>
                </ul>
                <div class="detail-status">
                    <span></span>
                    <p>您的服务订单已下单成功</p>
                </div>
            </div>
        </shadow-box>
        <div class="tell" @click="phoneCall">
            <span></span>
            <h2>客服电话：</h2>
            <h3>400-670-1818</h3>
        </div>
    </div>
</template>

<script>
    import url from '@/serviceAPI.config.js'
    import mdFive from '@/md5.js'
    export default {
        data() {
            return {
                // 步骤条数值
                active: 0,
                ownerName:'车主姓名',   //车主姓名
                carNumber:'车牌号',   //车牌号
                carsBrand:'品牌',   //品牌
                r_name:'小区信息',      //小区信息
                package_detail:'套餐信息',   //套餐信息
                access_token:this.$md5(mdFive.prefix_str + mdFive.access_date + mdFive.api_key),
            }
        },
        mounted(){
            this.getMessageFromPrePage();
        },
        activated(){
            let isReload = this.$route.query.isReload;
            if(isReload){
                this.getMessageFromPrePage();
            }else{
                return false;
            }
        },
        methods: {
            getMessageFromPrePage(){
                this.order_id = this.$route.query.order_id;
                console.log(this.order_id)
                this.axios.post(url.getClearOrder,{
                    access_token:this.access_token,
                    id:this.order_id
                }).then(res => {
                    console.log(res)
                    console.log(this.access_token)
                }).catch(err => {
                    console.log(err)
                })
            },
            phoneCall(){
                window.location.href = 'tel://4006701818'
            },
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
.OrderDetails{
    width: 100%;
    position: absolute;
    .detail-title{
        height: 2rem;
        padding: .467rem .833rem;
        display: flex;
        align-items: center;
        @extend .scale-1px;
        span{
            width: 1.333rem;
            height: 1.333rem;
            background: url(./../assets/img/list.png) no-repeat center;
            background-size: 1.3rem 1.3rem;
            margin-right: .667rem;
        }
        h2{
            font-size: .933rem;
        }
    }
    .detail-content{
        padding: 0 .833rem;
        .one{
            @extend .scale-1px;
            padding: .667rem 0;
            ul{
                height: 1.9rem;
                line-height: 1.9rem;
            }
        }
        ul{
            display: flex;
            align-items: center;
            justify-content: space-between;
            li{
                flex: 1;
            }
            p{
                flex: 3;
                color: #999999;
                text-align: right;
            }
        }
        .username{
            // height: 3.2rem;
            // line-height: 3.2rem;
            padding: 1.1rem 0 ;
            @extend .scale-1px;
        }
        .detail-status{
            height: 3.2rem;
            display: flex;
            align-items: center;
            span{
                width: 1rem;
                height: 1rem;
                background: url(./../assets/img/yes.png) no-repeat center;
                background-size: 1rem 1rem;
                margin-right: .4rem;
            }
            p{
                font-size: .667rem;
                color: #333333;
            }
        }
    }
    .tell{
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        bottom: 0;
        span{
            width: 1.167rem;
            height: 1.167rem;
            background: url(./../assets/img/kefu.png) no-repeat center;
            background-size: 1.167rem 1.167rem;
            margin-right: .667rem;
        }
        h3{
            color: #999999;
        }
    }
}
</style>