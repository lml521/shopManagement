<template>
  <div>
    <!-- 封装表格 -->
    <el-table :data="tableData" :stripe="stripe" style="width: 100%">
      <template v-for="item in tableHeader"  >
        <!-- 一般数据 -->
        <el-table-column
          v-if="!item.type"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :rowspan="item.rowspan"
          :key="item.prop"
        >
        </el-table-column>
        <!-- userInfo 用户信息 头像  -->
        <el-table-column
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :rowspan="item.rowspan"
          v-else-if="item.type=='userInfo'"
        >
        <template #default="scope">
        <div class="flex items-center">
          <div>
          <el-image class="w-10 h-10 rounded-1/2 border mr-3" 
          :src="scope.row.avatar||'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'" 
          fit="cover"></el-image>
        </div>
        <div>
          <div>{{ scope.row.username }}</div>
          <div>ID:{{ scope.row.id }}</div>
        </div>
      </div>
      </template>
        </el-table-column>

        <!-- 状态 开关  -->
        <el-table-column
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :rowspan="item.rowspan"
          v-else-if="item.type=='switch'"
        >
        <template #default="scope">
          <el-switch
          :active-value="item.active"
          :inactive-value="item.inactive"
           v-model="scope.row[item.prop]"
          @change="$emit(item.event,scope.row.id,scope.row.status)"
        />
      </template>
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
           <!-- {{ ele }} -->
              <el-popconfirm
              :key="ele.name"
                v-if="ele.popconfirm"
                :confirm-button-text="ele.confirm"
                :cancel-button-text="ele.cancel"
                :title="ele.title"
                @confirm="$emit('handleDelete', scope.row)"
 
              >
 {{ ele.title }}
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
