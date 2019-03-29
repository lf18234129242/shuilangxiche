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
    import url from '@/serviceAPI.config.js'
    import mdFive from '@/md5.js'
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
                CountdownCount:60,
                access_token:this.$md5(mdFive.prefix_str + mdFive.access_date + mdFive.api_key)
            }
        },
        methods: {
            // 获取验证码
            getVerificationCode(){
                // 判断非空
                if(!(/^1[34578]\d{9}$/.test(this.userPhoneNum))){ 
                    Toast("手机号码有误，请重填"); 
                    return false; 
                } 
                this.axios.post(url.getCode, {
                    access_token:this.access_token,
                    phone:this.userPhoneNum
                }).then(() => {
                    Toast('验证码已发送')
                    // 等待60s后继续获取验证码
                    this.disabled = true;
                    let timer = setInterval(()=>{
                        this.getVerificationCodeText = `${this.CountdownCount--}s后重新获取`;
                        if(this.CountdownCount < 0){
                            clearInterval(timer)
                            this.disabled = false;
                            this.getVerificationCodeText = '获取验证码';
                            this.CountdownCount = 60;
                        }
                    },1000)
                }).catch(err => {
                    Toast(`网络不好，请稍后再试！<br> ${err.data}`)
                })
            },
            // 注册 、 登陆
            register(){
                // 判断非空
                if(!(/^1[34578]\d{9}$/.test(this.userPhoneNum))){ 
                    Toast("手机号码有误，请重填"); 
                    return false; 
                }else if(this.verificationCode.length < 6){
                    Toast('验证码有误！')
                    return false; 
                }
                this.axios.post(url.BindClientPhone,{
                    openid:localStorage.getItem('openid'),
                    access_token:this.access_token,
                    phone:this.userPhoneNum,
                    code:this.verificationCode,
                    username:'刘员外'
                }).then((res) => {
                    if(res.code = '1020009'){
                        window.location.href = res.data.oauth_url
                    }else{
                        this.$router.replace(localStorage.getItem('beforeLoginUrl'))
                    }
                    Toast(`登陆成功`)
                }).catch(err => {
                    Toast(`登陆失败，请稍后再试！<br> ${err.data}`)
                })
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
