/**
 * 全局注入配置
 * https://cn.vuejs.org/v2/api/
 */

import Vue from 'vue';
import router from "./router";
import VueI18n from 'vue-i18n';
import App from './App.vue';
import Axios from 'axios';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import en from 'view-design/dist/locale/en-US';
import zh from 'view-design/dist/locale/zh-CN';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';
import themeConfig from "./themeConfig";

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
Axios.defaults.baseURL = "/h";

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


// 每个Vue应用都是通过用Vue函数创建一个新的根Vue实例开始的
new Vue({
    // el: '#app',
    router,
    i18n,
    Axios,
    render: h => h(App)
}).$mount('#app');
