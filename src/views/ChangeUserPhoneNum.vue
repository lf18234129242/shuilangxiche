<template>
    <div class="ChangeUserPhoneNum">
        <LoginAndChangePage
            :userPhoneNum='userPhoneNum'
            :verificationCode='verificationCode'
            :disabled="disabled"
            :getVerificationCodeText='getVerificationCodeText'
            buttonText="确认修改"
            @getVerificationCode="getVerificationCode"
            @register="register"
            @sendUserNum="getUserNum"
            @sendVerCode="sendVerCode"
        ></LoginAndChangePage>

    </div>
</template>

<script>
    import {Toast} from 'vant'
    import LoginAndChangePage from '@/components/LoginAndChangePage'
    import url from '@/serviceAPI.config.js'
    import mdFive from '@/md5.js'
    export default {
        name:'ChangeUserPhoneNum',
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

                this.axios.post(url.UpdateClientPhone,{
                    openid:'sjdfhknviahksjfhahkjchvdfhsk',
                    access_token:this.access_token,
                    phone:this.userPhoneNum,
                    code:this.verificationCode,
                    username:'刘员外'
                }).then(() => {
                    Toast('更换成功!')
                    this.$router.push({
                        path:'/personalCenter',
                        query:{
                            isReload:true
                        }
                    })
                }).catch(err => {
                    Toast(`更换失败，请稍后再试！<br> ${err.data}`)
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

<style scoped>
.ChangeUserPhoneNum{
    width: 100%;
    position: absolute;
}
</style>