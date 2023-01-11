<template>

<el-form :inline="true" :model="modelValue" 
class="demo-form-inline mb-3" 
label-width="80px" :size="size">
    <el-row :gutter="24">
      <el-col :span="8"  v-for="(item,index) in formList" :key="index">
        <el-form-item :label="item.label" :style="`width:${item.width}`">
          <el-input v-model="modelValue[item.prop]" clearable :placeholder="item.placeholder" :clearable="item.clearable" style="width: 100%;" />
        </el-form-item>
      </el-col>

     
    <el-col :span="8" :offset="offset" >
         <div class="flex items-center justify-end" >
       
          <el-button type="primary"  class="ml-auto" @click="handleSearch" >
          搜索
          </el-button> 
           <el-button @click="handleReset">重置</el-button> 
            <!-- <el-button type="primary" text @click="$emit('isUnfold')" v-if="num>1"> 
            {{ !unfold?'收起':'展开' }}
            <el-icon><component :is="isIcon"/></el-icon>
                </el-button>  -->
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // 展示表单数据
  formList: {
    type: Array,
    default: [],
  },
  modelValue: {
    type: Object,
    default: {},
  },
  size: {
    type: String,
    default: "",
  },

  unfold: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["handleSearch","handleReset"]); 
const handleSearch=()=>{
    console.log('搜索',props.modelValue)
     emit('handleSearch',props.modelValue)
}

const handleReset=()=>{
    handleReset
    emit('handleReset' )
}














const num = computed(() => {
  return props.formList.length;
});
const isIcon = computed(() => {
  return props.unfold ? "ArrowDown" : "ArrowUp";
});
const offset = num.value % 3 == 1 ? 8 : num.value % 3 == 2 ? 0 : 16;
</script>

<style lang="scss" scoped></style>