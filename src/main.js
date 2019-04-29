import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/iview.js'
import iView from 'iview' // 引入iview依赖
import 'iview/dist/styles/iview.css' // 引入iview css样式

Vue.config.productionTip = false

Vue.use(iView) //使用iview组件

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
