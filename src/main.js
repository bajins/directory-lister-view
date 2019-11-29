import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from 'vue-router'
import ViewUI from 'view-design'; // 引入view-design依赖
import VueI18n from 'vue-i18n';
import 'view-design/dist/styles/view-design.css' // 引入view-design css样式
import en from 'view-design/dist/locale/en-US';
import zh from 'view-design/dist/locale/zh-CN';
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import config from "./config.js";

Vue.prototype.config=config;

fontawesome.library.add(solid);
fontawesome.library.add(regular);
fontawesome.library.add(brands);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueI18n);
Vue.use(ViewUI);
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
