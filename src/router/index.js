import { createRouter, createWebHistory } from "vue-router";
// 引入 enum  枚举值
import { keyToken } from "../enum/user.js";
import { ElNotification } from "element-plus";
// 引入 NProgress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


import getPageTitle from '@/utils/get-page-title'
const routes = [
  // 首页
  {
    path: "/",
    meta:{
      title:"首页"
    },
    component: () => import("@/views/Home/index.vue"),
  },
  // 登录页面
  {
    name: "login",
    path: "/login",
    meta:{
      title:"登录页"
    },
    component: () => import("@/views/login/index.vue"),
  },
  // 404页面
  {
    path:'/:catchAll(.*)',
    component: () => import("@/views/404/index.vue"),
    hidden:true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: true, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, form, next) => {
  NProgress.start();

  // 设置页面标题
  document.title=getPageTitle(to.meta.title)
  // 判断是否获取到token  如果获取到  再判断是否 是跳转跳转登录
  if (localStorage.getItem(keyToken)) {
    if (to.path == "/login") {
      next(form.path);
      //请勿重复登录
      ElNotification({
        message: "请勿重复登录",
        type: "error",
      });
    } else {
      next();
    }
  } else {
    if (to.path == "/login") {
      next();
    } else {
      // 请先登录
      next("/login");
      ElNotification({
        message: "请先登录",
        type: "error",
      });
    }
  }
});

router.afterEach(() => {  
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})
export default router;
