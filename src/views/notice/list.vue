<template>
  <div>
       <!-- 公告管理 -->
       <el-card>
      <!-- 头部 按钮  -->
      <div class="flex items-center mb-4">

       <el-button type="primary" size="small" @click="handleAdd">新增</el-button>

       <div class="ml-auto"  >
          <el-link class="px-2"  @click="init">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="刷新数据"
            placement="top"
          >
            <el-icon>
              <Refresh />
            </el-icon>
      </el-tooltip>
    </el-link>
       </div>
      </div>

      <!-- 表格  -->
    <iTable   v-loading="loading" :tableHeader="data.tableHeader " :tableData="data.tableData"
     :stripe="data.stripe" @handleEdit="handleEdit" @handleDelete="handleDelete">
  </iTable>
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
      <i-pagination 
      :current="data.current" 
      :total="data.total" 
      :pageSize="data.pageSize" 
      @handleCurrentChange="handleCurrentChange"></i-pagination>
    </el-card>
  </div>
</template>

<script setup>
import iTable from "@/components/i-table/i-table.vue";
import iDrawer from "@/components/i-drawer/i-drawer.vue"; //模态窗
import iForm from "@/components/i-form/i-form.vue"; //表单
import iPagination from "@/components/i-pagination/i-pagination.vue"
import { getTableList, getDelete ,getAdd ,getEdit} from "@/api/notice.js";
import { reactive, ref } from "vue";
import { toast } from "@/common/util";
const data = reactive({
  tableHeader: [
    {
      prop: "title",
      label: "公告标题",
      rowspan: 2,
    },
    {},
    {
      prop: "create_time",
      label: "发布时间",
      width: "380px",
    },
    {
      prop: "button",
      type: "button",
      label: "操作",
      fixed: "right",
      align: "center",
      width: "180px",
      buttons: [
        {
          name: "修改",
          size: "small",
          type: "primary",
          text: "primary",
          event: "handleEdit",
        },
        {
          name: "删除",
          size: "small",
          title:"是否要删除该公告?",
          confirm:"确认",
          cancel:"取消",
          type: "primary",
          text: "primary",
          event: "handleDelete",
          popconfirm: true,
        },
      ],
    },
  ], //表格头部数据
  tableData: [], //表格展示数据
  stripe: false, //表格是否带斑马纹
  
  total: 0,

  title:"新增",
  pageSize: 10, //每页显示条目个数
  current: 1, //当前页数
  activeId: 0,
  drawerShow: false,
 
  // 表单展示数据
  formList: [
    {
      label: "公告标题",
      prop: "title",
      placeholder: "请填写公告标题",
    },
    {
      label: "公告内容",
      type: "textarea",
      prop: "content",
      placeholder: "请填写公告内容",
    },
  ],
  // 表单验证
  rules: {
    title: {
      required: true,
      message: "公告标题必填",
      trigger: ["blur", "change"],
    },
    content: {
      required: true,
      message: "公告内容必填",
      trigger: ["blur", "change"],
    },
  },
});
const id =ref(0)
// 切换分页 当前页 数据
const handleCurrentChange=(e)=>{
  data.current=e
  init()
}

const ruleFormRef=ref()
// 表单v-model绑定的数据
const fromItem = reactive({
  title: "",
  content:"",
});
  
const loading = ref(false);

// 添加表格数据
const handleAdd = () => {
  data.drawerShow=true
  data.title="新增"
};

// 获取 表格数据
const init = () => {
  loading.value = true;
  getTableList(data.current).then((res) => {
    console.log(res);
    if (res.msg == "ok") {
      data.tableData = res.data.list;
      data.total = res.data.totalCount;
    }
    loading.value = false;
  });
};
init();

// 编辑
const handleEdit=(e)=>{
  data.drawerShow=true
  data.title="修改"
  fromItem.title=e.title
  fromItem.content=e.content
  id.value=e.id
}
// 删除
const handleDelete = async (e) => {
  let res = await getDelete(e.id);
  if (res.msg == "ok") {
    toast("删除成功", "success");
    init();
  }
};
// 模态框 取消 按钮
const handleClose = () => {
  data.drawerShow = false;
  ruleFormRef.value.ruleFormRef.resetFields()
};

// 模态框 提交 按钮
const submitForm=async ()=>{
// 使用 ref 获取子组件方法
await ruleFormRef.value.ruleFormRef.validate((valid,fields)=>{
  if(valid){
    console.log('submit!')
    if(data.title=='新增'){
      handleAddSubmit()
    }else{
      handleEditSubmit()
    }
  }else{
    console.log('error submit!',fields)
  }
})
}

// 添加 提交 事件
const handleAddSubmit=async()=>{
  try{
    let res =await getAdd(fromItem)
    console.log(res)
    if(res.msg=="ok"){
      toast("新增成功", "success");
      init()
      handleClose()
    }
  }catch(error){
    console.log(error)
  }
}

// 编辑 提交事件
const handleEditSubmit=async()=>{
  console.log(id.value,fromItem)
  
  try{
    let res =await getEdit(id.value,fromItem)
    console.log(res)
    if(res.msg=="ok"){
      toast("修改成功", "success");
      init()
      handleClose()
    }
  }catch(error){
    console.log(error)
  }
}
</script>

<style lang='scss' scoped>
</style>