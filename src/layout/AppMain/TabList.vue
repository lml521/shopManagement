<template>
  <div>
    <div
      class="tab-List"
      :style="$store.state.isCollapse ? 'left:64px' : 'left:250px'"
    >
    <div style="min-width: 100px">

   
      <el-tabs
        v-model="$route.path"
        type="card"
        class="flex-1"
        
        @tab-change="TabChange"
        @tab-remove="TabRemove"
      >
        <el-tab-pane
          :closable="item.path != '/'"
          v-for="item in TabsList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    
      <el-dropdown class="tag-btn" @command="handleCommand">
        <div >
          <el-icon>
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeRests">关闭其他</el-dropdown-item>
            <el-dropdown-item command="allClose">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
   
    </div>
    <div style="height: 44px"></div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { watch, reactive } from "vue";
const route = useRoute();
const router = useRouter();
const TabsList = reactive(
  JSON.parse(localStorage.getItem("tabsList")) || [
    { path: "/", title: "后台首页" },
  ]
);
watch(
  route,
  (newVal) => {
    if (newVal.path === "/") return;
    let obj = {
      path: newVal.path,
      title: newVal.meta.title,
    };
    let i = TabsList.findIndex((item) => item.path === obj.path);
    if (i < 0) {
      TabsList.push(obj);
      localStorage.setItem("tabsList", JSON.stringify(TabsList));
    }
  },
  {
    immediate: true,
  }
);
// 切换 tab
const TabChange = (e) => {
  router.push(e);
};
// 关闭tab标签
const TabRemove = (name) => {
  const index = TabsList.findIndex((item) => item.path === name);
  if (route.path === name) {
    if (TabsList.length - 1 === index) {
      router.push(TabsList[TabsList.length - 2].path);
    } else {
      router.push(TabsList[index + 1].path);
    }
  }
  TabsList.splice(index, 1);
  localStorage.setItem("tabsList", JSON.stringify(TabsList));
};

// 关闭其他 全部关闭
const handleCommand=(e)=>{
  let list =[
    { path: "/", title: "后台首页" },
    ]
  if(e=="closeRests"){
    if(route.path=="/"){
      TabsList.splice(1,TabsList.length-1)
      return 
    } 
    let index=TabsList.findIndex((item) =>item.path === route.path);
    TabsList.splice(1,index-1)
    TabsList.splice(2,TabsList.length-1)
  }else{
    TabsList.splice(1,TabsList.length-1)
  }
  localStorage.setItem("tabsList", JSON.stringify(TabsList));
  router.push(route.path)
}
</script>

<style lang="scss" scoped>
.tab-List {
  --tw-bg-opacity: 1;
    background-color: rgba(243,244,246,var(--tw-bg-opacity));
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding: .5rem;
    // padding-right: .5rem;
    position: fixed;
    right: 0px;
    top: 60px;

  right: 0;
  height: 44px;
  z-index: 100;
   
  /* fixed固定，背景颜色浅灰色，flex布局，垂直方向居中 内间距2 */
  @apply fixed bg-gray-100 flex items-center px-2;
  /* 因为头部已经占了64px */
 
  
}
.tag-btn {
  margin-top:-7px ;
  height: 32px;
  /* 背景颜色，圆角 居于最右边 垂直水平居中*/
  @apply bg-white rounded ml-auto flex items-center justify-center px-2;
}

:deep(.el-tabs__header),
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__header) {
  border-radius: 6px;
  margin:0 !important;
}
:deep(.el-tabs__nav-wrap),
:deep(.el-tabs__nav-prev),
:deep(.el-tabs__item),
:deep(.el-tabs__nav-next) {
  height: 32px;
  line-height: 32px;
}
:deep(.el-tabs__item) {
  padding: 0 20px !important;
  margin: 0 4px !important;
  background-color: #fff;
  border-radius: 6px;
}
</style>
