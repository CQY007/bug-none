import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { token } from './views/api/api'
import PuzzleVerification from 'vue-puzzle-verification'
import $ from 'jquery'

Vue.use(ElementUI, PuzzleVerification, $)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

  //to指代的是当前循环出来的路由对象
  if (to.meta.requireAuth) {

    //根据token来决定是否能看到管理系统
    // token(localStorage.getItem('token')).then((res) => {
    //   if (res.data == 'ok') {
    //     //用户已登录
    //     next()  //放行
    //   } else next('/') //跳转到登录页面!
    // // })
    if (localStorage.getItem('LG') != '' && localStorage.getItem('LG') == 1) {
      next()
    } else
      next('/')

  } else {
    //没有开启路由验证
    next()  //放行 让他跳转
  }

})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
