<template>
    <div class="AddCarsInfo">
        <shadow-box>
            <van-field
                :value="car_owner"
                label="车主姓名"
            />
            <van-field
                :value="plate_number"
                label="车牌号"
            />
            <van-field
                :value="car_brand"
                label="品牌"
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
                @change="onChange"
            />
            <!-- <van-area
                :area-list="areaList"
                :columns-num="2"
                title="请选择车型" 
            /> -->
        </van-popup>
    </div>
</template>

<script>
import {Toast} from 'vant'
import url from '@/serviceAPI.config.js'
import mdFive from '@/md5.js'
const citys = {
    '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    '福建': ['福州', '厦门', '莆田', '三明', '泉州']
};
export default {
    data() {
        return {
            car_owner: '',
            plate_number: '',
            car_brand:'',
            show:false,
            columns: [
                {
                    values: Object.keys(citys),
                    className: 'column1'
                },
                {
                    values: citys['浙江'],
                    className: 'column2',
                    defaultIndex: 2
                }
            ]
        }
    },
    created(){
        this.car_owner = this.$route.query.car_owner ? this.$route.query.car_owner : '';
        this.plate_number = this.$route.query.plate_number ? this.$route.query.plate_number : '';
        this.car_brand = this.$route.query.car_brand ? this.$route.query.car_brand : '';
    },
    methods: {
        saveCarsInfo() {

            this.$router.go(-1)
            Toast.success('保存成功')
        },
        // 选择车品牌
        onChange(picker, values) {
            picker.setColumnValues(1, citys[values[0]]);
        },
        // 弹框 确认
        onConfirm(value, index) {
            Toast(`当前值：${value}, 当前索引：${index}`);
            this.show = false;
            this.car_brand = value;
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