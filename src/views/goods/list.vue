<template>
  <div>


    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane :label="item.label" :name="item.name" v-for="(item,index) in tabsList"
     :key="index"></el-tab-pane>
  </el-tabs>

    <!-- 管理员管理 -->
    <el-card>
      <!-- 头部 搜索数据 -->
      <i-header-form
        :formList="RequestList"
        :packup="true"
        :unfold="data.unfold"
        v-model="RequestItem"
        :rolesList="rolesList"
        size="small"
        @isUnfold="isUnfold"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
      >
      </i-header-form>

      <!-- 头部 添加 按钮 -->
      <i-header-add
        :buttonList="headerButton"
        @handleAdd="handleAdd"
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
            :rolesList="rolesList"
            v-model="fromItem"
            ref="ruleFormRef"
            formSize="default"
            @uploadImg="uploadImg"
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

      <!-- 图片 模态框  -->
      <i-dialog
        v-model="dialogList.dialogVisible"
        :title="dialogList.title"
        :width="dialogList.width"
        :buttons="dialogList.buttons"
        @handleCloseImg="handleCloseImg"
        @handleSubmit="handleSubmit"
      >
        <template #content>
          <imageList @changeImage="changeImage"></imageList>
        </template>
      </i-dialog>
    </el-card>
  </div>
</template>

<script setup>
import iHeaderForm from "@/components/i-header-form/i-header-form.vue"; //头部表单 按钮
import iHeaderAdd from "@/components/i-header-add/i-header-add.vue";//头部 添加 按钮 部分
import iTable from "@/components/i-table/i-table.vue"; //表格
import iDrawer from "@/components/i-drawer/i-drawer.vue"; //模态窗 抽屉
import iForm from "@/components/i-form/i-form.vue"; //表单
import iDialog from "@/components/i-dialog/i-dialog.vue";// 模态框  对话框
import iPagination from "@/components/i-pagination/i-pagination.vue"; //分页
import imageList from "@/views/image/list.vue"; // 图片 模态框  页面
import {watch} from "vue"
import { toast } from "@/common/util";//文字 提示信息
import {
  getTableList,
   
} from "@/api/goods.js"; //api
import { reactive, ref } from "vue";


// 头部表单 按钮  展示数据
const RequestList = ref([
  {
    label: "关键词",
    prop: "title",
    placeholder: "请填写商品名称",
    width: "100%",
  },{
    label: "商品分类",
    prop: "category_id",
    type: "select",
    hidden:true,
    placeholder: "请填写商品管理",
    width: "100%",
  }
]);
// 头部 表单 v-model 绑定的数据
const RequestItem = ref({
  tab:"all",
  title: "",
  category_id:"",
});

// 添加按钮 部分数据
const headerButton = ref([
  {
    name: "新增",
    event: "handleAdd",
    type: "primary",
    size: "small",
    align: "left",
    hidden: false,
  },
  {
    name: "批量删除",
    event: "handleAdd",
    type: "danger",
    size: "small",
    align: "left",
    hidden:false ,
  },{
    name: "上架",
    event: "handleAdd",
    size: "small",
    align: "left",
    hidden: false,
  },{
    name: "下架",
    event: "handleAdd",
    size: "small",
    align: "left",
    hidden:false ,
  },{
    name: "恢复商品",
    event: "handleAdd",
    type:"warning",
    size: "small",
    align: "left",
    hidden:true ,
  },{
    name: "彻底删除",
    event: "handleAdd",
    size: "small",
    align: "left",
    hidden:true ,
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

// 头部 tab 数据 
const tabsList =ref([
  {
    label:"全部",
    name:"all",
  },
  {
    label:"审核中",
    name:"checking",
  },
  {
    label:"出售中",
    name:"saling",
  },{
    label:"已下架",
    name:"off",
  },{
    label:"库存预警",
    name:"min_stock",
  },{
    label:"回收站",
    name:"delete",
  },

])

// 头部 tab 绑定数据 
const activeName=ref("all")

const handleClick=(e)=>{
  console.log(e)
}

const isHidden=(num,num1)=>{
  num.forEach(item=>{
    headerButton.value[item].hidden=false

  })
  num1.forEach(item=>{
    headerButton.value[item].hidden=true

  })
}

watch(()=>activeName.value,(newVal)=>{
  switch(newVal){
    case 'all':
      isHidden([0,1,2,3],[4,5])
      init()
    break;
    case 'checking':
     isHidden([0,1],[2,3,4,5])
     init()
     break;
     case 'saling':
     isHidden([0,1,3],[2,4,5])
     init()
     break;
     case 'off':
     isHidden([0,1,2],[3,4,5])
     init()
     break;
     case 'min_stock':
     isHidden([0,1],[2,3,4,5])
     init()
     break;
     case 'delete':
     isHidden([0,4,5],[2,3])
     init()
     break;
     default:
      break;
  }
})


const data = reactive({
  //表格头部数据
  tableHeader: [
    {
    type:"selection"
  },
    {
      type: "goodsInfo",
      label: "商品",
      width: "300px",
    },
    
    {
      prop: "sale_count",
      label: "实际销量",
      align: "center",
    },
    {
      prop: "status",
      type:"tag",
      label: "商品状态",
      align: "center",
      tagList:{
        type1:"success",
        text1:"上架",
        type2:"danger",
        text2:"仓库"
      }
    },{
      prop: "ischeck",
      type:"ischeck",
      label: "审核状态",
      align: "center",
      width:"120px"
    },{
      prop: "stock",
      label: "总库存",
      align: "center",
    },
    {
      type: "button",
      label: "操作",
      fixed: "right",
      align: "center",
      width: "390px",
      buttons: [
        {
          name: "修改",
          size: "small",
          type: "primary",
          text: "primary",
          event: "handleEdit",
        },{
          name: "商品规格",
          size: "small",
          type: "primary",
          text: "primary",
          event: "handleEdit",
        },{
          name: "设置轮播图",
          size: "small",
          type: "primary",
          text: "primary",
          event: "handleEdit",
        },{
          name: "商品详情",
          size: "small",
          type: "primary",
          text: "primary",
          event: "handleEdit",
        },
        {
          type: "primary",
          text: true,
          name: "删除",
          popconfirm: true,
          size: "small",
          title: "是否要删除该商品？",
          confirm:"确认",
          cancel:"取消"
        },
      ],
  }
  ],
  tableData: [], //表格展示数据
  unfold:true,
  total: 0,//总条数
  title: "新增",//模态框 标题
  pageSize: 10, //每页显示多少条
  current: 1, //当前页数
  drawerShow: false,//抽屉模态框 显示隐藏

  // 表单展示数据
  formList: [
    {
      label: "用户名",
      prop: "username",
      placeholder: "请填写用户名",
    },
    {
      label: "密码",
      prop: "password",
      placeholder: "请填写密码",
    },
    {
      label: "头像",
      type: "uploadImg",
      event: "uploadImg",
      prop: "avatar",
      placeholder: "请填写密码",
    },
    {
      label: "所属角色",
      type: "select",
      prop: "role_id",
      placeholder: "请填写密码",
    },
    {
      label: "状态",
      type: "switch",
      prop: "status",
    },
  ],
});

// 模态框 对话框 数据
const dialogList = reactive({
  dialogVisible: false,//对话框 展示隐藏
  title: "选择图片",//对话框 标题
  width: "80%",//对话框 宽度
  // 对话框 底部按钮 数据
  buttons: [
    {
      name: "取消",
      event: "handleCloseImg",
    },
    {
      type: "primary",
      event: "handleSubmit",
      name: "确定",
    },
  ],
});

// 模态框 表单 v-model绑定的数据
const fromItem = reactive({
  username: "",
  password: "",
  avatar: "",
  role_id: "",
  status: 1,
});

const rolesList = ref([]);// 表单中 下拉菜单 展示 数据
const id = ref(0);//id 点击 当前行 获取 当前行的id
const ruleFormRef = ref(); //模态框表单 ref
const url = ref();// 点击 选中的图片 路径  
const loading = ref(false);//loading 加载 开关

// 获取 表格数据
const init = () => { 
  loading.value = true; 
  try {
    getTableList(data.current,{tab:activeName.value}).then((res) => {
      if (res.msg == "ok") { 
        rolesList.value=res.data.cates
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

// 头部搜索事件
const handleSearch = async (e) => {
  loading.value = true;
  data.current = 1;
  try {
    let res = await getSearch(data.current, e.title);
    if (res.msg == "ok") {
      data.tableData = res.data.list;
      data.total = res.data.totalCount;
    }
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};
// 头部展开收起
const isUnfold=()=>{
  data.unfold=!data.unfold
  RequestList.value[1].hidden=!RequestList.value[1].hidden
}

// 头部 重置 事件
const handleReset = () => {
  init();
  for (let i in RequestItem.value) {
    RequestItem.value[i] = "";
  }
};
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
// 编辑
const handleEdit = (e) => {
  data.drawerShow = true;
  data.title = "修改";
  (fromItem.username = e.username),
    (fromItem.password = e.password),
    (fromItem.avatar = e.avatar),
    (fromItem.role_id = e.role_id),
    (fromItem.status = e.status),
    (id.value = e.id);
};
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
};

// 模态框 提交 按钮
const submitForm = async () => {
      if (data.title == "新增") {
        handleAddSubmit();
      } else {
        handleEditSubmit();
      }
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

// 打开图片模态框
const uploadImg = () => { 
  dialogList.dialogVisible = true;
};
// 关闭 图片模态框
const handleCloseImg = () => {
  dialogList.dialogVisible = false;
};
// 图片模态框 确认事件
const handleSubmit = () => {
  fromItem.avatar = url.value; 
  dialogList.dialogVisible = false;
};
// 当在图片模态框中点击 确认修改图片 把图片的id 赋值给 表单数据中
const changeImage = (e) => {
  url.value = e;
};

// 切换分页 当前页 数据
const handleCurrentChange = (e) => {
  data.current = e;
  init();
};
</script>

<style lang="scss" scoped></style>
