<template>
  <div class="ImageMain" v-loading="loading">
    <el-main >
      <div class="top p-3" style="overflow-x: hidden; overflow-y: scroll">
        <el-row :gutter="20">
          <el-col
            v-for="(item, index) in data.inageList"
            :key="index"
            :span="6"
            style="padding-right: 5px; padding-left: 5px; margin-bottom: 10px"
          >
            <el-card>
              <img
                :src="item.url"
                style="width: 177px; height: 150px"
                class="image"
              />
              <div style="padding: 10px">
                <div class="bottom text-green-400 flex justify-center">
                  <el-button text type="primary" size="small">重命名</el-button>
                  <el-button text type="primary" size="small">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
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
import { getImageList } from "@/api/image.js";
import {
  ref,
  reactive,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
} from "vue";
const data = reactive({
  inageList: [], //图片数据
  total: 0, //
  page: 1,
  id: 0
});
const loading = ref(false);
const { appContext } = getCurrentInstance();
onMounted(() => {
  appContext.config.globalProperties.$mitt.on("moneyEvent", (res) => {
    data.id = res;
    init();
  });
});

onBeforeMount(() => {
  appContext.config.globalProperties.$mitt.off("moneyEvent");
});

const init = async () => {
  loading.value = true;
  try {
    let res = await getImageList(data.id, data.page);
    data.inageList = res.data.list;
    // data.id = res.data.list[0].id;
    data.total = res.data.totalCount;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};


const currentChange = (e) => {
  data.page = e;
  init();
};
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
</style>
