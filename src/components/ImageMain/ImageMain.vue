<template>
  <div class="ImageMain" v-loading="loading">
    <el-main>
      <div class="top p-3" style="overflow-x: hidden; overflow-y: scroll">
        <el-row :gutter="20">
          <el-col
            v-for="(item, index) in data.inageList"
            :key="index"
            :span="6"
            style="padding-right: 5px; padding-left: 5px; margin-bottom: 10px"
          >
            <el-card>
              <!-- 图片预览 -->
              <el-image
              class="h-[150px]"
                style="width: 100%;"
                :src="item.url"
                :zoom-rate="1.2"
                :preview-src-list="[item.url]"
                :initial-index="4"
                fit="cover"
              />
              <div class="ImgTitle">
                {{ item.name }}
              </div>

              <div style="padding: 10px">
                <div class="bottom text-green-400 flex justify-center">

                  <el-checkbox-group :model-value="checkbox">
               <el-checkbox :true-label="item.url" false-label="" 
               :label="item.url" size="large" 
               v-if="$route.path !== '/image/list'" 
               @change="changeImg(item.url)">
               <!-- {{ item }} -->
              <br/>
              </el-checkbox>
            </el-checkbox-group>

                  <el-button text type="primary" size="small"
                  @click="handleRename(item.name,item.id)">重命名</el-button>

                  <el-popconfirm
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    title="是否删除该图片?"
                    @confirm="confirmEvent(item)"
                    @cancel="cancelEvent"
                  >
                    <template #reference>
                      <el-button text type="primary" size="small"
                        >删除</el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <div v-if="data.total==0">
          <el-empty description="暂无图片" />
        </div>
      </div>

      <div class="button">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="data.total"
          @current-change="currentChange"
        />
      </div>
    </el-main>
  </div>
</template>
<script setup>
import { getImageList, deleteImage, getHandleRename } from "@/api/image.js";
import { ElMessageBox } from "element-plus";
import { toast } from "@/common/util";

import {
  ref,
  reactive,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
} from "vue";
const data = reactive({
  inageList: [], //图片数据
  total: 0, //总条数
  page: 1, //当前页
  id: 0, //侧边数据 id
});
const emit = defineEmits(["CurrentChange", "uplodOk", "changebox","changeImage"]);
const checkbox = ref([]);
// loading 加载
const loading = ref(false);
const { appContext } = getCurrentInstance();

// 挂载前
onMounted(() => {
  appContext.config.globalProperties.$mitt.on("moneyEvent", (res) => {
    data.id = res;
    init();
  });
});

// 挂载后
onBeforeMount(() => {
  appContext.config.globalProperties.$mitt.off("moneyEvent");
});
loading.value = true;
// 初始化 获取 图片 数据
const init = async () => {
  loading.value = true;
  try {
    let res = await getImageList(data.id, data.page);
    data.inageList = res.data.list;
    data.total = res.data.totalCount;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

// 切换页数
const currentChange = (e) => {
  data.page = e;
  init();
};

// 删除 确认按钮
const confirmEvent = async (item) => {
  try {
    let res = await deleteImage({ ids: [item.id] });
    console.log(res);
    if (res.msg == "ok") {
      init();
      toast("删除成功", "success");
    } else {
      toast(res.msg, "error");
    }
  } catch (error) {
    console.log(error);
  } finally {
  }
};
// 删除 取消按钮
const cancelEvent = () => {
  console.log("取消删除该图片");
};
// 重命名
const handleRename = (name, id) => {
  ElMessageBox.prompt("重命名", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    autofocus: true,
    dangerouslyUseHTMLString: true,
    inputValue: name,
  })
    .then(async ({ value }) => {
      console.log(value, id);
      let res = await getHandleRename(value, id);
      console.log(res);
      if (res.msg == "ok") {
        init();
        toast("重命名成功", "success");
      } else {
        toast(res.msg, "error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const changeImg = (item) => {
  let index = checkbox.value.findIndex((ele) => ele == item);
  if (index > -1) {
    checkbox.value.splice(0, 1); 
  } else if (checkbox.value.length >= 1) {
    toast("最多只能选中1张", "error"); 
  } else {
    console.log(124) 
    emit("changeImage",item)
    checkbox.value.push(item);
  }
};

defineExpose({ init });
</script>

<style lang="scss" scoped>
.ImageMain {
  box-sizing: border-box;
  padding: 10px;
  position: relative;
  width: 100%;
  height: 100%;
}
.top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.button {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
:deep(.el-card) {
  position: relative;
}
.ImgTitle {
  position: absolute;
  top: 122px;
  left: -1px;
  right: -1px;
  --tw-bg-opacity: 1;
  background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
  --tw-bg-opacity: 0.5;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.25rem 0.5rem;
  --tw-text-opacity: 1;
  color: rgba(243, 244, 246, var(--tw-text-opacity));
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
:deep(.el-checkbox.el-checkbox--large) {
  height: 24px !important;
}
</style>
