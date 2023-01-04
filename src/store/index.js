import { createStore } from "vuex";
// 引入 enum  枚举值
import { keyToken, keyInfo } from "@/enum/user.js";
import router from "@/router";
const store = createStore({
  state() {
    return {
      token: localStorage.getItem(keyToken) || "",//token
      info: JSON.parse(localStorage.getItem(keyInfo)) || {},//用户信息
      menus: [], //路由权限
      ruleNames: [], //角色权限
      routerList: [],//侧边栏数据
    };
  },
  getters: {
    // token
    getToken(state) {
      return state.token;
    },
    // info
    getInfo(state) {
      return state.info;
    },
  },
  mutations: {
    // 存储token
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(keyToken, token);
    },
    // 存储用户信息
    setInfo(state, info) {
      state.info = info;
      localStorage.setItem(keyInfo, JSON.stringify(info));
    },
    //路由权限 信息
    setMenu(state,menu){
      console.log('vuex',menu)
      state.menus=menu
    },
    // 角色权限
    setRuleNames(state,ruleNames){
      state.ruleNames=ruleNames
    },

    // 退出登录
    logout(state) {
      state.token = "";
      state.info = {};
      localStorage.clear();
    },
  },
});
export default store;
