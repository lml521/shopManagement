<template>
  <div>
    <!-- 图库管理 -->
    <el-card class="box-card" >
    <template #header>
      <div class="card-header">
        <el-button type="primary" size="small">新增图片分类</el-button>
        <el-button  type="warning" size="small">上传图片</el-button>
      </div>
    </template>
    <div >
      <el-container style="height: 500px;">
        <!-- 侧边数据 -->
      <ImageAside ref="imageAside"></ImageAside>

      <ImageMain></ImageMain>
    </el-container>
    </div>
  </el-card>
  </div>
</template>

<script setup>
import ImageAside from "@/components/ImageAside/ImageAside.vue"
import ImageMain from "@/components/ImageMain/ImageMain.vue"
import {ref,onMounted} from "vue"
const imageAside=ref(null)
onMounted(()=>{
console.log(imageAside.value,123)
})
</script>

<style lang='scss' scoped>
    :deep(.el-card__body),:deep(.el-main){
      padding: 0 !important;
    }
</style>