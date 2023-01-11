<template>
    <!-- 封装 模态框 -->
    <div>
     <el-dialog
     :model-value="modelValue"
    :title="title"
    :width="width"
    :before-close="handleClose"
  >
    <slot name="content"></slot>
    <template #footer>
      <span class="dialog-footer">

       <el-button :type="item.type"  @click="$emit(item.event)" 
        v-for="item in buttons">{{item.name}}</el-button>

        
      </span>
    </template>
  </el-dialog>   
</div>
  </template>

  <script setup>
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
  width:{
    type: String,
    default: "50%",
  },
  buttons:{
    type: Array,
    default: [],
  },

  //   当使用 number 类型时, 以像素为单位,
  //   当使用 string 类型时, 请传入 'x%', 否则便会以 number 类型解释
  size: {
    type: [String, Number],
    default: "45%",
  },
});

// sync  修改 数据
// let $myemit = defineEmits(["update:modelValue"]);
// const handleClose = () => {
//   $myemit("update:modelValue", false);
// };


</script>
  
  <style lang='scss' scoped>
.el-drawer {
  position: relative;
  .buttons {
    position: absolute;
    bottom: 30px;
    left: 20px;
  }
}
</style>