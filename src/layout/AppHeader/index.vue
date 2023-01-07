<!-- 首页头部  -->
<template>
    <div class="AppHeader">
     <div class="left flex align-center justify-center h-100">
      
        <div class="flex align-center justify-center" style="font-size: 20px;">
            <el-icon >
          <ElemeFilled style="width: 20px; height: 20px;"/>
            </el-icon>
             <div class="ml-1 mr-20">帝莎编程</div>
        </div>

        <div class="flex align-center justify-center"  >
          <div class="px-3 activeTooltip flex align-center "  style="height:60px"
          @click="changeCollapse">
         
          <el-icon>
          <component :is="data.isCollapse?'Expand':'Fold'" style="width: 20px; height:20px;"/>
        </el-icon>
          </div>

          <!-- this.$router.go(0)
               location.reload() -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="刷新"
        placement="bottom"
      >
      <div class="px-3 activeTooltip flex align-center" style="height:60px"
      onclick="javascript:location.reload();">
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
         <a class="px-3 activeTooltip flex align-center "
          target="_blank" href="https://study.163.com/course/introduction.htm?courseId=1212775807&_trace_c_p_k2_=baaf4811eaef465089460c09077d4c58" 
         style="height:60px">
      <el-icon ><VideoCamera /></el-icon>
      </a>
      </el-tooltip>

      <!-- 全屏 退出全屏  -->
     <el-tooltip   placement="bottom"  >
      <template #content>{{screenfullData.title}}</template>
      <div @click="fullscreen" class="showname px-3 activeTooltip flex align-center"  
        style="height:60px">
        <el-icon>
          <component :is="screenfullData.icon" style="width: 20px; height:20px;"/>
        </el-icon>
        </div>
      </el-tooltip>

        <el-dropdown  @command="handleCommand" class="ml-4">
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

      <i-drawer v-model.sync="data.drawerShow" :flag="data.flag" :title="data.title"
      @handleClose="handleClose"
      style="color:#666">
        <template #form>

         <i-form :formList="data.formList" :rules="data.rules" 
         v-model="fromItem" ref="ruleFormRef"> </i-form>
        </template>

        <template #buttons>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="handleClose">取消</el-button>
        </template>
      </i-drawer>
     </div>
    
    </div>
  </template>
  <script setup>
import { reactive, ref } from "vue";
import { logout , updatePassword } from "@/api/login"; //引入api
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessageBox, ElNotification } from "element-plus";
import iDrawer from "@/components/i-drawer/i-drawer.vue"; //模态窗
import iForm from "@/components/i-form/i-form.vue"; //表单
import screenfull from "screenfull"; //引入 全屏

const store = useStore();
const router = useRouter();

// 验证 修改密码 与 确认密码 是否一致
const validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入确认密码'))
      } else if (value !== fromItem.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

const data = reactive({
  isCollapse: false, // 控制侧边栏展开收起
  drawerShow: false, //控制模态框展示
  flag: false,
  title: "修改密码", //模态框 标题
  // 表单展示数据
  formList: [
    {
      label: "旧密码",
      prop: "oldpassword",
      placeholder: "请输入旧密码",
    },
    {
      label: "新密码",
      prop: "password",
      placeholder: "请输入密码",
    },
    {
      label: "确认密码",
      prop: "repassword",
      placeholder: "请输入确认密码",
    },
  ],
  // 表单验证
  rules: {
    oldpassword: {
      required: true,
      message: "旧密码必填",
      trigger:  ["blur", "change"] ,
    },
    password: {
      required: true,
      message: "新密码必填",
      trigger:  ["blur", "change"] ,
    },
    repassword: [{ required: true, validator:validatePass2, trigger:  ["blur", "change"]}],
  },
});
// 表单v-model绑定的数据
const fromItem = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
  })

// 切换 侧边栏 展开 收起
const changeCollapse = () => {
  data.isCollapse = !data.isCollapse;
  store.commit("setIsCollapse", data.isCollapse);
};

// 切换 全屏 、 退出全屏
const screenfullData = {
  title: "全屏",
  icon: "FullScreen",
};
const fullscreen = () => {
  // screenfull.isFullscreen; // 布尔值——当前页面是否全屏   false   true
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


// 修改密码  退出登录
const handleCommand = (e) => {
  console.log(e);
  // 退出
  if (e === "logout") {
    handelLogout();
  } else {
    // 修改密码
    data.drawerShow = true;
  }
};
// 退出
const handelLogout = () => {
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
};
// 模态框 取消 按钮
const handleClose=()=>{
  data.drawerShow = false;
  ruleFormRef.value.ruleFormRef.resetFields()
}
const ruleFormRef=ref()
// 模态框 提交 按钮
const submitForm=async ()=>{
// 使用 ref 获取子组件方法
await ruleFormRef.value.ruleFormRef.validate((valid,fields)=>{
  if(valid){
    console.log('submit!')
    handelUpPassword()
  }else{
    console.log('error submit!',fields)
  }
})
}
// 修改密码
const handelUpPassword= async ()=>{
  await updatePassword(fromItem)
}
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