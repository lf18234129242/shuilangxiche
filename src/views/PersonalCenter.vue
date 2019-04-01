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
          to="/haveCarsInfo"
        />
        <van-cell
          class="order"
          title="订单信息"
          icon="1"
          is-link
          to="/orderInfo"
        />
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
      avatar:localStorage.getItem('avatar'),
      userName:localStorage.getItem('userName'),
      userId:localStorage.getItem('userId'),
      phone:'',
      access_token:this.$md5(mdFive.prefix_str + mdFive.access_date + mdFive.api_key)
    }
  },
  mounted(){
    // 获取用户个人信息
    this.httpQuest();
    this.getUserAvatar();
  },
  // 更改数据后重新获取用户个人信息
  activated(){
    this.getUserAvatar()
    let isReload = this.$route.query.isReload;
    if(isReload){
      this.httpQuest()
      this.getUserAvatar()
    }else{
      return false;
    }
  },
  updated(){
  // 微信获取用户 openid -----------------------------------------------------------
    localStorage.setItem('openid',this.$geturlpara.getUrlKey('openid'))
    // 从本地获取用户 头像 名称 等信息
    this.getUserAvatar()
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
    },
    // 从本地获取用户 头像 名称 等信息
    getUserAvatar(){
      this.avatar = localStorage.getItem('avatar');
      this.userName = localStorage.getItem('userName');
      this.userId = localStorage.getItem('userId');
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