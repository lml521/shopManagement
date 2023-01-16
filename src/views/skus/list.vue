<template>
  <div>
    <!-- 规格管理 -->
    <el-card>
      <!-- 头部 添加 按钮 -->
      <i-header-add
        :buttonList="headerButton"
        @handleAdd="handleAdd"
        @handleBatchDelete="handleBatchDelete"
        @init="init"
      >
      </i-header-add>

      <!-- 表格  -->
      <iTable
        v-loading="loading"
        :tableHeader="data.tableHeader"
        :tableData="data.tableData"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @changeStatus="changeStatus"
        @handleSelectionChange="handleSelectionChange"
      >
      </iTable>

      <!-- 抽屉 模态框  -->
      <i-drawer
        :title="data.title"
        v-model="data.drawerShow"
        @handleClose="handleClose"
      >

        <!-- 模态框 内容 表单-->
        <template #content>
          <i-form
            :formList="data.formList"
            :rules="data.rules"
            v-model="fromItem"
            ref="ruleFormRef"
            formSize="default"
            @handelShowButton="handelShowButton"
            @handelShowInput="handelShowInput"
            @handelTabDelete="handelTabDelete"
          >
          </i-form>
         
        </template>

        <!-- 模态框 按钮 -->
        <template #buttons>
          <el-button type="primary" @click="submitForm" :loading="loading"
            >提交</el-button>
          <el-button @click="handleClose">取消</el-button>
        </template>
      </i-drawer>

      <!-- 分页 -->
      <i-pagination
        :current="data.current"
        :total="data.total"
        :pageSize="data.pageSize"
        @handleCurrentChange="handleCurrentChange"
      ></i-pagination>
 
    </el-card>
  </div>
</template>

<script setup>
import iHeaderAdd from "@/components/i-header-add/i-header-add.vue"; //头部 添加 按钮 部分
import iTable from "@/components/i-table/i-table.vue"; //表格
import iDrawer from "@/components/i-drawer/i-drawer.vue"; //模态窗 抽屉
import iForm from "@/components/i-form/i-form.vue"; //表单 
import iPagination from "@/components/i-pagination/i-pagination.vue"; //分页
import { toast } from "@/common/util"; //文字 提示信息
import {
  getTableList,
  getChangeStatus,
  getDelete,
  getAdd,
  getEdit,
  setRules,
} from "@/api/skus.js"; //api
import { reactive, ref } from "vue";

// 添加按钮 部分数据
const headerButton = ref([
  {
    name: "新增",
    event: "handleAdd",
    type: "primary",
    size: "small",
    align: "left",
  },{
    name: "批量删除",
    event: "handleBatchDelete",
    type: "danger",
    size: "small",
    align: "left",

          title: "是否要删除选中记录?",
          confirm: "确认",
          cancel: "取消",
          popconfirm: true,
  },
  {
    icon: "Refresh",
    event: "init",
    class: "ml-auto",
    align: "right",
    tooltip: true,
    content: "刷新数据",
    placement: "top",
  },
]);



// 验证 修改密码 与 确认密码 是否一致
const validatePass2 = (rule, value, callback) => {
  console.log(value,data.formList.TabList)
      return  "规格值必填"
    }

const data = reactive({
  //表格头部数据
  tableHeader: [
    {
      type:"selection",
    },
    {
      prop: "name",
      label: "规格名称",
    },
    {
      prop: "default",
      label: "规格值",
    },
    {},{
      prop: "order",
      label: "排序",
    },
    {
      prop: "status",
      active: 1,
      inactive: 0,
      type: "switch",
      label: "状态",
      width: "120px",
      align: "center",
      event: "changeStatus",
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
          title: "是否要删除改角色?",
          confirm: "确认",
          cancel: "取消",
          size: "small",
          type: "primary",
          text: "primary",
          event: "handleDelete",
          popconfirm: true,
        },
      ],
    },
  ],
  tableData: [], //表格展示数据
  total: 0, //总条数
  title: "新增", //模态框 标题
  pageSize: 10, //每页显示多少条
  current: 1, //当前页数
  drawerShow: false, //抽屉模态框 显示隐藏
  // 表单展示数据
  formList: [
    {
      label: "规格名称",
      prop: "name",
      placeholder: "请填写规格名称",
    },
    {
      label: "排序",
      type: "inputNumber",
      prop: "desc", 
    },
    {
      label: "状态",
      type: "switch",
      prop: "status",
    },
    {
      label: "规格值",
      type: "specification",
      prop: "default",
      // button  属性设置
      buttonTitle:"+ 添加值",
      buttonShow:true,
      buttonSize:"small",
      buttonEvent:"handelShowButton",
      // input 框设置
      inputShow:false,
      inputSize:"small",
      inputWidth:"80px",
      inputEvent:"handelShowInput",

      // tab事件
      tagEvent:"handelTabDelete",
      TabList:[]
    },
  ],
  // 表单验证
  rules: {
    name: {
      required: true,
      message: "规格名称必填",
      trigger: ["blur", "change"],
    },
  }

});


// 模态框 表单 v-model绑定的数据
const fromItem = reactive({
  name:"",
  desc:50,
  status:1,
  default:"",
});

const id = ref(0); //id 点击 当前行 获取 当前行的id
const ruleFormRef = ref(); //模态框表单 ref 
const loading = ref(false); //loading 加载 开关
 
// 获取 表格数据
const init = () => {
  loading.value = true;
  try {
    getTableList(data.current).then((res) => {
      if (res.msg == "ok") {
        data.tableData = res.data.list;
        data.total = res.data.totalCount;
      }
      loading.value = false;
    });
  } catch (error) {
    console.log(error);
  }
};
init();

 
// 表格 修改状态
const changeStatus = async (item) => {
  item.loading=true
  try{
    let res = await getChangeStatus(item.id, item.status);
    if (res.msg == "ok") {
      toast("修改状态成功", "success");
      item.loading=false
    }
  }catch(error){
    item.loading=false
    console.log(error)
  }
};

// 添加表格数据
const handleAdd = () => {
  data.drawerShow = true;
  data.title = "新增";
};
const selectionList=ref([])
// 切换状态
const handleSelectionChange=(e)=>{
  let id ;
  e.forEach(item=>{
    id= item.id
   selectionList.value.push(id)
  })
  console.log(selectionList.value)
}
// 编辑
const handleEdit = (e) => {
  data.drawerShow = true;
  data.title = "修改";

  fromItem.name=e.name
  fromItem.order=e.order
  fromItem.status=e.status

  data.formList[3].TabList=e.default.split(',')
  id.value = e.id
};



// 表单 规格值 按钮 事件
const handelShowButton=()=>{
  data.formList[3].buttonShow=false
  data.formList[3].inputShow=true
}

// 表单 规格值 input 回车 失焦 事件
const handelShowInput=(e)=>{
  if(e){
   data.formList[3].TabList.push(e)
  }
 

  fromItem.default=""
  data.formList[3].buttonShow=true
  data.formList[3].inputShow=false
}
// 表单 中 tab 删除 事件
const handelTabDelete=(id)=>{
  data.formList[3].TabList.splice(id,1)
}

// 批量删除 
const handleBatchDelete=async()=>{
  let res = await getDelete({ids:selectionList.value});
  if (res.msg == "ok") {
    toast("删除成功", "success");
    init();
  }
}

// 删除
const handleDelete = async (e) => {
  let res = await getDelete({ids:[e.id]});
  if (res.msg == "ok") {
    toast("删除成功", "success");
    init();
  }
};

// 模态框 取消 按钮
const handleClose = () => {
  data.drawerShow = false;
     ruleFormRef.value.ruleFormRef.resetFields();
     data.formList[3].TabList=[]
};

// 模态框 提交 按钮
const submitForm = async () => {
  fromItem.default=data.formList[3].TabList.join(',')
  // 使用 ref 获取子组件方法
  await ruleFormRef.value.ruleFormRef.validate((valid, fields) => {

    if (valid) {
      console.log("submit!");
      if (data.title == "新增") {
        handleAddSubmit();
      } else {
        handleEditSubmit();
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 添加 提交 事件
const handleAddSubmit = async () => {
  try {
    let res = await getAdd(fromItem);
    if (res.msg == "ok") {
      toast("新增成功", "success");
      init();
      handleClose();
    }
  } catch (error) {
    console.log(error);
  }
};
 
// 编辑 提交事件
const handleEditSubmit = async () => {
  try {
    let res = await getEdit(id.value, fromItem);
    if (res.msg == "ok") {
      toast("修改成功", "success");
      init();
      handleClose();
    }
  } catch (error) {
    console.log(error);
  }
};

 
// 切换分页 当前页 数据
const handleCurrentChange = (e) => {
  data.current = e;
  init();
};
</script>

<style lang="scss" scoped></style>
