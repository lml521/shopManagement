<template>
    <!-- 封装 模态框 -->
    <div>
        <!-- model-value  控制模态框 展示 与收起
            with-header 属性为 false 来控制是否显示标题
         -->
        <el-drawer  :model-value="modelValue" :title="title"  :size="size"
        :close-on-click-modal="false"
        @close="handleClose" class="el-drawer" >
            <slot name="form" ></slot>
            <div class="buttons">
            <slot name="buttons" ></slot>
            </div>
        </el-drawer> 
    </div>
  </template>

  <script setup>
import { defineEmits } from "vue";
const props = defineProps({
  //   标题
  title: {
    type: String,
    default: "",
  },
  //   控制是否显示模态框
  modelValue: {
    type: Boolean,
    default: false,
  },
  flag: {
    type: Boolean,
    default: false,
  },
  //   当使用 number 类型时, 以像素为单位,
  //   当使用 string 类型时, 请传入 'x%', 否则便会以 number 类型解释
  size: {
    type: [String, Number],
    default: "45%",
  },
});

// sync  修改 数据
let $myemit = defineEmits(["update:modelValue"]);
const handleClose = () => {
  $myemit("update:modelValue", false);
};
</script>
  
  <style lang='scss' scoped>
  .el-drawer{
    position: relative;
    .buttons{
        position: absolute;
        bottom: 30px;
        left: 20px;
    }
  }
</style>