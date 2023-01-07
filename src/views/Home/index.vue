<template>
      <!-- 首页 -->
    <div class="common-layout">
    <el-container>
      <el-header>
      <AppHeader></AppHeader>
      </el-header>
      <el-container>
        <!-- {{ $store.state.isCollapse }} -->
        <el-aside :width="$store.state.isCollapse?'64px':'250px'">
          <AppAside></AppAside>
        </el-aside>
        <el-main>
        <div>
            <TabList></TabList>
        </div>
        
      
         <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>

import { useStore } from "vuex";
import {useRouter} from "vue-router"

import AppHeader from "@/layout/AppHeader/index.vue"//首页头部
import AppAside from "@/layout/AppAside/index.vue"//首页侧边栏
import TabList from "@/layout/AppMain/TabList.vue"//首页侧边栏
</script>

<style scoped lang="scss">
.common-layout,.el-container{
  height: 100%;
  overflow: hidden;
  .el-header{
    width: 100%;
    background-color: #4338ca;
    padding: 0;
}
  .el-aside{
    height: 100%;
    background-color: #fff;
    border-right:1px solid #ccc;
  }
  .el-main{
    
  }
}

.el-aside {
    transition: all 0.2s;
}

/* 进入之前效果 */
.fade-enter-from {
    opacity: 0;
}
/* 进入之后效果 */
.fade-enter-to {
    opacity: 1;
}

/* 离开动画 */
.fade-leave-from {
    opacity: 1;
}

/* 离开之后 */
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}

/* 进入动画时长延迟一下 */
.fade-enter-active {
    transition-delay: 0.3s;
}
</style>