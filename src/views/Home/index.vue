<template>
  <div>
   首页
   <button @click="getLogout">退出</button>
  </div>
</template>


<script setup>
import { logout } from "../../api/index"; //引入api
import { useStore } from "vuex";
import {useRouter} from "vue-router"
import {ElMessageBox,ElNotification } from "element-plus";
const store = useStore();
const router =useRouter()
const getLogout = () => {
  ElMessageBox.confirm("是否要退出登录?", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    let res = await logout();
    if (res.msg == "ok") {
      store.commit("logout");
      ElNotification({
          message: '退出登录成功',
          type: 'success',
        })
        router.push('/login')
    }
  });
};
</script>

<style scoped>
</style>