<template>
  <div>
    <el-aside width="200px" v-loading="loading">
      <div class="top">
         <AsideList
          :active="data.activeId == item.id"
          @click.stop="handleItem(item)"
          @handleEdit="handleEdit(item)"
          @handleDelete="handleDelete(item.id)"
          v-for="(item, index) in data.nameList"
          :key="index"
        >
          {{ item.name }}
        </AsideList>
        <i-drawer
        :title="data.title"
        v-model="data.drawerShow"
        @handleClose="handleClose"
      >
        <template #content>
            <i-form
              :formList="data.formList"
              :rules="data.rules"
              v-model="fromItem"
              ref="ruleFormRef"
              formSize="default"
            >
            </i-form>
        </template>

        <template #buttons>
            <el-button type="primary" @click="submitForm" :loading="loading">提交</el-button>
            <el-button @click="handleClose">取消</el-button>
        </template>
      </i-drawer>

      </div>
      <!-- 分页器 -->
      <div class="button">
        <el-pagination
          background
          layout="prev, next"
          :page-size="data.pageSize"
          :current-page="data.current"
          :total="data.totalCount"
          @current-change="currentChange"
        />
      </div>
    </el-aside>
  </div>
</template>

<script setup>
import { imageNameList, deleteName , getName } from "@/api/image";
import AsideList from "@/components/AsideList/AsideList.vue";
import iDrawer from "@/components/i-drawer/i-drawer.vue"; //模态窗
import iForm from "@/components/i-form/i-form.vue"; //表单
import { getCurrentInstance, ref, reactive } from "vue";
import { toast } from "@/common/util"
const { appContext } = getCurrentInstance();
const ruleFormRef = ref(null);
 
// 表单v-model绑定的数据
const fromItem = reactive({
  name: "",
  order: 0,
  id: 0,
  images_count: 0,
});
const loading = ref(false);
const data = reactive({
  nameList: [], //总数据
  totalCount: 0, //总条数
  pageSize: 10, //每页显示条目个数
  current: 1, //当前页数
  activeId: 0,

  drawerShow: false,
  title: "新增",

  // 表单展示数据
  formList: [
    {
      label: "相册名称",
      prop: "name",
      placeholder: "请填写分类名称",
    },
    {
      label: "排序",
      type: "inputNumber",
      prop: "order",
    },
  ],
  // 表单验证
  rules: {
    name: {
      required: true,
      message: "相册名称必填",
      trigger: ["blur", "change"],
    },
  },
});
// 切换分页器
const currentChange = (e) => {
  console.log(e, 123);
  data.current = e;
  getNameList();
};
// 获取 侧边栏数据
const getNameList = async () => {
  loading.value = true;
  try {
    let res = await imageNameList(data.current);
    if (res.msg == "ok") {
      data.nameList = res.data.list;
      data.totalCount = res.data.totalCount;
      await handleItem(res.data.list[0]);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
getNameList();
// 切换 每一项
const handleItem = (item) => {
  data.activeId = item.id;
  appContext.config.globalProperties.$mitt.emit("moneyEvent", item.id);
};
// 修改
const handleEdit = (item) => {
  console.log(123, item);
  fromItem.name=item.name
  fromItem.order=item.order
  fromItem.id= item.id
  fromItem.images_count= item.images_count
  data.drawerShow=true
};

// 模态框 提交 按钮
const submitForm=async()=>{
  // 使用 ref 获取子组件方法
await ruleFormRef.value.ruleFormRef.validate((valid,fields)=>{
  if(valid){
    console.log('submit!')
    handleEditSubmit()
  }else{
    console.log('error submit!',fields)
  }
})
}
// 修改 名字
const handleEditSubmit=async ()=>{
  let res=await getName(fromItem)
  if(res.msg=="ok"){
    getNameList();
    toast("修改成功","success")
    data.drawerShow=false
  }
}

// 模态框 取消 按钮
const handleClose = () => {
  data.drawerShow = false;
};
// 删除
const handleDelete = async (id) => {
  console.log(id);
  try {
    let res = await deleteName(id);
    console.log(res);
    if(res.msg=="ok"){
      getNameList();
      toast("删除成功","success")
    }else{
      toast(res.msg,"error")
    }
  } catch (error) {
    console.log(error);
  } finally {
  }
};

//暴露子组件的方法或者数据  父组件使用 ref 调用子组件 事件
defineExpose({getNameList})
</script>

<style lang="scss" scoped>
:deep(.el-aside) {
  overflow: auto;
  transition: all 0.2s;
  border-right: 1px solid #eeeeee;
  position: relative !important;
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
