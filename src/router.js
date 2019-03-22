import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   meta:{index:0},
    //   component: Home
    // },
    {
      path: '/login',
      name: 'login',
      meta:{index:1},
      component: () => import('./views/Login.vue')
    },
    {
      path: '/', //个人中心
      name: 'personalCenter',
      meta:{index:2},
      component: () => import('./views/PersonalCenter.vue'),
    },
    {
      path: '/personalInformation',//个人信息
      name: 'personalInformation',
      meta:{index:3},
      component: () => import('./views/PersonalInformation.vue')
    },
    {
      path: '/changeUserPhoneNum',//修改个人信息
      name: 'changeUserPhoneNum',
      meta:{index:4},
      component: () => import('./views/ChangeUserPhoneNum.vue')
    },
    {
      path: '/haveCarsInfo',//拥有车辆信息
      name: 'haveCarsInfo',
      meta:{index:3},
      component: () => import('./views/HaveCarsInfo.vue')
    },
    {
      path: '/addCarsInfo',//添加车辆信息
      name: 'addCarsInfo',
      meta:{index:4},
      component: () => import('./views/AddCarsInfo.vue')
    },
    {
      path: '/orderInfo',//订单信息
      name: 'orderInfo',
      meta:{index:3},
      component: () => import('./views/OrderInfo.vue')
    },
  ]
})
