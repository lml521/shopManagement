<!-- 首页侧边栏  -->
<template>
      <template v-for="(item,index) in menuList">
        <!-- {{item.children}} -->
        <el-sub-menu  v-if="item.children && item.children.length > 0" 
          :index="item.path">
          <template #title>
            <el-icon>
                 <component :is="item.icon" style="width: 18px; height:18px; "/>
            </el-icon>
            <span>{{item.name}}</span>
          </template>
          <MenuItem :menuList="item.children"></MenuItem>
         </el-sub-menu>
         <el-menu-item v-if="!item.children"
         :key="index" :index="item.path">
        <template #title>
            <el-icon>
                 <component :is="item.icon" style="width: 18px; height:18px; "/>
            </el-icon>
            <span>{{item.name}}</span>
          </template>
      </el-menu-item>
        </template> 
  </template>
  <script setup>

const props = defineProps({
  menuList: {
    type: Array,
    required: [],
  },
});
</script>
  
  <style scoped>
</style>