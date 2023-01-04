import { createRouter, createWebHashHistory } from "vue-router";
// 引入 enum  枚举值
import { keyToken } from "@/enum/user.js";
// 引入element-plus
import { ElNotification } from "element-plus";

import { getinfo } from "@/api/login"; //引入api

import store from "@/store";
// 引入 NProgress  进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 设置页面标题
import getPageTitle from "@/utils/get-page-title";
const routes = [
  // 首页
  {
    path: "/",
    name:"home",
    meta: {
      title: "首页",
    },
    component: () => import("@/views/Home/index.vue"),
    children:[]
  },
  // 登录页面
  {
    name: "login",
    path: "/login",
    meta: {
      title: "登录页",
    },
    component: () => import("@/views/login/index.vue"),
  },
  // 404页面
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/404/index.vue"),
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start();
  const menus = store.state.menus;
  // 设置页面标题
  document.title = getPageTitle(to.meta.title);

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
      if (!menus.length) {
        // 获取用户信息 
        let res = await getinfo();
        if(res.msg==="ok"){
          store.commit('setInfo', res.data)
          store.commit("setMenu", res.data.menus);
          store.commit("setRuleNames", res.data.ruleNames);
        }

        // 首先把你需要动态路由的组件地址全部获取
        let modules = import.meta.glob('../views/**/*.vue')
        console.log(modules,'modules')

        let options = [];
        res.data.menus.forEach((item) => {
          //侧边栏
          let obj = {
            name: item.name,
            path: item.icon,
            icon: item.icon,
            children: [],
          };
          item.child.forEach((each) => {
            obj.children.push({
              name: each.name,
              path: each.frontpath,
              icon: each.icon,
            });
            let eachRoute = {
              path: each.frontpath,
              name: each.desc,
              meta: {
                title: each.name,
              },
               // 然后动态路由的时候这样来取
                component : modules[`../views${each.frontpath}.vue`]
            };
            // 添加路由  home 是 添加到那个 children里面
            router.addRoute("home", eachRoute);
          });
          options.push(obj);
        });
        // 侧边栏
        store.state.routerList = options;

         next(to.path);
      }
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
  NProgress.done();
});

export default router;
