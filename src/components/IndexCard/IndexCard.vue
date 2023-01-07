<template>
    <div>
        <el-card shadow="hover">
      <template #header>
        <div class="card-header flex justify-between">
          <span class="text-sm">{{title}}</span>
          <el-tag type="danger" effect="plain">
                    <!-- 后端返回的值 -->
                    {{ tip }}
                </el-tag>
        </div>
      </template>
      <el-row :gutter="20">
    <el-col :span="6" v-for="(item,index) in btns" :key="index">
        <el-card shadow="hover" class="border-0 bg-light-400">
                    <div class="flex flex-column align-center justify-center">
                        <span class="text-xl mb-2">{{ item.value }}</span>
                        <span class="text-xs text-gray-500">{{ item.label }}</span>
                    </div>
                </el-card>
    </el-col>
   
  </el-row>
    </el-card>

    </div>
</template>

<script setup>
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: "1",
  },
  // 提示
  tip: {
    type: String,
    default: "",
  },
  btns: {
    type: Array,
    default: [],
  },
});
</script>

<style lang='scss' scoped>
</style>
