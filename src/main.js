import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ShadowBox from './components/ShadowBox'
import SubmitButtonBox from './components/SubmitButtonBox'
import {Button, NavBar, Cell, CellGroup, Field, Picker, Popup,} from 'vant'

Vue.component('shadow-box',ShadowBox)
Vue.component('submit-button-box',SubmitButtonBox)

Vue.use(Button).use(NavBar).use(Cell).use(CellGroup).use(Field).use(Picker).use(Popup)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
