<template>
<keep-alive include="addCarsInfo">
    <div class="AddCarsInfo">
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
            <van-field
                v-model="parking"
                label="车牌号"
                placeholder="请输入车位号"
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
</keep-alive>
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
            parking:'',
            show:false,
            columns: [],
            access_token:this.$md5(mdFive.prefix_str + mdFive.access_date + mdFive.api_key)
        }
    },
    mounted(){
        // 获取车辆品牌信息
        this.axios.post(url.getCarBrands,{
            access_token:this.access_token
        }).then(res => {
            // 将后台传过来的 json 数组里面的 name 换成 text
            this.columns = JSON.parse(JSON.stringify(res.data.data).replace(/name/g,'text'))
        }).catch(err => {
            Toast(`获取汽车品牌失败！<br> ${err.data}`)
        })
    },
    methods: {
        // 提交车辆信息
        saveCarsInfo() {
            this.axios.post(url.addCarInfo,{
                access_token:this.access_token,
                car_owner:this.car_owner,
                plate_number:this.plate_number,
                b_name:this.car_brand,
                car_brand_pid:this.car_brand_pid,
                parking:this.parking,
            }).then(() => {
                this.$router.replace({
                    path:'/haveCarsInfo',
                    query:{
                        isReload:true
                    }
                })
                this.$router.go(-1)
            }).catch(err => {
                Toast(`提交失败！<br> ${err.data}`)
            })
        },
        // 弹框 确认
        onConfirm(value) {
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
.AddCarsInfo{
    width: 100%;
    position: absolute;
}
</style>