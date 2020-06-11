import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http/request'
import ElementUI from 'element-ui';
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'
Vue.config.productionTip = false


moment.locale('zh-cn') 
//创建全局时间过滤器
Vue.filter('date',function (t) {
  return moment(t).format("YYYY-MM-DD h:mm:ss a")
})

Vue.prototype.$http = http;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
