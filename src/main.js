import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http/request'
import ElementUI from 'element-ui';
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'

//引入面包屑
import myBread from '@/components/breadcom'
Vue.config.productionTip = false

Vue.component(myBread.name, myBread)


moment.locale('zh-cn')
//创建全局时间过滤器
Vue.filter('date', function (t) {
  return moment(t).format("YYYY-MM-DD h:mm:ss a")
})

Vue.filter('levelFn', function (num) {
  let result = ''
  switch (num) {
    case '0': result = '三级'; break;
    case '1': result = '二级'; break;
    case '2': result = '一级';break;
  }
  return result
})

//定义全局路由守卫
router.beforeEach((to, from, next) => {
  console.log(to)
  const token = localStorage.getItem('token')
  if (to.matched.some(item => item.meta.Authorition)) {
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})


Vue.prototype.$http = http;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
