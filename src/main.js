import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 导入axios
import axios from 'axios'
// 设置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置请求拦截器预处理请求添加token验证，为每一次API请求挂载一个Authorization请求头
axios.interceptors.request.use(config => {
  // console.log(config) 发现里面有headers属性对应请求头
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 规定最后必须return config
  return config
})
// 将axios挂载到Vue的原型对象上，每一个Vue组件都能通过this访问到$http发ajax请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
