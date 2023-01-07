<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="card-header flex justify-between">
          <span class="">订单统计</span>
          <div>
            <el-check-tag
              v-for="(item, index) in options"
              :key="index"
              :checked="current == item.value"
              checked
              style="margin-right: 8px"
              @click="handleChoose(item.value)"
            >
              {{ item.text }}
            </el-check-tag>
          </div>
        </div>
      </template>
      <div  id="chart" style="width: 100%; height: 300px;">
        1
    </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref , onMounted, onBeforeUnmount} from "vue";
// 引入 echarts 图表
import * as echarts from 'echarts';
import { getStatistics3 } from "@/api/index.js"
const current = ref("week");
// myChart先默认为null
var myChart = null
onMounted(() => {
    // 拿到dom
     myChart = echarts.init(document.getElementById('chart'));
    getData()
})

let option = {
        xAxis: {
            type: 'category',
            data: [1,2]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };
function getData() {
    // 获取数据之前loading
    myChart.showLoading()
    // 当前选中的值先传入进来，然后.then拿到数据结果
    getStatistics3({type:current.value}).then(res=>{
    option.xAxis.data=res.data.x
    option.series[0].data=res.data.y
    myChart.setOption(option)
}).finally(() => {
        // 结束调用之后把loading隐藏
        myChart.hideLoading()
    })
}

window.addEventListener("resize", () => {
    myChart.resize();
  });
// 页面被销毁之前
onBeforeUnmount(() => {
    // 调用echarts.dispose()销毁实例
    if (myChart) echarts.dispose(myChart)
})

// 可选标签选项
const options = [
  {
    text: "近一个月",
    value: "month",
  },
  {
    text: "近一周",
    value: "week",
  },
  {
    text: "近24小时",
    value: "hour",
  },
];
// 切换 近一个月 近一周 近24小时 按钮
const handleChoose = (type) => {
  current.value = type;
  getData()
};
</script>

<style lang="scss" scoped></style>
