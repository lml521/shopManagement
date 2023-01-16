<template>
  <div>
    <!-- 封装表格 -->
    <el-table
      :data="tableData"
      :stripe="stripe"
      style="width: 100%"
      @selection-change="$emit('handleSelectionChange', $event)"
    >
      <template v-for="item in tableHeader">
        <el-table-column
          v-if="item.type == 'selection' || item.type == 'index'"
          :type="item.type"
          width="55"
        />

        <!-- selection/  -->
        <!-- 一般数据 -->
        <el-table-column
          v-else-if="!item.type && !item.hidden"
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
          v-else-if="item.type == 'userInfo'"
        >
          <template #default="scope">
            <div class="flex items-center">
              <div>
                <el-image
                  class="w-10 h-10 rounded-1/2 border mr-3"
                  :src="
                    scope.row.avatar ||
                    'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
                  "
                  fit="cover"
                ></el-image>
              </div>
              <div>
                <div>{{ scope.row.username }}</div>
                <div>ID:{{ scope.row.id }}</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- 优惠券 部分  -->
        <el-table-column
          :label="item.label"
          :width="item.width"
          v-else-if="item.type == 'coupon'"
        >
          <template #default="{ row }">
            <div
              :class="{ active: froStatus(row) == '领取中' }"
              class="border-dashed border py-2 px-4 rounded w-[330px] bg-gray-50"
            >
              <h5 class="font-bold text-gray-400">{{ row.name }}</h5>
              <div class="text-gray-400 text-xs py-1">
                <span>{{ row.start_time }}</span
                >~<span>{{ row.end_time }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- 优惠券名称 -->
        <el-table-column
          :label="item.label"
          :width="item.width"
          v-else-if="item.type == 'couponStatus'"
        >
          <template #default="{ row }">
            {{ froStatus(row) }}
          </template>
        </el-table-column>

        <!-- 优惠券 满减  -->
        <el-table-column
          :label="item.label"
          :width="item.width"
          v-else-if="item.type == 'preferential'"
        >
          <template #default="{ row }">
            {{ row.type == 0 ? "满减" : "折扣"
            }}{{ row.type == 0 ? "￥" + row.value : row.value + "折" }}
          </template>
        </el-table-column>
        <!-- 优惠券按钮  -->

        <el-table-column
          v-else-if="item.type == 'couponButton'"
          :label="item.label"
          :fixed="item.fixed"
          :align="item.align"
          :width="item.width"
          :key="item.prop"
        >
          <template #default="{ row }">
            <!-- 修改 -->
            <el-button
              v-if="froStatus(row) == '未开始'"
              type="primary"
              size="small"
              text
              @click="$emit('handleEdit', row)"
              >修改</el-button
            >
            <!-- 删除 -->
            <el-popconfirm
              v-if="froStatus(row) != '领取中'"
              title="是否要删除该优惠券？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="$emit('handleDelete', row)"
            >
              <template #reference>
                <el-button type="primary" size="small" text>删除</el-button>
              </template>
            </el-popconfirm>

            <!-- 失效 -->
            <el-popconfirm
              v-if="froStatus(row) == '领取中'"
              title="是否要优惠券失效？"
              confirm-button-text="失效"
              cancel-button-text="取消"
              @confirm="$emit('handleloseEfficacy', row)"
            >
              <template #reference>
                <el-button type="danger"  size="small">失效</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>

        <!-- 状态 开关  -->
        <el-table-column
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :rowspan="item.rowspan"
          v-else-if="item.type == 'switch'"
        >
          <template #default="scope">
            <el-switch
              :loading="scope.row.loading"
              :active-value="item.active"
              :inactive-value="item.inactive"
              v-model="scope.row[item.prop]"
              @change="$emit(item.event, scope.row)"
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
            <template v-for="ele in item.buttons">
              <el-popconfirm
                :key="ele.name"
                v-if="ele.popconfirm"
                :confirm-button-text="ele.confirm"
                :cancel-button-text="ele.cancel"
                :title="ele.title"
                @confirm="$emit('handleDelete', scope.row)"
              >
                <template #reference>
                  <el-button :size="ele.size" :type="ele.type" link>
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

const froStatus = (row) => {
  let text = "领取中";
  let start_time = new Date(row.start_time).getTime(); //开始时间
  let end_time = new Date(row.end_time).getTime(); //结束时间
  let currentTime = new Date().getTime(); //当前时间
  if (currentTime < start_time) {
    text = "未开始";
  } else if (currentTime > end_time) {
    text = "已结束";
  } else if (row.status == 0) {
    text = "已失效";
  }
  return text;
};
</script>

<style lang="scss" scoped>
.active {
  @apply border-red-200 bg-red-50;
}
.active span,
.active div {
  @apply text-red-400;
}
</style>
