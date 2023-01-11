import { createRouter, createWebHashHistory } from "vue-router";

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
    component: () => import("@/views/404.vue"),
    hidden: true,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


// 动态路由，用于匹配菜单动态添加路由，包含上面的子路由
const asyncRoutes = [
  {
    path: "/",
    // name值方便hasRoute进行查找
    name: "/",
    component: () => import("@/views/index.vue"),
    meta: {
      title: "后台首页",
    },
  },{
    path: "/goods/list",
    name: "/goods/list",
    component: () => import("@/views/goods/list.vue"),
    meta: {
      title: "商品管理",
    },
  },{
    path: "/category/list",
    name: "/category/list",
    component: () => import("@/views/category/list.vue"),
    meta: {
      title: "分类列表",
    },
  },{
    path:"/skus/list",
    name: "/skus/list",
    component: () => import("@/views/skus/list.vue"),
    meta: {
      title: "规格列表",
    },
  },{
    path: "/coupon/list",
    name: "/coupon/list",
    component: ()=>import("@/views/coupon/list.vue"),
    meta: {
      title: "优惠券列表",
    },
  },{
    path: "/user/list",
    name: "/user/list",
    component: ()=>import("@/views/user/list.vue"),
    meta: {
      title: "用户列表",
    },
  },{
    path: "/level/list",
    name: "/level/list",
    component: ()=>import("@/views/level/list.vue"),
    meta: {
      title: "会员等级",
    },
  },{
    path: "/order/list",
    name: "/order/list",
    component: ()=>import("@/views/order/list.vue"),
    meta: {
      title: "订单列表",
    },
  },{
    path: "/manager/list",
    name: "/manager/list",
    component: ()=>import("@/views/manager/list.vue"),
    meta: {
      title: "管理员管理",
    },
  },{
    path: "/access/list",
    name: "/access/list",
    component: ()=>import("@/views/access/list.vue"),
    meta: {
      title: "权限管理",
    },
  },{
    path: "/role/list",
    name: "/role/list",
    component: ()=>import("@/views/role/list.vue"),
    meta: {
      title: "角色管理",
    },
  },{
    path: "/setting/buy",
    name: "/setting/buy",
    component: ()=>import("@/views/setting/buy.vue"),
    meta: {
      title: "交易设置",
    },
  },{
    path: "/comment/list",
    name: "/comment/list",
    component: ()=>import("@/views/comment/list.vue"),
    meta: {
      title: "评价列表",
    },
  },{
    path: "/image/list",
    name: "/image/list",
    component: ()=>import("@/views/image/list.vue") ,
    meta: {
      title: "图库列表",
    },
  },{
    path: "/notice/list",
    name: "noticelist",
    component: ()=>import("@/views/notice/list.vue"),
    meta: {
      title: "公告列表",
    },
  },{
    path: "/setting/base",
    name: "/setting/base",
    component: ()=>import("@/views/setting/base.vue"),
    meta: {
      title: "配置",
    },
  },{
    path: "/setting/ship",
    name: "/setting/ship",
    component: ()=>import("@/views/setting/ship.vue"),
    meta: {
      title: "物流设置",
    },
  },{
    path: "/distribution/index",
    name: "/distribution/index",
    component: ()=>import("@/views/distribution/index.vue"),
    meta: {
      title: "分销员管理",
    },
  },{
    path: "/distribution/setting",
    name: "/distribution/setting",
    component: ()=>import("@/views/distribution/setting.vue"),
    meta: {
      title: "分销设置",
    },
  },
];

export const addRoutes=async(menus)=>{
    // 首先把你需要动态路由的组件地址全部获取
    // let modules = import.meta.glob('../views/**/*.vue')
    let hasNewRoutes = false;
    const findAndAddRouteByMenus = (arr) => {
    arr.forEach((e) => {
      let item  = asyncRoutes.find((o) => o.path == e.frontpath);
      if (item && !router.hasRoute(item.path)) {
        router.addRoute("home", item);
        hasNewRoutes = true;
      }
      if (e.child && e.child.length > 0) {
        findAndAddRouteByMenus(e.child);
      }
    });
   }
    findAndAddRouteByMenus(menus);
    return hasNewRoutes;
  }