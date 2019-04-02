import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import md5 from 'js-md5';
import ShadowBox from './components/ShadowBox'
import SubmitButtonBox from './components/SubmitButtonBox'
import {Button, NavBar, Cell, CellGroup, Field, Picker, Popup, Search, Area, Toast, Step, Steps, PullRefresh} from 'vant'
import url from '@/serviceAPI.config.js'
import mdFive from '@/md5.js'
// 获取url里的参数值
import geturlpara from './geturlpara.js'
// import ScrollPosition from './scroll-position.js'

Vue.component('shadow-box',ShadowBox)
Vue.component('submit-button-box',SubmitButtonBox)

Vue.use(Button).use(NavBar).use(Cell).use(CellGroup).use(Field).use(Picker).use(Popup).use(Search).use(Area).use(Toast).use(Step).use(Steps).use(PullRefresh)

Vue.config.productionTip = false
//把 `axios` 加到 `Vue` 的原型中
Vue.prototype.axios = axios;
Vue.prototype.$md5 = md5;
Vue.prototype.$geturlpara = geturlpara 
// Vue.prototype.$ = $ 


/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  // 保存滚动条位置
  // let from_name = from.path ? from.path : 'name';
  // ScrollPosition.save(from_name);
  // console.log(from_name)
  // console.log(window.pageYOffset)
  // console.log(from_name.window.pageYOffset)
  // console.log(from_name.document.body.scrollTop)
  // console.log(from_name.document.documentElement.scrollTop)

  // access_token
  let access_token = md5(mdFive.prefix_str + mdFive.access_date + mdFive.api_key);

  // 为页面添加标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 验证所有的页面，是否登录
  if(to.matched.some(m => m.meta.auth)){
    if(!localStorage.getItem('openid')){
      // 保存用户进入授权页面之前的页面路径
      localStorage.setItem('beforeLoginUrl',to.name)

      //访问服务器，如果没有 openid ，去授权获取 openid
      axios.post(url.getOauthRedirect,{
        access_token:access_token,
        redirect_uri:`http://www.ichevip.com/view/${to.name}`
      }).then(res => {
        if(res.data.code == 0){
          window.location.href = res.data.data.oauth_url;
        }
      }).catch(err => {
        Toast(`获取授权失败,请重试一次 ${err.data}`)
        // 第一次授权失败后的回调
        // 如果 openid 失效，重新获取
        axios.post(url.getOauthRedirect,{
          access_token:access_token,
          redirect_uri:`http://www.ichevip.com/view/${to.name}`
        }).then(res => {
          if(res.data.code == 0){
            window.location.href = res.data.data.oauth_url;
          }
        }).catch(err => {
          Toast(`获取授权失败,请稍后再试 ${err.data}`)
        })
      })
    }else{
      // 获取微信用户名头像
      axios.post(url.getClientInfo,{
        access_token:access_token,
        openid:localStorage.getItem('openid')
      }).then(res => {
        // if(res.data.code == '1020009'){
        //   next('/login')
        // }else 
        if(res.data.code == '0'){
          localStorage.setItem('avatar',res.data.data.wx_headimgurl)
          localStorage.setItem('userName',res.data.data.username)
          localStorage.setItem('userId',res.data.data.id)
        }
      }).catch(err => {
        Toast(`获取微信用户名头像失败 ${err.data}`)
      })
    }
  }
  next()
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')