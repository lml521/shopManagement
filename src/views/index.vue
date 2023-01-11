<template>
  <div  >
    <!-- 首页 -->
    <!-- (支付订单、订单量、销售额、新增用户)组件开发 -->

    <el-row :gutter="20">

       <!-- 只有当内容全部为0的时候，才显示骨架屏 -->
       <template v-if="data.panels.length == 0">
                <!-- 骨架屏 -->
                <el-col :span="6" v-for="i in 4" :key="i">
                    <el-skeleton style="width:100%;" animated loading>
                        <template #template>
                            <!-- 卡片组件 -->
                            <!-- 去掉边框 -->
                            <el-card shadow="hover" class="border-0">
                                <template #header>
                                    <!-- 利用flex布局的左右布局justify-between -->
                                    <div class="flex justify-between">
                                        <!-- 字体大小改为text-sm -->
                                        <el-skeleton-item variant="text"  
                                        style="width: 50%" />
                                        <!-- 后端返回回来的颜色值是unitColor -->
                                        <el-skeleton-item variant="text" 
                                        style="width: 10%" />
                                    </div>
                                </template>
                                <!-- card body -->
                                <!-- 加大字体，加粗，灰色 -->
                                <el-skeleton-item variant="h3" style="width: 80%" />

                                <!-- 分割线 -->
                                <el-divider />
                                <!-- 字体缩小，灰色 -->
                                <div class="flex justify-between text-sm text-gray-500">
                                    <el-skeleton-item variant="text" style="width: 50%" />
                                    <el-skeleton-item variant="text" style="width: 10%" />
                                </div>
                            </el-card>
                            <el-skeleton-item variant="text" style="width: 30%" />
                        </template>
                    </el-skeleton>
                </el-col>
            </template>

      <el-col :span="6" v-for="(item, index) in data.panels" :key="index">
        <el-card shadow="hover">
          <template #header>
            <div class="flex justify-between">
              <span>{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <div class="text item">
            <div class="text-3xl font-bold text-gray-500">
              <!-- 实现数字滚动动画 -->
              <count-to
                :start-val="0"
                :end-val="item.value"
                :duration="1500"
              ></count-to>

            </div>

            <el-divider></el-divider>

            <div class="flex justify-between text-gray-500">
              <span>{{ item.subTitle }}</span>
              <span>{{ item.subValue }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 分类组件开发与跳转 -->
    <IndexNavs></IndexNavs>

    <el-row :gutter="20" class="mt-5">
      <el-col :span="12">
        <IndexChart></IndexChart>
  
    </el-col>
    <el-col :span="12">
      <IndexCard title="店铺及商品提示"
         tip="店铺及商品提示" :btns="data.goods" class="mb-3"/>
        <!-- 交易相关 -->
        <IndexCard title="交易提示" 
        tip="需要立即处理的交易订单" :btns="data.order"/>
      </el-col>
  </el-row>
  </div>
</template>
<!-- 响应式api ，ref,一个变量响应式，普通类型，
    script里面count.value,template里面直接{{count}}-->

<!-- 响应式api , reactive，用于对象 
    script里面form.count++,template里面直接{{form.count}}-->
<script setup>
import { ref, reactive } from "vue";
import { getStatistics1 , getStatistics2 } from "@/api/index.js";
import  CountTo from "@/components/vue-count-to";// 数字滚动动画
import  IndexNavs from "@/components/IndexNavs/IndexNavs.vue";// nav部分
import IndexChart from "@/components/IndexChart/IndexChart.vue"
import IndexCard from "@/components/IndexCard/IndexCard.vue"
const data = reactive({
  panels: [],
  goods:[],
  order:[],
});
// 获取 主控台 头部数据
getStatistics1().then(res=>{
   data.panels = res.data.panels;
})
// 获取 主控台 店铺及商品提示 店铺及商品提示  数据
getStatistics2().then(res=>{
data.goods = res.data.goods;
    data.order = res.data.order;
})

</script>

<style lang="scss" scoped>
:deep(.el-card__header) {
  --tw-bg-opacity: 1;
  background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
  padding: 0.5rem !important;
}
</style>
