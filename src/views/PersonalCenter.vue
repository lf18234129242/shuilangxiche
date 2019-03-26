<template>
  <div class="personalCenter">
    <PersonalCenterHeader
      :avatar="avatar"
      :userName="userName"
      :userId="userId"
    ></PersonalCenterHeader>
    <section>
      <van-cell-group>
        <van-cell
          class="personal"
          title="个人信息"
          icon="1"
          is-link
          :to="{
            path: '/personalInformation',
            query:{
              phone:phone
            }
          }"
        />
        <van-cell
          class="cars"
          title="拥有车辆信息"
          icon="1"
          is-link
          to="/haveCarsInfo"/>
        <van-cell
          class="order"
          title="订单信息"
          icon="1"
          is-link
          to="orderInfo"/>
      </van-cell-group>
      <van-cell-group>
        <van-cell
          class="customer-service"
          title="客服电话"
          value="400-670-1818"
          icon="1"
          @click="phoneCall"
        />
      </van-cell-group>
    </section>
  </div>
</template>

<script>
import {Toast} from 'vant'
import PersonalCenterHeader from '@/components/PersonalCenterHeader.vue'
import url from '@/serviceAPI.config.js'
import mdFive from '@/md5.js'
export default {
  name: 'personalCenter',
  components:{
    PersonalCenterHeader,
  },
  data() {
    return {
      avatar:require('./../assets/logo.png'),
      userName:'刘员外',
      userId:'666666',
      phone:'',
      access_token:this.$md5(mdFive.prefix_str + mdFive.access_date + mdFive.api_key)
    }
  },
  // 微信获取用户 openid ------------------------------------------------------------------------------------------------------
  // getUrlKey (name){//获取url 参数
    // return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
  // },
  getCodeApi(state){//获取code   
    let urlNow=encodeURIComponent(window.location.href);
    let scope='snsapi_base';    //snsapi_userinfo   //静默授权 用户无感知
    let appid='wx4cc5d5c123123123';
    let url=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
    window.location.replace(url);
  },
  mounted(){
    // let code=this.getUrlKey("code");
    // if(code){
    //   //调用接口获取openId   参考文档https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
    //   this.getOpenIdApi(code).then(res=>{
    //     let openId=res.openId;
    //     alert(openId)
    //     window.location.replace("/#/login");
    //   }).catch(err=>{
    //     alert(err)
    //     window.location.replace("/#/login");
    //   })
    // }else{
    //   this.getCodeApi("123");
    // }
  // 微信获取用户 openid ------------------------------------------------------------------------------------------------------

  // 获取用户个人信息
    this.httpQuest()
  },
  // 更改数据后重新获取用户个人信息
  activated(){
    let isReload = this.$route.query.isReload;
    if(isReload){
      this.httpQuest()
    }else{
      return false;
    }
  },
  methods: {
    phoneCall(){
      window.location.href = 'tel://4006701818'
    },
    httpQuest(){
      this.axios.post(url.getSelfInfo,{
        access_token:this.access_token,
      }).then(res => {
        this.phone = res.data.data.phone
      }).catch(err => {
        Toast(`获取用户个人信息失败！<br> ${err.data}`)
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .personalCenter{
    width: 100%;
    height: 100vh;
    background: #f5f5f5;
    position: absolute;
  }
  section{
    .van-cell-group{
      margin-top: .5rem;
      .van-cell{
        padding: 14px 15px;
      }
      .personal{
        .van-cell__left-icon{
          background: url(./../assets/img/ioc.png) no-repeat -4.1rem -3.9rem;
          background-size: 25rem 19.8rem;
        }
      }
      .cars{
        .van-cell__left-icon{
          background: url(./../assets/img/ioc.png) no-repeat -4.1rem -7.4rem;
          background-size: 25rem 19.8rem;
        }
      }
      .order{
        .van-cell__left-icon{
          background: url(./../assets/img/ioc.png) no-repeat -4.1rem -10.9rem;
          background-size: 25rem 19.8rem;
        }
      }
      .customer-service{
        .van-cell__left-icon{
          background: url(./../assets/img/ioc.png) no-repeat -4.1rem -14.9rem;
          background-size: 25rem 19.8rem;
        }
        .van-cell__value{
          padding-right: 10px;
          color: #000;
        }
      }
    }
  }
</style>
