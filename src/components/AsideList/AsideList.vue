<template>
  <div class="aside-list" :class="{ active: active }">
    <span class="truncate">
      <slot />
    </span>
    <div style="white-space: nowrap">
      <span class="px-1" @click.stop="$emit('handleEdit')">
        <el-icon color="#409eff">
          <Edit />
        </el-icon>
      </span>

      <span class="px-1">
        <el-popconfirm
          confirm-button-text="确认"
          cancel-button-text="取消"
          title="是否要删除该分类?"
          @confirm="confirmEvent"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-icon color="#409eff">
              <Close />
            </el-icon>
          </template>
        </el-popconfirm>
      </span>
    </div>
  </div>
</template>

<script setup>
// 子传父
const emit = defineEmits(["handleDelete"]);

const props = defineProps({
    // 是否选中高亮
  active: {
    type: Boolean,
    defalut: false,
  },
});
// 删除 确认按钮
const confirmEvent = () => {
  emit("handleDelete");
};
// 删除 取消按钮
const cancelEvent = () => {
  console.log("取消删除该分类");
};
</script>

<style lang="scss" scoped>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.75rem;
  --tw-text-opacity: 1;
  color: rgba(75, 85, 99, var(--tw-text-opacity));
}
.active {
  --tw-bg-opacity: 1;
  background-color: rgba(239, 246, 255, var(--tw-bg-opacity));
}
</style>
