<template>
    <div class="ChangeUserPhoneNum">
        <LoginAndChangePage
            :userPhoneNum='userPhoneNum'
            :verificationCode='verificationCode'
            buttonText="确认更改"
            @getVerificationCode="getVerificationCode"
            @register="register"
            @sendUserNum="getUserNum"
            @sendVerCode="sendVerCode"
        ></LoginAndChangePage>

    </div>
</template>

<script>
import LoginAndChangePage from '@/components/LoginAndChangePage'
    export default {
        name:'ChangeUserPhoneNum',
        components:{
            LoginAndChangePage
        },
        data() {
            return {
                userPhoneNum: '',
                verificationCode:'',
            }
        },
        methods: {
            // 获取验证码
            getVerificationCode() {
                alert('getVerificationCode')
            },
            // 注册 、 登陆
            register(){
                // this.$router.replace('./personalCenter')
                this.$router.go(-2)
            },
            // 从子组件获取用户手机号
            getUserNum(userPhoneNum){
                this.userPhoneNum = userPhoneNum;
            },
            // 从子组件获取输入的验证码
            sendVerCode(verificationCode){
                this.verificationCode = verificationCode;
            }
        },
    }
</script>

<style scoped>
.ChangeUserPhoneNum{
    width: 100%;
    position: absolute;
}
</style>