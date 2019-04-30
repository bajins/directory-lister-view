import Vue from 'vue'
import './plugins/axios'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import './plugins/iview.js'
import iView from 'iview' // 引入iview依赖
import 'iview/dist/styles/iview.css' // 引入iview css样式


// 1 将所有的主机名和端口 一起设置
axios.defaults.baseURL = "http://localhost:8090";

//设置请求的headers
axios.defaults.headers.common['token'] = ''
axios.defaults.headers.post['Content-type'] = 'application/json'
// axios.defaults.headers.proxy = {
//     host: "http://localhost",
//     port: 8090
// }

// 2 将axios添加到Vue的原型对象中
// 在 vue 中全局注册 这样可以直接使用不使用 Vue.use() 方式
// Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(iView) //使用iview组件

new Vue({
    router,
    axios,
    render: h => h(App)
}).$mount('#app')
