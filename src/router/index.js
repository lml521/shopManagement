import { createRouter, createWebHistory } from 'vue-router'
 
// 开启历史模式
// vue2中使用 mode: history 实现
const routerHistory = createWebHistory();
 
const router = createRouter({
    history: routerHistory,
    routes: [
        // 首页
        {
            path: '/',
            component: () => import('../views/Home/index.vue'),
        },
        // 登录页面
        {
            name:"login",
            path: '/login',
            component: () => import('../views/login/index.vue')
        },{
            // 404页面
            name:"404",
            path: '/404',
            component: () => import('../views/404/index.vue')

        },
    ]
})
 
export default router