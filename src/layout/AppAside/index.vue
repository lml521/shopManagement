<!-- 首页侧边栏  -->
<template>
  <div>
      <!-- {{$route}} -->
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :default-active="$route.path"
        router
        unique-opened
      >
<a   target="_blank" href="https://study.163.com/course/introduction.htm?courseId=1212775807&_trace_c_p_k2_=baaf4811eaef465089460c09077d4c58" 
         >
      <el-menu-item index="">
        <template #title>
          <el-icon><VideoCamera /></el-icon>
            <span>完整视频教程</span>
          </template>
      </el-menu-item>
    </a>
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
  console.log(store.state.info.menus)
  return store.state.info.menus;
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