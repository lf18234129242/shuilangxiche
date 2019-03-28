import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import md5 from 'js-md5';
import ShadowBox from './components/ShadowBox'
import SubmitButtonBox from './components/SubmitButtonBox'
import {Button, NavBar, Cell, CellGroup, Field, Picker, Popup, Search, Area, Toast} from 'vant'
import url from '@/serviceAPI.config.js'
import mdFive from '@/md5.js'
// 获取url里的参数值
import geturlpara from './geturlpara.js'

Vue.component('shadow-box',ShadowBox)
Vue.component('submit-button-box',SubmitButtonBox)

Vue.use(Button).use(NavBar).use(Cell).use(CellGroup).use(Field).use(Picker).use(Popup).use(Search).use(Area).use(Toast)

Vue.config.productionTip = false
//把 `axios` 加到 `Vue` 的原型中
Vue.prototype.axios = axios;
Vue.prototype.$md5 = md5;
Vue.prototype.$geturlpara = geturlpara 


/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  let access_token = md5(mdFive.prefix_str + mdFive.access_date + mdFive.api_key);
  let fromUrl = '';
  if(from.name == null){
    fromUrl = ''
  }else{
    fromUrl = from.name;
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  console.log('main.js:' + localStorage.getItem('openid'))
  console.log('to.matched:'+ to.matched.some(m => m.meta.auth))
  // 验证所有的页面，是否登录
  // if(to.matched.some(m => m.meta.auth)){
  //   console.log('m.meta.auth')
  //   if(!localStorage.getItem('openid')){
  //     console.log('getItem(openid)')
  //     //访问服务器，如果没有 openid ，去授权获取 openid
  //     axios.post(url.getOauthRedirect,{
  //       access_token:access_token,
  //       redirect_uri:`http://www.ichevip.com/view/index.html${fromUrl}`
  //     }).then(res => {
  //       if(res.data.code == 0){
  //         window.location.href = res.data.data.oauth_url;
  //       }
  //     }).catch(err => {
  //       Toast(`获取授权失败,请重试一次 ${err.data}`)
  //       // 第一次授权失败后的回调
  //       // 如果 openid 失效，重新获取
  //       axios.post(url.getOauthRedirect,{
  //         access_token:access_token,
  //         redirect_uri:`http://www.ichevip.com/view/index.html${fromUrl}`
  //       }).then(res => {
  //         if(res.data.code == 0){
  //           window.location.href = res.data.data.oauth_url;
  //         }
  //       }).catch(err => {
  //         Toast(`获取授权失败,请稍后再试 ${err.data}`)
  //       })
  //     })
  //   }else{
  //     // 获取微信用户名头像
  //     axios.post(url.getClientInfo,{
  //       access_token:access_token,
  //       openid:localStorage.getItem('openid')
  //     }).then(res => {
  //       localStorage.setItem('avatar',res.data.data.wx_headimgurl)
  //       localStorage.setItem('userName',res.data.data.username)
  //       localStorage.setItem('userId',res.data.data.id)
  //     }).catch(err => {
  //       Toast(`获取微信用户名头像失败 ${err.data}`)
  //     })
  //   }
  // }else{
  //   console.log('m.meta.auth--else')
  // }
  next()
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
