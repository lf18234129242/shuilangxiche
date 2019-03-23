<template>
    <div class="login-box-parent">
        <LoginAndChangePage
            :userPhoneNum='userPhoneNum'
            :verificationCode='verificationCode'
            :disabled="disabled"
            :getVerificationCodeText='getVerificationCodeText'
            buttonText="确认登陆"
            @getVerificationCode="getVerificationCode"
            @register="register"
            @sendUserNum="getUserNum"
            @sendVerCode="sendVerCode"
        ></LoginAndChangePage>
    </div>
</template>

<script>
    import LoginAndChangePage from '@/components/LoginAndChangePage'
    import {Toast} from 'vant'
    // import { setInterval, clearInterval } from 'timers';
    export default {
        name: 'login',
        components:{
            LoginAndChangePage
        },
        data() {
            return {
                userPhoneNum: '',
                verificationCode:'',
                disabled:false,
                getVerificationCodeText:'获取验证码',
                CountdownCount:60
            }
        },
        methods: {
            // 获取验证码
            getVerificationCode(){
                Toast('验证码已发送')
                this.disabled = true;
                let timer = setInterval(()=>{
                    this.getVerificationCodeText = `${this.CountdownCount--}s后重新获取`;
                    if(this.CountdownCount < 0){
                        clearInterval(timer)
                        this.disabled = false;
                        this.getVerificationCodeText = '获取验证码';
                        this.CountdownCount = 60;
                    }
                },10)
            },
            // 注册 、 登陆
            register(){
                this.$router.replace('/')
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

<style lang="scss" scoped>
.login-box-parent{
    width: 100%;
    height: 100vh;
    position: absolute;
}
</style>
