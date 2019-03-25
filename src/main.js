import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import md5 from 'js-md5';
import ShadowBox from './components/ShadowBox'
import SubmitButtonBox from './components/SubmitButtonBox'
import {Button, NavBar, Cell, CellGroup, Field, Picker, Popup, Search, Area} from 'vant'

Vue.component('shadow-box',ShadowBox)
Vue.component('submit-button-box',SubmitButtonBox)

Vue.use(Button).use(NavBar).use(Cell).use(CellGroup).use(Field).use(Picker).use(Popup).use(Search).use(Area)

Vue.config.productionTip = false
//把 `axios` 加到 `Vue` 的原型中
Vue.prototype.axios = axios;
Vue.prototype.$md5 = md5;

// 

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
