/**
 * 路由
 */
import Vue from 'vue';
//Vue路由：引入
import VueRouter from 'vue-router';
// https://router.vuejs.org/zh/
Vue.use(VueRouter);

import admin from './views/admin';
import home from "./views/home";

// https://router.vuejs.org/zh/guide/essentials/nested-routes.html
const routes = [
    // {
    //     path: "*",
    //     redirect: "/indexing"
    // },
    // {
    //     path: "/",
    //     redirect: "/indexing"
    // },
    {
        path: '/',
        name: 'home',
        component: home,
        children: [
            {
                path: '',
                component: () => import("./components/page")
            },
            {
                path: "/indexing",
                component: () => import("./components/indexing")
            },
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        component: admin,
        children: []
    },
    {
        path: '/install',
        name: 'install',
        component: () => import(`./views/install`)
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(`@/views/login`)
    }
]

const createRouter = () => new VueRouter({
    mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: routes
})

const router = createRouter();

// https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router