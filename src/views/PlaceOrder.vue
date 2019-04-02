<template>
    <div class="PlaceOrder">
        <shadow-box>
            <li class="first scale-1px">
                <span></span>
                <p>选择清洗车辆</p>
            </li>
            <div @click="toSearchPage_1">
                <van-search
                    placeholder="选择清洗车辆"
                    disabled
                />
            </div>
            <!-- 车主信息 -->
            <div class="cars-info">
                <van-field
                    v-model="ownerName"
                    label="车主姓名"
                    disabled
                />
                <van-field
                    v-model="carNumber"
                    label="车牌号"
                    disabled
                />
                <van-field
                    v-model="carsBrand"
                    label="品牌"
                    disabled
                />
                <van-field
                    v-model="parking"
                    label="车位号"
                    disabled
                />
                <div class="button-box">
                    <van-button round size="small" @click.stop="modifyThis()">修改</van-button>
                    <van-button round size="small" @click.stop="deleteThis()">删除</van-button>
                </div>
            </div>
        </shadow-box>
        <!-- 选择合作小区 -->
        <shadow-box>
            <li class="second scale-1px">
                <span></span>
                <p>选择合作小区</p>
            </li>
            <div @click="toSearchPage_2">
                <van-search
                    placeholder="请输入搜索关键词"
                    disabled
                />
                <van-field
                    v-model="r_name"
                    label="小区名称"
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
                v-model="carsPackage"
                label="套餐"
                @click.stop="show=true"
                @focus="forbidKeyboard"
            />
            <!-- 弹出层 -->
            <van-popup v-model="show" position="bottom" :overlay="true">
                <van-picker
                    show-toolbar
                    title="套餐"
                    :columns="package_list"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                />
            </van-popup>
        </shadow-box>
        <submit-button-box
            buttonValue="下单"
            @buttonSubmit.once="placeOrder"
        ></submit-button-box>
    </div>
</template>

<script>
    import {Toast, Dialog} from 'vant'
    import url from '@/serviceAPI.config.js'
    import mdFive from '@/md5.js'
    import wx from 'weixin-js-sdk';
    export default {
        name:'placeOrder',
        data() {
            return {
                ownerName:'',      //车主姓名
                carNumber:'',      //车牌号
                carsBrand:'',      //车型号、品牌
                id:'',             // 车辆 id
                car_brand_pid:'',  //车型号 id
                parking:'',        //车位号 id
                carsPackage:'点击选择',
                show:false,
                access_token:this.$md5(mdFive.prefix_str + mdFive.access_date + mdFive.api_key),
                carsInfoList:[],    // 车辆信息
                join_village:[],    // 合作小区
                package_list:[],    // 套餐
                package_id:'',      //套餐id
                // 小区地址搜索页返回数据
                address:'',         //地址
                r_name:'',          //小区名称
                community_id:'',    //小区 id
                unit_price:'',      //套餐单价
                total_price:'',     //套餐总价
            }
        },
        mounted(){
            if(!localStorage.getItem('openid')){
                localStorage.setItem('openid',this.$geturlpara.getUrlKey('openid'))
            }
            this.axios.post(url.getSelfInfo,{
                access_token:this.access_token
            }).then(res => {
                console.log(res.data.data.phone)
                if(res.data.data.phone == ''){
                    localStorage.setItem('beforeLoginUrl','/PlaceOrder')
                    console.log('placeorder---'+localStorage.getItem('beforeLoginUrl'))
                    this.$router.push('/login')
                }else{
                    this.getInitInfo();
                }
            })
        },
        activated(){
            // 车辆搜索页 返回数据
            this.ownerName = this.$route.query.ownerName ? this.$route.query.ownerName : this.ownerName
            this.carNumber = this.$route.query.plate_number ? this.$route.query.plate_number : this.carNumber
            this.carsBrand = this.$route.query.car_brand ? this.$route.query.car_brand : this.carsBrand
            this.car_brand_pid = this.$route.query.car_brand_pid ? this.$route.query.car_brand_pid : this.car_brand_pid
            this.parking = this.$route.query.parking ? this.$route.query.parking : this.car_brand_pid
            this.c_user_id = this.$route.query.c_user_id ? this.$route.query.c_user_id : this.c_user_id
            this.id = this.$route.query.id ? this.$route.query.id : this.id
            // 小区地址搜索页 返回数据
            this.address = this.$route.query.address ? this.$route.query.address : this.address
            this.r_name = this.$route.query.r_name ? this.$route.query.r_name : this.r_name
            this.community_id = this.$route.query.community_id ? this.$route.query.community_id : this.community_id

        },
        updated(){
        // // 微信获取用户 openid ------------------------------------
        //     if(!localStorage.getItem('openid')){
        //         localStorage.setItem('openid',this.$geturlpara.getUrlKey('openid'))
        //     }
        },
        methods: {
            // beforeRouteEnter(to,from,next){
            //     localStorage.setItem('beforeLoginUrl',to.name)
            // },
            // 点击选择器禁止键盘弹出
            forbidKeyboard(){
                document.activeElement.blur();
            },
            // 获取用户订单所有信息
            getInitInfo(){
                this.axios.post(url.getInitInfo,{
                    access_token:this.access_token
                }).then(res => {
                    this.carsInfoList = res.data.data.car_list.data;
                    this.join_village = res.data.data.join_village.data;
                    this.package_list = res.data.data.package_list;
                    for(let i=0;i<this.package_list.length;i++){
                        this.package_list[i].text = this.package_list[i].package_name + ':' +this. package_list[i].price + '元/月'
                    }
                    // 默认显示的车辆信息
                    this.ownerName = this.carsInfoList[0].car_owner
                    this.carNumber = this.carsInfoList[0].plate_number
                    this.carsBrand = this.carsInfoList[0].car_brand
                    this.id = this.carsInfoList[0].id
                    this.car_brand_pid = this.carsInfoList[0].car_brand_pid
                    this.parking = this.carsInfoList[0].parking
                    // 将 拥有骑车(carsInfoList) 和 小区(join_village) 保存到本地
                    localStorage.setItem('carsInfoList',JSON.stringify(this.carsInfoList))
                    localStorage.setItem('join_village',JSON.stringify(this.join_village))
                }).catch(err => {
                    // Toast(`数据请求失败，请稍后再试! ${err}`)
                })
            },
            // 下单
            placeOrder(){
                this.axios.post(url.CreateOrder,{
                    access_token:this.access_token,
                    car_id:this.id,
                    village_id:this.community_id,
                    package_id:this.package_id,
                    unit_price:this.unit_price,
                    total_price:this.unit_price,
                }).then(res => {
                    if(res.data.code == 0){
                        // 支付
                        this.axios.post(url.getWxVoucher,{
                            access_token:this.access_token,
                            id:res.data.data.order_id,
                            url:'http://www.ichevip.com/view/placeOrder'
                        }).then(response => {
                            let configJson = JSON.parse(response.data.data.configJson);
                            wx.config({
                                debug: configJson.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
                                appId: configJson.appId, // 必填，公众号的唯一标识
                                timestamp: configJson.timestamp, // 必填，生成签名的时间戳
                                nonceStr: configJson.nonceStr, // 必填，生成签名的随机串
                                signature: configJson.signature,// 必填，签名，见附录1
                                jsApiList: [
                                    configJson.jsApiList
                                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                            });

                            wx.ready(function () {
                                let options = response.data.data.options;
                                // 支付成功后的操作
                                options.success = function () {
                                    window.location.href = `http://www.ichevip.com/view/orderDetails?id=${res.data.data.order_id}`;
                                };
                                
                                //  取消支付的操作
                                options.cancel = function () {
                                    pay_order = true;
                                };
                                
                                // 支付失败的处理 
                                options.fail = function () {
                                    pay_order = true;
                                };
                                // 传入参数，发起JSAPI支付
                                wx.chooseWXPay(options);
                            })
                        }).catch(error => {
                            Toast(`下单失败，请稍后再试！${error}`)
                        })
                        Toast('下单成功！')
                    }else{
                        Toast('下单失败，请核对您所填信息是否正确后再试！')
                    }
                }).catch(err => {
                    Toast(`下单失败，请稍后再试！${err}`)
                })
            },
            //  to 车辆搜索页
            toSearchPage_1() {
                this.$router.push('/searchPage')
            },
            //  to  小区地址搜索页
            toSearchPage_2() {
                this.$router.push('/searchCommunity')
            },
            // 修改当前车辆信息
            modifyThis(){
                this.$router.push({
                    path:'/changeCarsInfo',
                    query:{
                        car_owner:this.ownerName,
                        plate_number:this.carNumber,
                        car_brand:this.carsBrand,
                        id:this.id,
                        car_brand_pid:this.car_brand_pid,
                        parking:this.parking,
                        fromUrl:'placeOrder'
                    }
                })
            },
            // 删除当前车辆信息
            deleteThis(){
                Dialog.confirm({
                    message: '确定要删除吗？'
                }).then(() => {
                    this.axios.post(url.deleteCarInfo,{
                        access_token:this.access_token,
                        id:this.id,
                    }).then(() => {
                        this.getInitInfo()
                        Toast.success(`删除成功!`)
                    }).catch(err => {
                        Toast(`删除失败！<br> ${err.data}`)
                    })
                }).catch(() => {
                    Toast('删除失败！')
                });
            },
            // 选择套餐
            // 弹框 确认
            onConfirm(value) {
                this.show = false;
                this.carsPackage = value.text;
                this.package_id = value.id;
                this.unit_price = value.price;
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
    height: 100%;
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