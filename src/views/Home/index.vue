<template>
      <!-- 首页 -->
    <div class="common-layout">
    <el-container>
      <el-header > 
      <AppHeader></AppHeader> 
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AppAside></AppAside>
        </el-aside>
        <el-main>
          <AppMain></AppMain>
        </el-main>
      </el-container>
    </el-container>

    <!-- <button class="btn ">按钮</button>
    <button class="btn ">按钮</button>
    <button class="btn hover:( bg-purple-900)">按钮</button> -->
  </div>
</template>


<script setup>

import { useStore } from "vuex";
import {useRouter} from "vue-router"

import AppHeader from "@/layout/AppHeader/index.vue"//首页头部
import AppAside from "@/layout/AppAside/index.vue"//首页侧边栏
import AppMain from "@/layout/AppMain/index.vue"//首页侧边栏
const store = useStore();
const router =useRouter()

</script>

<style scoped lang="scss">
.common-layout,.el-container{
  height: 100%;
  .el-header{
    width: 100%;
  background-color: #4338ca;
  padding: 0;
}
.el-aside{
  height: 100%;
  background-color: pink;
}
.el-main {
  padding:0;
  }
}




</style>