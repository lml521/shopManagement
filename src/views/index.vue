<template>
    <div>
      <!-- 首页 -->
      <!-- 支付订单 -->

      <el-row :gutter="20">
    <el-col :span="6" v-for="(item,index) in data.panels" :key="index" >
     
      <el-card  >
     <template #header >
      <div class=" flex justify-between">
        <span>{{ item.title }}</span>
        <el-tag :type="item.unitColor" effect="plain">
         {{ item.unit }}
        </el-tag>
      </div> 
    </template>
    <div class="text item">
      <div class="text-3xl font-bold text-gray-500">
        <!-- {{ item.value }} -->
        <count-to :start-val="0" :end-val="item.value" :duration="1500"></count-to>
      </div>
      <el-divider></el-divider>
      <div class="flex justify-between  text-gray-500">
        <span>{{ item.subTitle }}</span>
        <span>{{ item.subValue }}</span>
      </div>
    </div> 
        </el-card >
      </el-col>
    <!-- <el-col :span="6" ><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="6" ><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="6" ><div class="grid-content ep-bg-purple" /></el-col> -->
  </el-row>

    <!-- <div v-for="(item,index) in data.panels" :key="index">1</div> -->
    </div>
  </template>
  <!-- 响应式api ，ref,一个变量响应式，普通类型，
    script里面count.value,template里面直接{{count}}-->

<!-- 响应式api , reactive，用于对象 
    script里面form.count++,template里面直接{{form.count}}-->
  <script setup>
import { ref, reactive } from "vue";
import { statistics1 } from "@/api/index.js";
import CountTo from '@/components/vue-count-to'
const data = reactive({
  panels: [],
});

const info = async () => {
  let res = await statistics1();
  if (res.msg == "ok") {
    data.panels = res.data.panels;
    console.log(data.panels);
  }
};
info();
</script>
  
  <style lang='scss' scoped>
:deep(.el-card__header) {
  --tw-bg-opacity: 1;
  background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
  padding: 0.5rem !important;
}
</style>