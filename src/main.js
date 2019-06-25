import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from 'vue-router'
import iView from 'iview'; // 引入iview依赖
import VueI18n from 'vue-i18n';
import 'iview/dist/styles/iview.css' // 引入iview css样式
import en from 'iview/dist/locale/en-US';
import zh from 'iview/dist/locale/zh-CN';

Vue.use(VueI18n);
Vue.use(iView);
Vue.locale = () => {};
const messages = {
    en: Object.assign({ message: 'hello' }, en),
    zh: Object.assign({ message: '你好' }, zh)
};

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'zh',  // set locale
    messages  // set locale messages
});
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


new Vue({
    router,
    axios,
    i18n,
    render: h => h(App)
}).$mount('#app')
