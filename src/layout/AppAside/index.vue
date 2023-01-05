<!-- 首页侧边栏  -->
<template>
      <!-- {{$route.path}} -->
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :default-active="$route.path"
        router
        unique-opened
      >
      <MenuItem :menuList="menuList"></MenuItem>
      </el-menu>
  </template>
  <script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import MenuItem from "./MenuItem.vue"
const store = useStore();
const router = useRouter();
// const props = defineProps({
//   isCollapse: {
//     type: Boolean,
//     required: false,
//   },
// });
const isCollapse =computed(()=>{
  return store.state.isCollapse
})


// 侧边栏展示数据
const menuList = computed(() => {
  console.log(store.state.routerList)
  return store.state.routerList;
});


</script>
  <style scoped>
 .el-menu-vertical-demo{
    height: 100% !important;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
</style>