<template>
    <div>
        <!-- 封装表单 -->
<!-- {{formList}} -->
    <el-form
    ref="ruleFormRef"
    :model="modelValue"
    :rules="rules"
    label-width="auto"
    status-icon
    :size="formSize"
  >

  <template v-for="(item,index) in formList" >
    <!-- 一般数据 -->
     <el-form-item v-if="!item.type" :label="item.label" :prop="item.prop" :key="index">
      <el-input v-model="modelValue[item.prop]" :placeholder="item.placeholder"
      />
    </el-form-item> 

    <!-- 计数器 -->
    <el-form-item v-else-if="item.type=='inputNumber'"  
    :label="item.label" >
    <el-input-number v-model="modelValue[item.prop]" :min="1" :max="1000"
     @change="handleChange" />
      </el-form-item>
    </template>

    <!-- <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item> -->

  </el-form>

    </div>
  </template>
  <script setup>
  import { reactive, ref } from "vue";
  const props = defineProps({
    // 表单展示数据
    formList:{
        type:Array,
        default:[]
    },
    // 表单验证
    rules:{
        type:Array,
        default:[]
    },
    // 表单v-model双向绑定数据
    modelValue:{
        type:Object,
        default:{}
    },
    // 表单的大小
    formSize:{
        type:String,
        default:"small"
    }
  })
const ruleFormRef=ref()
/**
 * 这个方法是vue3 3.2+ 版本新增的，
 * 大概意思就是 在 <script setup> 组件中明确要暴露出去的属性，
 * 顾名思义就是把数据导出，供父组件使用，相当于子传父
 */
  defineExpose({
    ruleFormRef
  })
  </script>
  
  <style lang='scss' scoped>
      
  </style>