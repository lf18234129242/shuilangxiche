<template>
    <div class="ChangeCarsInfo">
        <shadow-box>
            <van-field
                v-model="car_owner"
                label="车主姓名"
                placeholder="请输入车主姓名"
            />
            <van-field
                v-model="plate_number"
                label="车牌号"
                placeholder="请输入车牌号"
            />
            <van-field
                v-model="car_brand"
                label="品牌"
                placeholder="请选择汽车品牌"
                @click.stop="show=true"
            />
        </shadow-box>
        <submit-button-box
            buttonValue="保存"
            @buttonSubmit="saveCarsInfo"
        ></submit-button-box>
        <!-- 弹出层 -->
        <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker
                show-toolbar
                title="请选择车型"
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
            />
        </van-popup>
    </div>
</template>

<script>
import {Toast} from 'vant'
import url from '@/serviceAPI.config.js'
import mdFive from '@/md5.js'
export default {
    data() {
        return {
            car_owner: '',
            plate_number: '',
            car_brand:'',
            car_brand_pid:'',
            id:'',
            show:false,
            columns: [],
            access_token:this.$md5(mdFive.prefix_str + mdFive.access_date + mdFive.api_key),
            fromUrl:''
        }
    },
    mounted(){
        // 获取上个页面传过来的车辆信息
        this.getCarInfo()

        // 获取车辆品牌信息
        this.axios.post(url.getCarBrands,{
            access_token:this.access_token
        }).then(res => {
            this.columns = JSON.parse(JSON.stringify(res.data.data).replace(/name/g,'text'))
        }).catch(err => {
            Toast(`获取汽车品牌失败！<br> ${err.data}`)
        })
    },
    activated(){
        let isReload = this.$route.query.isReload;
        if(isReload){
            this.getCarInfo()
        }else{
            return false;
        }
    },
    methods: {
        getCarInfo(){
            this.car_owner = this.$route.query.car_owner ? this.$route.query.car_owner : '';
            this.plate_number = this.$route.query.plate_number ? this.$route.query.plate_number : '';
            this.car_brand = this.$route.query.car_brand ? this.$route.query.car_brand : '';
            this.id = this.$route.query.id ? this.$route.query.id : '';
            this.car_brand_pid = this.$route.query.car_brand_pid ? this.$route.query.car_brand_pid : '';
            this.fromUrl = this.$route.query.fromUrl ? this.$route.query.fromUrl : '';
        },
        // 提交车辆信息
        saveCarsInfo() {
            this.axios.post(url.editCarInfo,{
                access_token:this.access_token,
                car_owner:this.car_owner,
                plate_number:this.plate_number,
                b_name:this.car_brand,
                car_brand_pid:this.car_brand_pid,
                id:this.id,
            }).then(() => {
                if(!this.fromUrl){
                    this.$router.push({
                        path:'/haveCarsInfo',
                        query:{
                            isReload:true
                        }
                    })
                }else{
                    this.$router.push({
                        path:'/placeOrder',
                        query:{
                            ownerName:this.car_owner,
                            plate_number:this.plate_number,
                            car_brand:this.car_brand,
                            car_brand_pid:this.car_brand_pid,
                            id:this.id,
                            isReload:true,
                        }
                    })
                }
                
            }).catch(err => {
                Toast(`提交失败！ ${err.data}`)
            })
        },
        // 弹框 确认
        onConfirm(value) {
            // Toast(`当前值：${value.text}, 当前索引：${index}`);
            this.show = false;
            this.car_brand = value.text;
            this.car_brand_pid = value.b_id;
        },
        // 弹框 取消
        onCancel() {
            this.show = false;
        }
    },
}
</script>

<style scoped lang="scss">
.ChangeCarsInfo{
    width: 100%;
    position: absolute;
}
</style>