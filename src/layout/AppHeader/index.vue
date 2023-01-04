<!-- 首页头部  -->

<template>
    <div class="AppHeader">
     <div class="left flex align-center justify-center h-100">
        <div class="flex align-center justify-center" style="font-size: 20px;">
            <el-icon >
          <ElemeFilled style="width: 20px; height: 20px;"/>
            </el-icon>
             <div class="ml-1 mr-5">帝莎编程</div>
        </div>

        <div class="flex align-center justify-center"  >
          <div class="px-3 activeTooltip flex align-center "  style="height:60px">
             <el-icon ><Expand /></el-icon>
          </div>

     
      <el-tooltip
        class="box-item"
        effect="dark"
        content="刷新"
        placement="bottom"
      >
      <div class="px-3 activeTooltip flex align-center" style="height:60px">
        <el-icon ><Refresh /></el-icon>
       </div>
       </el-tooltip>
     </div>
    </div>



     <div class="right flex align-center justify-center">
        
          <el-tooltip
          class="box-item  activeTooltip"
          effect="dark"
          content="点击查看完整开发教程"
          placement="bottom"
         >
         <div class="px-3 activeTooltip flex align-center "  style="height:60px">
      <el-icon><VideoCamera /></el-icon>
      </div>
      </el-tooltip>
      <!-- 全屏 退出全屏  -->
     <el-tooltip  class="item" placement="bottom">
      <template #content>{{screenfullData.title}}</template>
      <div @click="fullscreen" class="showname px-3 activeTooltip flex align-center"  
        style="height:60px">
          <component :is="screenfullData.icon" style="width: 20px; height:20px;"/>
        </div>
      </el-tooltip>

        <el-dropdown  @command="handleCommand" >
        <div class="el-dropdown-link text-fff flex align-center justify-center">
             <img style="width:26px;height:26px;border-radius: 13px;"
        :src="$store.state.info.avatar||''" />
        <div style="margin-left:5px;">
        {{$store.state.info.username}}</div>
          <el-icon class="el-icon--right  text-fff">
            <arrow-down />
          </el-icon>
        </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
     </div>
    </div>
  </template>
  
  
  <script setup>
import { logout } from "@/api/login"; //引入api
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessageBox, ElNotification } from "element-plus";

import screenfull from "screenfull"; //引入 全屏

const store = useStore();
const router = useRouter();

const screenfullData = {
  title: "全屏",
  icon: "FullScreen",
};

const handleCommand = (e) => {
  console.log(e);
  // 退出
  if (e === "logout") {
    ElMessageBox.confirm("是否要退出登录?", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      let res = await logout();
      if (res.msg == "ok") {
        store.commit("logout");
        ElNotification({
          message: "退出登录成功",
          type: "success",
        });
        router.push("/login");
      }
    });
  }
};
// 切换 全屏 、 退出全屏
const fullscreen = () => {
  // screenfull.isFullscreen; // 布尔值——当前页面是否全屏
  // screenfull.isEnabled; // 布尔值——当前浏览器是否支持全屏
  if (screenfull.isFullscreen) {
    screenfullData.icon = "FullScreen";
    screenfullData.title = "全屏";
  } else {
    screenfullData.title = "退出全屏";
    screenfullData.icon = "Help";
  }
  // 布尔值——当前浏览器是否支持全屏
  if (screenfull.isEnabled) screenfull.toggle();
  console.log(screenfullData.title, screenfullData.icon);
};
</script>
  
  <style scoped lang="scss">
.AppHeader {
  height: 100%;
  width: 100%;
  padding: 0 20px 0 50px;
  background-color: #4338ca;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left,
  .right {
    height: 100%;
  }
}
.activeTooltip {
  color: #fff;
  &:hover {
    background-color: rgba(248, 243, 243, 0.1) !important;
  }
}
.active {
  background-color: #f5f5f5;
}
</style>