import { createRouter, createWebHistory } from 'vue-router'
 
// 开启历史模式
// vue2中使用 mode: history 实现
const routerHistory = createWebHistory();
 
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/home',
            component: () => import('../views/Home/index.vue'),
            
        },
        {
            path: '/contact',
            component: () => import('../views/Contact/index.vue')
        },{
            // 404页面
            name:"404",
            path: '/404',
            component: () => import('../views/404/index.vue')

        }
    ]
})
 
export default router