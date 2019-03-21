<template>
  <div class="personalCenter">
    <header>
      <div class="avatar">
        <img :src="avatar" alt="">
      </div>
      <p class="user-name">{{userName}}</p>
      <p class="user-id">ID：{{userId}}</p>
    </header>
    <section>
      <van-cell-group>
        <van-cell class="personal" title="个人信息" icon="1" is-link :to="{path: 'personalInformation'}"/>
        <van-cell class="cars" title="拥有车辆信息" icon="1" is-link to=""/>
        <van-cell class="order" title="订单信息" icon="1" is-link to=""/>
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
    <router-link :to="{name: 'personalInformation'}">个人信息</router-link>
  </div>
</template>

<script>
// import {Button} from 'vant'
export default {
  name: 'personalCenter',
  data() {
    return {
      avatar:require('./../assets/logo.png'),
      userName:'刘员外',
      userId:'666666'
    }
  },
  methods: {
    phoneCall(){
      window.location.href = 'tel://4006701818'
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  header{
    width: 100%;
    height: 11.566667rem;
    background: url(./../assets/img/personal-center-bg.jpg) no-repeat center;
    background-size: 100% 11.566667rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar{
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      border: 3px solid #86e1fc;
      margin-top: 1.5rem;
      margin-bottom: .8rem;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-name{
      width: 100%;
      height: 1rem;
      color: #fff;
      font-size: 14px;
      line-height: 1rem;
      text-align: center;
      margin-bottom: .3rem;
    }
    .user-id{
      width: 100%;
      height: .8rem;
      font-size: 12px;
      line-height: 0.8rem;
      text-align: center;
    }
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
