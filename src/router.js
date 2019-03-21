import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/PersonalCenter.vue'),
      children: [
        {
          path: 'personalInformation',
          name: 'personalInformation',
          component: () => import('./views/PersonalInformation.vue')
        }
      ]
    },
    // {
    //   path: '/personalInformation',
    //   name: 'personalInformation',
    //   component: () => import('./views/PersonalInformation.vue')
    // }
  ]
})
