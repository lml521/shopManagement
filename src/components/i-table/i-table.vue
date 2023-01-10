<template>
  <div>
    <!-- 封装表格 -->
    <el-table :data="tableData" :stripe="stripe" style="width: 100%">
      <template v-for="item in tableHeader"  >
        <el-table-column
          v-if="!item.type"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :rowspan="item.rowspan"
          :key="item.prop"
        >
        </el-table-column>

        <!-- 按钮 -->
        <el-table-column 
          v-else-if="item.type == 'button'"
          :label="item.label"
          :fixed="item.fixed"
          :align="item.align"
          :width="item.width"
          :key="item.prop"
        >
          <template #default="scope">

            <template v-for=" ele in item.buttons" >
           
              <el-popconfirm
              :key="ele.name"
                v-if="ele.popconfirm"
                confirm-button-text="确认"
                cancel-button-text="取消"
                title="是否要删除该记录?"
                @confirm="$emit('handleDelete', scope.row)"
 
              >
 
              <!-- @click.native.prevent="$emit(ele.event, scope.row)" -->
                <template #reference>
                  <el-button
                    :size="ele.size"
                    :type="ele.type"
                    link
                  >
                    {{ ele.name }}
                  </el-button>
                </template>
              </el-popconfirm>

              <el-button
                v-else 
                :size="ele.size"
                :type="ele.type" 
                link
                @click.native.prevent="$emit(ele.event, scope.row)"
                >{{ ele.name }}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
const props = defineProps({
  tableHeader: {
    type: Array,
    default: [],
  },
  tableData: {
    type: Array,
    default: [],
  },
  // stripe 可以创建带斑马纹的表格。 如果 true, 表格将会带有斑马纹。
  stripe: {
    type: Boolean,
    default: true,
  },
});



</script>

<style lang="scss" scoped></style>
