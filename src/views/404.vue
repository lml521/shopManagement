<template>
    <div  class="box">
        <div class="py-8">
        <el-result
        icon="warning"
        title="404提示"
        sub-title="你找的页面走丢了~"
      >
        <template #extra>
          <el-button @click="$router.push('/')" type="primary">返回首页</el-button>
        </template>
      </el-result>
    </div>
</div>
  </template>
  
  <style scoped>
.box {
  height: 100vh;
  background-color: #f3f4f6;
  margin: auto;
}
</style> 
  