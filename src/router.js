import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/Index.vue'),
      children: [
        {
          path: '/index/Cooperative',
          name: 'Cooperative',
          meta: { requireAuth: true },
          component: () => import('./views/module/Cooperative.vue'),
        },
        {
          path: '/index/Salesman',
          name: 'Salesman',
          meta: { requireAuth: true },
          component: () => import('./views/module/Salesman.vue'),
        },
        {
          path: '/index/FollowUpMember',
          name: 'FollowUpMember',
          meta: { requireAuth: true },
          component: () => import('./views/module/FollowUpMember.vue'),
        },
      ]
    },

  ]
})
