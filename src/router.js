import Router from 'vue-router';
import Login from './views/login.vue';
import pageComponent from './components/page.vue';
import Vue from "vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/index',
            name: 'index',
            component: pageComponent
        },
        {
            path: '/login',
            name: 'login1',
            component: Login
        },
        {
            path: '/login/${path}',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () => import('./views/login.vue')
            component: Login
        }
    ]
})
