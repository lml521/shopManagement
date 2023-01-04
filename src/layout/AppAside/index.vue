<!-- 首页侧边栏  -->
<template>
    <div class="AppAside">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :default-active="$route.path"
        
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
  console.log(store.getters.getInfo.menus);
  return store.getters.getInfo.menus;
});
</script>
  <style scoped>
</style>