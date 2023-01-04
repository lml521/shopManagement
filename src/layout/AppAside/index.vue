<!-- 首页侧边栏  -->
<template>
    <div class="AppAside">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :default-active="$route.path"
        router
        unique-opened
      >
      <MenuItem :menuList="menuList"></MenuItem>
      </el-menu>
    </div>
  </template>
  <script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import MenuItem from "./MenuItem.vue"
const store = useStore();
const router = useRouter();
const menuList = computed(() => {
  console.log(store.state.routerList)
  return store.state.routerList;
});
</script>
  <style scoped>
  .AppAside,.el-menu-vertical-demo{
    height: 100%;
  }
</style>