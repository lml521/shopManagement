<template>
    <div class="flex items-center justify-center mt-5">
      <!-- 封装分页 -->
      <el-pagination background layout="prev, pager, next" 
   
      @current-change="handleCurrentChange"
      :current-page="current"
     
      :page-size="pageSize"

      :total="total" ></el-pagination> 
    </div>
  </template>
  <script setup>
  import { reactive, ref } from "vue";
  const props = defineProps({
    // 当前页数
    current:{
        type:  Number  ,
        defalut:1,
    },
    total:{
        type: Number ,
        defalut:0,
    },
    pageSize:{
        type: Number ,
        defalut:10,
    },
  });
  const emit = defineEmits(["handleCurrentChange"]);
const handleCurrentChange=(e)=>{
    emit('handleCurrentChange',e)
}
  </script>
  
  <style lang="scss" scoped></style>
  