<template>

    <el-row class="min-h-screen bg-indigo-500 ">

        <!-- 左侧 -->
        <el-col :span="24" :md="12" :lg="16" class="flex align-center justify-center" >
            <div style="width:100%" 
            class="px-10 sm:px-30 d-inline-block flex flex-column align-center justify-center">
              
            <div class="
            sm:text-4xl 
                xl:text-5xl 
                font-bold 
                text-fff leading-tight mb-2">欢迎光临</div>
                <div class="sm:text-sm xl:text-md 
                text-gray-200 
                font-normal" 
                >此站点是《Vue3实战商城后台管理系统开发》视频课程的演示地址，
            <a href="https://study.163.com/course/introduction.htm?courseId=1212775807&_trace_c_p_k2_=d2c1e8125cb54dc586366709b0b2e345" style="color: white; font-weight: bold;">点击立即学习</a></div>
            </div>
        </el-col>

        <!-- 右侧 -->
        <el-col :span="24" :md="12" :lg="8" 
        class="bg-fff flex flex-col align-center justify-center" >
            <div style="width:100%;"
            class=" flex flex-column align-center tac
            justify-center bg-fff">
            <div class="mt-2 text-3xl font-bold text-gray-900">欢迎回来</div>
            <div class="flex align-center justify-center  mt-2 mb-1">
                <div class="w-16 h-px bg-gray"></div>
                <div class=" mx-1 text-ccc">账号密码登录</div>
                <div class="w-16 h-px bg-gray"></div>
            </div>

        <!-- 表单  -->
        <el-form
            style="width:250px"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            class="demo-ruleForm"
            :size="formSize"
        >

            <!-- 用户名 -->
             <el-form-item prop="username">
                 <el-input
                    v-model="ruleForm.username"
                    placeholder="请输入用户名"
                    :prefix-icon="User"
                    />
             </el-form-item>

             <!-- 密码 -->
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" type="password" show-password placeholder="请输入密码">
                <template #prefix>
                    <el-icon><Lock /></el-icon>
                </template>
                </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" class="submitBtn"
               @click="submitForm(ruleFormRef)">
                登 录
              </el-button>
            </el-form-item>
         </el-form>
         </div>
   </el-col>
</el-row>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { User, Lock } from "@element-plus/icons-vue";
import { login } from "@/api/index"; //引入api
import { useStore } from "vuex";
import { ElNotification } from 'element-plus'
const formSize = ref("default");
// import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref();
const route=useRoute()
const router=useRouter()
// 表单双向绑定
const ruleForm = reactive({
  username: "",
  password: "",
});

// 表单验证
const rules = {
  username: { required: true, message: "用户名不能为空", trigger: "blur" },
  password: { required: true, message: "密码不能为空", trigger: "blur" },
};

const store = useStore();

// 登录按钮事件
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let res = await login(ruleForm);
      if(res.data.token!=""){
         store.commit("setToken", res.data.token);
        ElNotification({
          message: '登录成功',
          type: 'success',
        })
        setTimeout(()=>{
        router.push('/')
        },300)
        }
    //     if(!res){
    //         ElNotification({
    //          message: res.msg,
    //          type: 'error',
    //          })
    //   }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped>
.submitBtn {
  width: 100%;
  background-color: #626aef;
  border: 0;
  border-radius: 20px;
}
</style>