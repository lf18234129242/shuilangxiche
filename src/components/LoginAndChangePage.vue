<template>
    <div class="LoginAndChangePage">
        <div class="logo">
            <img src="./../assets/img/logo.jpg" alt="logo">
        </div>
        <div class="login-input-box">
            <!-- 手机号 -->
            <div class="usernum">
                <li class="icon"></li>
                <input
                    class="phone-num"
                    type="number"
                    max-length="11"
                    placeholder="绑定手机号"
                    v-model="userPhoneNum"
                    @input="sendUserPN"
                >
            </div>
            <!-- 验证码 -->
            <div class="usernum verification-code">
                <div class="verification-input">
                    <li class="icon"></li>
                    <input
                        class="phone-num"
                        type="number"
                        placeholder="请输入验证码"
                        v-model="verificationCode"
                        @input="sendVerificationCode"
                    >
                </div>
                <van-button
                    round
                    size="mini"
                    @click.stop="$emit('getVerificationCode')"
                    :disabled="disabled"
                >{{getVerificationCodeText}}</van-button>
            </div>
            <!-- 登陆 -->
            <van-button
                class="submit-button"
                round
                size="large"
                @click.stop="$emit('register')"
            >{{buttonText}}</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            buttonText:String,
            disabled:Boolean,
            getVerificationCodeText:String,
        },
        data() {
            return {
                userPhoneNum: '',
                verificationCode:'',
            }
        },
        methods: {
            sendUserPN() {
                this.$emit('sendUserNum',this.userPhoneNum)
            },
            sendVerificationCode() {
                this.$emit('sendVerCode',this.verificationCode)
            },
        },
    }
</script>

<style scoped lang="scss">
.scale-1px{
    position: relative;
    border:none;
}
.scale-1px:after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background: #fff;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.cell-padding{
    padding: 1rem .3rem;
    box-sizing: border-box;
}
.icon-size{
    width: 1.1rem;
    height: 1.366667rem;
}
.input-w-h{
    width: 10rem;
    height: 1.5rem;
    background: #00bff3;
    border: none;
    font-size: 1rem;
    margin-left: 1rem;
    color: #fff;
}
.LoginAndChangePage{
    width: 100%;
    height: 100vh;
    background: #00bff3 url(./../assets/img/login-bt-bg.jpg) no-repeat left bottom;
    background-size: 100%;
    box-sizing: border-box;
    position: absolute;
    .logo{
        width: 5.8rem;
        height: 9.933rem;
        position: absolute;
        left: 50%;
        top: 2.2rem;
        margin-left: -2.9rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .login-input-box{
        width: 100%;
        padding: 16.333rem 2.233333rem 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        .usernum{
            width: 100%;
            height: 3.566667rem;
            @extend .scale-1px;
            @extend .cell-padding;
            // display:flex;
            display: -webkit-box;
            .icon{
                @extend .icon-size;
                background: url(./../assets/img/ioc.png) no-repeat -14.6rem -4.4rem;
                background-size: 25rem 19.8rem;
            }
            .phone-num{
                @extend .input-w-h;
            }
        }
        .verification-code{
            // display: flex;
            display: -webkit-box;
            align-content: center;
            justify-content: space-between;
            .verification-input{
                display: flex;
            }
            .icon{
                @extend .icon-size;
                background: url(./../assets/img/ioc.png) no-repeat -14.6rem -7.833333rem;
                background-size: 25rem 19.8rem;
            }
            button{
                font-size: 12px;
                color: #fff;
                background: #00bff3;
                border: 1px solid #fff;
                margin-right: 0.2rem;
                padding: 0 5px;
            }
            .van-button--mini{
                width: auto;
            }
        }
        .submit-button{
            display: inline-block;
            box-sizing: content-box;
            width: 13.8rem;
            height: 2.666667rem;
            border: none;
            background: linear-gradient(#01f8ff, #00ccff);
            background-size: 100%;
            font-size: 1.2rem;
            color: #fff;
            line-height: 2.666667rem;
            margin-bottom: 0;
            margin-top: 4.833333rem;
        }
    }
}
</style>