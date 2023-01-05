<template>
    <div>
        <!-- 封装表单 -->
<!-- {{formList}} -->
    <el-form

    :model="modelValue"
    :rules="rules"
    label-width="120px"
    status-icon
  >

  <template v-for="item in formList" >
    <!-- 一般数据 -->
     <el-form-item :label="item.label" :prop="item.prop" >
      <el-input v-model="modelValue[item.prop]" :placeholder="item.placeholder"
      />
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
  const props = defineProps({
    formList:{
        type:Array,
        default:[]
    },
    rules:{
        type:Array,
        default:[]
    },
    modelValue:{
        type:Object,
        default:{}
    }
  })
  </script>
  
  <style lang='scss' scoped>
      
  </style>