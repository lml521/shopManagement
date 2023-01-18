<template>
  <div>
    <!-- 封装表单 -->
    <el-form
      ref="ruleFormRef"
      :model="modelValue"
      :rules="rules"
      label-width="auto"
      status-icon
      :size="formSize"
    >
      <template v-for="(item, index) in formList">

        <!-- 一般数据 -->
        <el-form-item
          v-if="!item.type&&!item.hidden"
          :label="item.label"
          :prop="item.prop"
          :key="index"
          v-bind="item"
        >
          <el-input
            :style="{ width: item.width }"
            :maxlength="item.length"
            v-model="modelValue[item.prop]"
            :placeholder="item.placeholder"
          />
        </el-form-item>

        <!-- 计数器 -->
        <el-form-item
          v-else-if="item.type == 'inputNumber'"
          :label="item.label"
        >
          <el-input-number
            v-model="modelValue[item.prop]"
            :min="1"
            :max="1000"
            @change="handleChange"
          />
        </el-form-item>

        <!-- 带框 的 单选  -->
        <el-form-item
          v-else-if="item.type == 'borderRadio'"
          :label="item.label"
        >
          <el-radio-group v-model="modelValue[item.prop]" 
          @change="$emit(item.event,$event)">
            <el-radio :label="ele.label" :border="ele.border" v-for="ele in item.button">{{ele.value}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 文本域 -->
        <el-form-item
          v-else-if="item.type == 'textarea'"
          :prop="item.prop"
          :label="item.label"
        >
          <el-input
            v-model="modelValue[item.prop]"
            :rows="3"
            type="textarea"
            :placeholder="item.placeholder"
          />
        </el-form-item>

        <!-- 时间 选择 区间 datetimerange -->
        <el-form-item
          v-else-if="item.type == 'datetimerange'"
          :prop="item.prop"
          :label="item.label"
        >
          
        <el-date-picker
      v-model="modelValue[item.prop]"
      type="datetimerange"
      range-separator="To"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    />

        </el-form-item>


        <!-- 上传图片  -->
        <el-form-item
          v-else-if="item.type == 'uploadImg'"
          :prop="item.prop"
          :label="item.label"
        >
          <el-image
            v-if="modelValue[item.prop]"
            fit="cover"
            :src="modelValue[item.prop]"
            class="w-[100px] h-[100px] mb-2 mr-2"
          >
          </el-image>
          <div class="image-btn" @click="$emit(item.event)">
            <el-icon class="el-icon" text-gray-500 style="font-size: 25px">
              <Plus />
            </el-icon>
          </div>
        </el-form-item>

        <!-- 级联选择器  -->
        <el-form-item
          v-else-if="item.type == 'cascader'"
          :prop="item.prop"
          :label="item.label"
        > 
        <el-cascader :options="options"
        :placeholder="item.placeholder"
         :props="defaultParams"
         v-model="modelValue[item.prop]"
         @change="$emit(item.event,$event)"
          />
        </el-form-item>

        <!-- 下拉菜单  -->
        <el-form-item
          v-else-if="item.type == 'select'&&!item.hidden"
          :prop="item.prop"
          :label="item.label"
        >
          <el-select
            v-model="modelValue[item.prop]"
            :placeholder="item.placeholder"
          >
            <el-option
              :label="ele.name"
              :value="ele.id"
              v-for="ele in rolesList"
            >  
          </el-option>
          </el-select>
        </el-form-item>


        <!-- 图标下拉菜单 数据  -->
        <el-form-item
          v-else-if="item.type == 'iconSelect'&&!item.hidden"
          :prop="item.prop"
          :label="item.label">
         <el-icon :size="16" class="mr-3"> 
                <component :is="modelValue[item.prop]"></component>
              </el-icon>
          <el-select
            v-model="modelValue[item.prop]"
            :placeholder="item.placeholder">
            <el-option
              :label="ele.name"
              :value="ele.id"  v-for="ele in rolesList">
            <div class="flex justify-between align-center">
              <el-icon><component :is="ele.name"></component></el-icon>
              <span>{{ele.name}}</span>
            </div>
          </el-option>
          </el-select> 
        </el-form-item>

        <!-- 开关  -->
        <el-form-item
          v-else-if="item.type == 'switch'"
          :prop="item.prop"
          :label="item.label"
        >
          <el-switch
            v-model="modelValue[item.prop]"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>

        <!-- 后面带有按钮 的 表单  -->
      <el-form-item
          v-if="item.type=='inputButton' "
          :label="item.label"
          :prop="item.prop"
          :key="index"
          v-bind="item"
        >
          <el-input
            :style="{ width: item.width }"
            v-model="modelValue[item.prop]"
            :placeholder="item.placeholder"
          >
          <template #append>
              <el-button >{{ item.buttonContent }}</el-button>
          </template>
      </el-input>
        </el-form-item>
        <!-- 添加规格 -->
         <el-form-item
          v-else-if="item.type == 'specification'"
          :prop="item.prop"
          :label="item.label"
        >

        <el-tag
        v-if="item.TabList"
    v-for="(tag,index) in item.TabList"
    class="mx-1 mb-1"
    closable
    @close="$emit(item.tagEvent,index)"
  >
    {{ tag }}
  </el-tag>
        <el-button :size="item.buttonSize"
         v-if="item.buttonShow" @click="$emit(item.buttonEvent)">
          {{item.buttonTitle}} 
        </el-button>
        <el-input v-if="item.inputShow" :size="item.inputSize" 
        v-focus="true"
         v-model="modelValue[item.prop]" :style="{width:item.inputWidth}"
         @blur="$emit(item.inputEvent,modelValue[item.prop])"
         @keyup.native.enter="keyup"
       >
       </el-input>
      
       <!-- 
         回车事件和失焦事件同时触发的问题

         方法一:常见的解决方法就是将回车事件指向当前元素的失焦事件
         @blur="$emit(item.inputEvent,modelValue[item.prop])"
         @keyup.native.enter="$event.target.blur"

      
       -->
        </el-form-item>


      </template>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
const props = defineProps({
  // 表单展示数据
  formList: {
    type: Array,
    default: [],
  },
  // 表单验证
  rules: {
    type: Array,
    default: [],
  },
  // 表单v-model双向绑定数据
  modelValue: {
    type: Object,
    default: {},
  },
  // 表单的大小
  formSize: {
    type: String,
    default: "small",
  },
  // 下拉菜单 展示数据
  rolesList: {
    type: Array,
    default: [],
  },
  // 级联选择器 数据
  options: {
    type: Array,
    default: [],
  },
  defaultParams: {
    type: Object,
    default: {},
  },
  // 是否行内表格
  inline: {
    type: Boolean,
    default: false,
  },
});
const keyup=(e)=>{
  e.target.blur()
}

const ruleFormRef = ref();
/**
 * 这个方法是vue3 3.2+ 版本新增的，
 * 大概意思就是 在 <script setup> 组件中明确要暴露出去的属性，
 * 顾名思义就是把数据导出，供父组件使用，相当于子传父
 */
defineExpose({
  ruleFormRef,
});
</script>

<style lang="scss" scoped>
.image-btn {
  width: 100px;
  height: 100px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px 10px 0;

  &:hover {
    background-color: #f3f4f6;
  }
}
</style>
