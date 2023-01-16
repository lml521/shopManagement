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
        @handleloseEfficacy="handleloseEfficacy"
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
            v-model="fromItem"
            ref="ruleFormRef"
            formSize="default"
            @changeRadio="changeRadio"
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
  getDelete,
  getAdd,
  getEdit,
  getLoseEfficacy,
} from "@/api/coupon.js"; //api
import { reactive, ref } from "vue";

// 添加按钮 部分数据
const headerButton = ref([
  {
    name: "新增",
    event: "handleAdd",
    type: "primary",
    size: "small",
    align: "left",
  } ,
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

const data = reactive({
  //表格头部数据
  tableHeader: [
    {
      type: "coupon",
      width:"350px",
      label: "优惠券名称",
    },
    {
      type:"couponStatus",
      label: "状态",
    },{
      type:"preferential",
      prop: "order",
      label: "优惠",
    },{
      prop: "total",
      label: "发放数量",
    },{
      prop: "used",
      label: "已使用",
    },
    {
      type: "couponButton",
      label: "操作",
      fixed: "right",
      align: "center",
      width: "180px",
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
      label: "优惠券名",
      prop: "name",
      width:"50%",
      placeholder: "请填写优惠券名",
    },
    {
      label: "类型",
      prop: "type",
      type:"borderRadio",
      event: "changeRadio",
      button:[
        {
          value:"满减",
          label:0
        },
        {
          value:"折扣",
          label:1
        }
      ]
    },
    {
      label: "面值",
      width:"50%",
      type: "inputButton",
      prop: "value",
      buttonContent:"元"
    }, {
      label: "发行量",
      type: "inputNumber",
      prop: "total",
    }, {
      label: "最低使用",
      prop: "min_price",
    },{
      label: "排序",
      type: "inputNumber",
      prop: "order",
    },
    {
      label: "活动时间",
      type: "datetimerange",
      prop:"time",
    },{
      label: "描述",
      type: "textarea",
      prop: "desc",
      placeholder: "请填写描述",
    }
  ],
});
// 模态框 表单 v-model绑定的数据
const start_time=ref("")
const end_time=ref("")
const fromItem = reactive({
  name:"",
  type:0,
  value:0,
  total:100,
  min_price:0,
  time:[
    start_time.value,
    end_time.value
  ],
  order:50,
  desc:"",
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


// 添加表格数据
const handleAdd = () => {
  data.drawerShow = true;
  data.title = "新增";
};
const selectionList=ref([])
// 编辑
const handleEdit = (e) => {
  data.drawerShow = true;
  data.title = "修改";
  fromItem.name =e.name
  fromItem.type=e.type
  fromItem.value=e.value
  fromItem.total=e.total,
  fromItem.min_price=e.min_price,
  fromItem.order=e.order,
  fromItem.desc=e.desc,
  fromItem.time=[
    new Date(e.start_time).getTime() ,
    new Date(e.end_time).getTime(),
  ],
  fromItem.name=e.name
  fromItem.order=e.order
  fromItem.status=e.status
  id.value = e.id
};
// 失效
const handleloseEfficacy=async(e)=>{
 let res=await getLoseEfficacy(e.id,{status:e.status})
}
const changeRadio = (e) => {
  fromItem.type = e;
  // 菜单
  if(fromItem.type ==0){
    data.formList[2].buttonContent="元"
  }else{
    data.formList[2].buttonContent="折"
  }
};


// 删除
const handleBatchDelete=async()=>{
  let res = await getDelete({ids:selectionList.value});
  if (res.msg == "ok") {
    toast("删除成功", "success");
    init();
  }
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
     ruleFormRef.value.ruleFormRef.resetFields();
     data.formList[3].TabList=[]
};

// 模态框 提交 按钮
const submitForm = async () => {
  // 使用 ref 获取子组件方法
  await ruleFormRef.value.ruleFormRef.validate((valid, fields) => {
    fromItem.start_time= new Date(fromItem.time[0]).getTime()//开始时间
    fromItem.end_time= new Date(fromItem.time[1]).getTime()//结束时间
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
    fromItem.time=undefined//删除 time 数组
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
