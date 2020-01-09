/**
 * 全局注入配置
 * https://cn.vuejs.org/v2/api/
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import routers from './router.js';
import Axios from 'axios';
import App from './App.vue';
import ViewUI from 'view-design'; // 引入view-design依赖
import 'view-design/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import en from 'view-design/dist/locale/en-US';
import zh from 'view-design/dist/locale/zh-CN';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';
import themeConfig from "./themeConfig.js";

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

// Vue.prototype.$themeConfig = themeConfig;
Object.defineProperty(Vue.prototype, '$themeConfig', {
    get: function get() {
        return themeConfig
    }
});

fontawesome.library.add(solid);
fontawesome.library.add(regular);
fontawesome.library.add(brands);

Vue.component('font-awesome-icon', FontAwesomeIcon);

// https://iviewui.com/docs/guide/install
Vue.use(ViewUI);

const i18n = {
    locale: 'zh',  // set locale
    messages: {// set locale messages
        en: Object.assign({message: 'hello'}, en),
        zh: Object.assign({message: '你好'}, zh)
    }
}


Vue.use(VueI18n);


// 1 将所有的主机名和端口 一起设置
Axios.defaults.baseURL = "/home";

//设置请求的headers
Axios.defaults.headers.common['token'] = '';
Axios.defaults.headers.post['Content-type'] = 'application/json';

// 在 vue 中全局注册 这样可以直接使用不使用 Vue.use() 方式
// 将axios挂载到原型上
Object.defineProperty(Vue.prototype, '$axios', {
    get: function get() {
        return Axios
    }
});

// 注入路由
// https://router.vuejs.org/zh/
Vue.use(VueRouter);

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    mode: "history",// 去掉路径中的#
    routers, // (缩写) 相当于 routes: routes
});


// 每个Vue应用都是通过用Vue函数创建一个新的根Vue实例开始的
new Vue({
    i18n,
    router,
    Axios,
    render: h => h(App)
}).$mount('#app');
