<template>
    <div>
      <!-- 封装 Tree 树形控件 -->
      <el-tree :data="tableData" :props="defaultProps"
      node-key="id"
      :accordion="true"
      :default-expanded-keys="defaultShowNodes"
      @node-click="handleNodeClick" >
       <template #default="{ node, data }">
        <span class="custom-tree-node">
            <div>

                <el-tag :type="data.menu==1?'':'info'">{{data.menu==1?'菜单':'权限'}}</el-tag>
                <el-icon style="margin-left:10px;">
                <component :is="data.icon"></component>
            </el-icon>
                <span>{{ node.label }}</span>
            </div>
          <slot name="buttons"></slot>
        </span>
      </template>
        </el-tree>
    </div>
  </template>
  <script setup>
const props = defineProps({
  // 展示数据
  tableData: {
    type: Array,
    default: [],
  },
  // 展示的字段 以及 子数据
  defaultProps: {
    type: Object,
    default: {},
  },
  // 默认打开几级
  defaultShowNodes: {
    type: Array,
    default: [],
  },
});
</script>
  <style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
:deep(.el-tree-node__content) {
  height: 32px !important;
}
</style>