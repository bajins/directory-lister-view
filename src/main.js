import Vue from 'vue'
import './plugins/axios'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import './plugins/iview.js'
import VueI18n from 'vue-i18n';
import iView from 'iview' // 引入iview依赖
import 'iview/dist/styles/iview.css' // 引入iview css样式
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';
import i18n from './i18n'


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

Vue.use(VueI18n);
Vue.use(iView);

Vue.config.lang = 'zh-CN';
Vue.locale('zh-CN', zhLocale);
Vue.locale('en-US', enLocale);
// 注意：使用 vue-i18n 时，需要将本地的语言包和 iView 的语言包合并

new Vue({
    router,
    axios,
    i18n,
    render: h => h(App)
}).$mount('#app')
