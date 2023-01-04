<!-- 首页侧边栏  -->

<template>
    <div class="AppAside">
    123
    </div>
  </template>
  <script setup>
import { logout } from "@/api/login"; //引入api
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessageBox, ElNotification } from "element-plus";
const store = useStore();
const router = useRouter();

</script>
  
  <style scoped>

</style>