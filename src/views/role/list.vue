<template>
  <div>
    <!-- 角色管理 -->
    <el-card>
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
        @handleRight="handleRight"
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
          <div  v-if="data.title!== '权限配置'">
          <i-form
            :formList="data.formList"
            :rules="data.rules"
            v-model="fromItem"
            ref="ruleFormRef"
            formSize="default"
            @uploadImg="uploadImg"
          >
          </i-form>
        </div>
        <div v-else>

          <i-tree
          :tableData="rightList"
          :defaultProps="defaultProps"
          :defaultShowNodes="data.defaultShowNodes"
          :iconHidden="true"
          :showCheckbox="true"
          :activeRulesList="activeRulesList"
          @currentChange="currentChange"
      >
      </i-tree>
        </div>
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
import iTree from "@/components/i-tree/i-tree.vue"
import { toast } from "@/common/util"; //文字 提示信息
import {
  getTableList,
  getChangeStatus,
  getDelete,
  getRuleList,
  getAdd,
  getEdit,
  setRules,
} from "@/api/role.js"; //api
import { reactive, ref } from "vue";

// 添加按钮 部分数据
const headerButton = ref([
  {
    name: "新增",
    event: "handleAdd",
    type: "primary",
    size: "small",
    align: "left",
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

const data = reactive({
  //表格头部数据
  tableHeader: [
    {
      prop: "name",
      label: "角色名称",
    },
    {},
    {
      prop: "desc",
      label: "角色描述",
    },
    {},
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
          name: "配置权限",
          size: "small",
          type: "primary",
          text: "primary",
          event: "handleRight",
        },
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
  defaultShowNodes: [],
  // 表单展示数据
  formList: [
    {
      label: "角色名称",
      prop: "name",
      placeholder: "请填写角色名称",
    },
    {
      label: "角色描述",
      type: "textarea",
      prop: "desc",
      placeholder: "请填写角色描述",
    },
    {
      label: "状态",
      type: "switch",
      prop: "status",
    },
  ],
  // 表单验证
  rules: {
    name: {
      required: true,
      message: "角色名称必填",
      trigger: ["blur", "change"],
    },
  },
});
// 模态框 表单 v-model绑定的数据
const fromItem = reactive({
  name:"",
  desc:"",
  status:1
});

const id = ref(0); //id 点击 当前行 获取 当前行的id
const ruleFormRef = ref(); //模态框表单 ref 
const loading = ref(false); //loading 加载 开关

// 权限数据 
const rightList =ref([])

const activeRulesList=ref([])

const defaultProps = {
  children: "child",
  label: "name",
};

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

let changeRulesList =ref([])
const currentChange=(e)=>{
  changeRulesList.value =e
}
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
  fromItem.desc=e.desc
  fromItem.name=e.name
  fromItem.status=e.status
  id.value = e.id
  console.log(e)
};
// 点击 权限 设置 按钮
const handleRight=async(e)=>{
  id.value=e.id
  let nodeKey=''
  e.rules.forEach(item=>{
    nodeKey=item.id
    activeRulesList.value.push(nodeKey)
  })
  console.log(activeRulesList.value)
  let res = await getRuleList()
  if (res.msg == "ok") {
  rightList.value= res.data.rules
  getDefaultShowNodes(2, res.data.rules);
  }
  data.drawerShow = true;
  data.title = "权限配置";
}
const getDefaultShowNodes = (num, children) => {
  --num;
  if (num >= 0) {
    for (var i = 0; i < children.length; i++) {
      data.defaultShowNodes.push(children[i].id);
      if (children[i].children) {
        getDefaultShowNodes(num, children[i].children);
      }
    }
  }
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
  if(data.title!="权限配置"){
     ruleFormRef.value.ruleFormRef.resetFields();
  }
 
};

// 模态框 提交 按钮
const submitForm = async () => {
  if(data.title=="权限配置"){
    let res =await setRules({id:id.value,rule_ids:changeRulesList.value})
    if (res.msg == "ok") {
      toast("配置成功", "success");
      init();
      handleClose();
    }
    return
  }


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
