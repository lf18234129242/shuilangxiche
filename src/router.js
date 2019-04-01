import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: 'view',
  // scrollBehavior(to,from,savedPosition) {
  //   console.log(to)
  //   console.log(from)
  //   console.log(savedPosition)
  //   if(savedPosition){
  //     return savedPosition;
  //   }else{
  //     return {x:0,y:0};
  //   }
  // },
  routes: [
    {
      path: '/author',
      name: 'author',
      meta:{
        index:1,
        title: '正在授权登陆...',
        auth:true,
      },
      component: () => import('./views/Author.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta:{
        index:1,
        title: '登陆/注册',
        auth:true,
      },
      component: () => import('./views/Login.vue')
    },
    {
      path: '/', //个人中心
      name: '',
      meta:{
        index:2,
        title:'个人中心',
        auth:true,
      },
      component: () => import('./views/PersonalCenter.vue'),
    },
    {
      path: '/personalInformation',//个人信息
      name: 'personalInformation',
      meta:{
        index:3,
        title:'个人信息',
        auth:true,
      },
      component: () => import('./views/PersonalInformation.vue')
    },
    {
      path: '/changeUserPhoneNum',//修改个人信息
      name: 'changeUserPhoneNum',
      meta:{
        index:4,
        title:'修改个人信息',
        auth:true,
      },
      component: () => import('./views/ChangeUserPhoneNum.vue')
    },
    {
      path: '/haveCarsInfo',//拥有车辆信息
      name: 'haveCarsInfo',
      meta:{
        index:3,
        title:'拥有车辆信息',
        auth:true,
      },
      component: () => import('./views/HaveCarsInfo.vue')
    },
    {
      path: '/addCarsInfo',//添加车辆信息
      name: 'addCarsInfo',
      meta:{
        index:4,
        title:'添加车辆信息',
        auth:true,
      },
      component: () => import('./views/AddCarsInfo.vue')
    },
    {
      path: '/changeCarsInfo',//修改车辆信息
      name: 'changeCarsInfo',
      meta:{
        index:4,
        title:'修改车辆信息',
        auth:true,
      },
      component: () => import('./views/ChangeCarsInfo.vue')
    },
    {
      path: '/orderInfo',//订单信息
      name: 'orderInfo',
      meta:{
        index:3,
        title:'订单信息',
        auth:true,
      },
      component: () => import('./views/OrderInfo.vue')
    },
    {
      path: '/placeOrder',  //下单
      name: 'placeOrder',
      meta:{
        index:1,
        title:'下单',
        auth:true,
      },
      component: () => import('./views/PlaceOrder.vue')
    },
    {
      path: '/searchPage',  //搜索 用户拥有车辆
      name: 'searchPage',
      meta:{
        index:3,
        title:'搜索',
        auth:true,
      },
      component: () => import('./views/SearchPage.vue')
    },
    {
      path: '/searchCommunity',  //搜索 小区
      name: 'searchCommunity',
      meta:{
        index:3,
        title:'搜索',
        auth:true,
      },
      component: () => import('./views/SearchCommunity.vue')
    },
    {
      path: '/orderDetails',  //搜索 小区
      name: 'orderDetails',
      meta:{
        index:4,
        title:'搜索',
        auth:true,
      },
      component: () => import('./views/OrderDetails.vue')
    },
  ]
})


    // const position = {}

    // if(to.hash){
    //   position.selector = to.hash;

    //   if (document.querySelector(to.hash)) {
    //     return position
    //   }
    //   return false
    // }
    // return new Promise(resolve => {
    //   // 检查是否有任何匹配的路由配置包含需要滚动到顶部的元数据
    //   if (to.matched.some(m => m.meta.scrollToTop)) {
    //     // 如果未提供选择器，或者选择器与任何元素不匹配，将使用坐标。
    //     position.x = 0
    //     position.y = 0
    //   }

    //   // 等待外转换完成（如有必要）
    //   this.app.$root.$once('triggerScroll', () => {
    //     // 如果解决的位置是假的或空的对象，将保留当前的滚动位置。
    //     resolve(position)
    //   })
    // })