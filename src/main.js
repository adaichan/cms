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
axios.defaults.baseURL =  'http://127.0.0.1:8888/api/private/v1/'
// 将axios挂载到Vue的原型对象上，每一个Vue组件都能通过this访问到$http发ajax请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
