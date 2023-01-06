<!-- 首页侧边栏  -->
<template>
      <template v-for="(item,index) in menuList">
        <!-- {{item.child}} -->
        <el-sub-menu  v-if="item.child && item.child.length > 0" 
          :index="item.name">
          <template #title>
            <el-icon>
                 <component :is="item.icon" style="width: 18px; height:18px; "/>
            </el-icon>
            <span>{{item.name}}</span>
          </template>
          <MenuItem :menuList="item.child"></MenuItem>
         </el-sub-menu>
         <el-menu-item v-if="item.child&&item.child.length<=0"
         :key="index" :index="item.frontpath">
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