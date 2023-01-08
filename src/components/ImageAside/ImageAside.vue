<template>
    <div ref="imageAside" >

        <el-aside width="200px" v-loading="loading" >
        <div class="top"  >
            <AsideList   :active="data.activeId== item.id" 
            @click.stop="handleItem(item)"
            @handleEdit="handleEdit(item)" 
            @handleDelete="handleDelete(item.id)"
            v-for="(item,index) in data.nameList" :key="index">
                {{ item.name }}
            </AsideList>
        </div>
        <!-- 分页器 -->
        <div class="button">
            <el-pagination background layout="prev, next" 
            :page-size="data.pageSize" :current-page="data.current" 
            :total="data.totalCount"  @current-change="currentChange"/>
        </div>
        </el-aside>
    </div>
</template>


<script setup>
import { imageNameList } from "@/api/image";
import AsideList from "@/components/AsideList/AsideList.vue";

import { getCurrentInstance, ref ,reactive} from 'vue';

const { appContext } = getCurrentInstance() ;


 
const loading = ref(false);
const data = reactive({
  nameList: [], //总数据
  totalCount: 0, //总条数
  pageSize: 10, //每页显示条目个数
  current: 1, //当前页数
  activeId: 0,
});
// 切换分页器
const currentChange = (e) => {
  console.log(e, 123);
  data.current = e;
  getNameList();
};
let imageAside=ref(null)
// 获取 侧边栏数据
const getNameList = async () => {
  loading.value = true;
  try {
    let res = await imageNameList(data.current);
    if (res.msg == "ok") {
      data.nameList = res.data.list;
      data.totalCount = res.data.totalCount;
      await handleItem(res.data.list[0])
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false;
  }
};
getNameList();
// 切换 每一项
const handleItem=(item)=>{
    data.activeId=item.id
    // data.current=1
    // getNameList()
    appContext.config.globalProperties.$mitt.emit('moneyEvent',item.id);
}
// 修改  
const handleEdit =(item)=>{
    console.log(123,item)
}
// 删除
const handleDelete=(id)=>{
    console.log(id)
}
</script>

<style lang='scss' scoped>


:deep(.el-aside){
    overflow: auto;
    transition: all .2s;
    border-right: 1px solid #eeeeee;
    position: relative !important;
    height: 100%;
}
.top{
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
