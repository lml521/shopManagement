<!-- 首页头部  -->

<template>
    <div class="AppHeader">
     <div class="left flex align-center justify-center">
        <div class="flex align-center justify-center" style="font-size: 20px;">
            <el-icon >
          <ElemeFilled style="width: 20px; height: 20px;"/>
            </el-icon>
             <div class="ml-1">帝莎编程</div>
        </div>
        <div class="flex align-center justify-center">
            <el-icon style="margin: 0 30px 0 60px"><Expand /></el-icon>
        <el-icon class="mr-5"><Refresh /></el-icon>
        </div>
        
     </div>
     <div class="right flex align-center justify-center">
        <el-icon class="mr-5"><VideoCamera /></el-icon>
        <el-icon class="mr-5"><FullScreen /></el-icon>

        <el-dropdown  @command="handleCommand" >
       
        <div class="el-dropdown-link text-fff flex align-center justify-center">
             <img style="width:26px;height:26px;border-radius: 13px;"
        :src="$store.state.info.avatar" />
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
const store = useStore();
const router = useRouter();

const handleCommand = (e) => {
    console.log(e)
    // 退出
    if(e==='logout'){
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
</script>
  
  <style scoped>
.AppHeader {
  height: 100%;
  width: 100%;
  padding: 0 20px 0 50px;
  background-color: #4338ca;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>