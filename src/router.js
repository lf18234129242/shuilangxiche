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
      meta:{
        index:1,
        title: '登陆/注册',
        keepAlive: false, // 此组件不需要被缓存
      },
      component: () => import('./views/Login.vue')
    },
    {
      path: '/', //个人中心
      name: 'personalCenter',
      meta:{
        index:2,
        title:'个人中心',
        keepAlive: true, // 此组件需要被缓存
      },
      component: () => import('./views/PersonalCenter.vue'),
    },
    {
      path: '/personalInformation',//个人信息
      name: 'personalInformation',
      meta:{
        index:3,
        title:'个人信息',
        keepAlive: true, // 此组件需要被缓存
      },
      component: () => import('./views/PersonalInformation.vue')
    },
    {
      path: '/changeUserPhoneNum',//修改个人信息
      name: 'changeUserPhoneNum',
      meta:{
        index:4,
        title:'修改个人信息',
        keepAlive: false, // 此组件不需要被缓存
      },
      component: () => import('./views/ChangeUserPhoneNum.vue')
    },
    {
      path: '/haveCarsInfo',//拥有车辆信息
      name: 'haveCarsInfo',
      meta:{
        index:3,
        title:'拥有车辆信息',
        keepAlive: false, // 此组件不需要被缓存
      },
      component: () => import('./views/HaveCarsInfo.vue')
    },
    {
      path: '/addCarsInfo',//添加车辆信息
      name: 'addCarsInfo',
      meta:{
        index:4,
        title:'添加车辆信息',
        keepAlive: false, // 此组件不需要被缓存
      },
      component: () => import('./views/AddCarsInfo.vue')
    },
    {
      path: '/orderInfo',//订单信息
      name: 'orderInfo',
      meta:{
        index:3,
        title:'订单信息',
        keepAlive: false, // 此组件不需要被缓存
      },
      component: () => import('./views/OrderInfo.vue')
    },
    {
      path: '/placeOrder',  //下单
      name: 'placeOrder',
      meta:{
        index:1,
        title:'下单',
        keepAlive: false, // 此组件不需要被缓存
      },
      component: () => import('./views/PlaceOrder.vue')
    },
    {
      path: '/searchPage',  //搜索
      name: 'searchPage',
      meta:{
        index:3,
        title:'搜索',
        keepAlive: false, // 此组件不需要被缓存
      },
      component: () => import('./views/SearchPage.vue')
    },
  ]
})
