import { createRouter, createWebHistory } from "vue-router";
// 引入 enum  枚举值
import { keyToken } from "../enum/user.js";

import { ElNotification } from "element-plus";
const routes = [
  // 首页
  {
    path: "/",
    component: () => import("@/views/Home/index.vue"),
  },
  // 登录页面
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    // 404页面
    name: "404",
    path: "/404",
    component: () => import("@/views/404/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, form, next) => {
  console.log(to, form);
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

export default router;
