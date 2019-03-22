<template>
    <div class="AddCarsInfo">
        <shadow-box>
            <van-field
                    :value="ownerName"
                    label="车主姓名"
                />
                <van-field
                    :value="carNumber"
                    label="车牌号"
                />
                <van-field
                    :value="carsBrand"
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
                title="标题"
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
                />
        </van-popup>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    export default {
        data() {
            return {
                ownerName: 'value',
                carNumber: 'value',
                carsBrand:'',
                show:false,
                columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
            }
        },
        created(){
            this.ownerName = this.$route.query.ownerName ? this.$route.query.ownerName : '';
            this.carNumber = this.$route.query.carNumber ? this.$route.query.carNumber : '';
            this.carsBrand = this.$route.query.carsBrand ? this.$route.query.carsBrand : '';
        },
        methods: {
            saveCarsInfo() {
                this.$router.go(-1)
                Toast.success('保存成功')
            },
            // 选择车品牌
            // 弹框 确认
            onConfirm(value, index) {
                Toast(`当前值：${value}, 当前索引：${index}`);
                this.show = false;
                this.carsBrand = value;
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