<template>

     <div class="flex items-center mb-4">
        <template v-for="(item,index) in buttonList">
    <div v-if="item.align=='left'" >
        <template v-if="item.popconfirm&&!item.hidden">
           <el-popconfirm
              :key="item.name"
                 
                :confirm-button-text="item.confirm"
                :cancel-button-text="item.cancel"
                :title="item.title"
                @confirm="$emit(item.event)">
                <template #reference>
                  <el-button
                    :size="item.size"
                    :type="item.type"
                   
                  >
                    {{ item.name }}
                  </el-button>
                </template>
              </el-popconfirm>


    </template>
  <el-button :type="item.type" :size="item.size" v-else-if="!item.hidden"
  class="mr-2"
        @click="$emit(item.event)" >
            {{item.name}}
          </el-button>
</div>
       <div :class="item.class" v-else-if="item.align=='right'"> 
          <el-link class="px-2">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="item.content"
            :placement="item.placement"
          >
          <el-icon @click="$emit(item.event)">
            <component :is="item.icon"/>
        </el-icon>
      </el-tooltip>
    </el-link>
       </div>
    </template>
      </div>

</template>

<script setup>
const props = defineProps({
  // 展示表单数据
  buttonList: {
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
</script>