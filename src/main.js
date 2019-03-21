import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Button, NavBar, Cell, CellGroup } from 'vant'

Vue.use(Button).use(NavBar).use(Cell).use(CellGroup)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
