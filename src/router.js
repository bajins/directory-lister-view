/**
 * 路由
 */

import admin from './components/admin.vue';


export default [
    {
        path: '/',
        name: 'page',
        component: () => import(`./components/page.vue`),
        // redirect: "/"
    },
    {
        path: '/admin',
        name: 'admin',
        component: admin
    },
    {
        path: '/indexing',
        name: 'indexing',
        component: resolve => require([`./components/indexing.vue`], resolve)
    },
    {
        path: '/install',
        name: 'install',
        component: resolve => require.ensure([], () => resolve(require(`./components/install.vue`)))
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(`./components/login.vue`)
    }
]
