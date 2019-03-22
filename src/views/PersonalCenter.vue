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
          to="/personalInformation"
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
import PersonalCenterHeader from '@/components/PersonalCenterHeader.vue'
export default {
  name: 'personalCenter',
  components:{
    PersonalCenterHeader,
  },
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
  .personalCenter{
    width: 100%;
    // height: 100vh;
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
