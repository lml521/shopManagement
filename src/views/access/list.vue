<template>
  <div>
    <!-- 权限管理 -->
    <el-card>
      <!-- 头部 添加 按钮 -->
      <i-header-add
        :buttonList="headerButton"
        @handleAdd="handleAdd"
        @init="init" >
      </i-header-add>

      <!-- 树形控件  -->
      <i-tree :tableData="data.tableData" :defaultProps="defaultProps"
      :defaultShowNodes="data.defaultShowNodes">
      <!-- 插槽 展示 按钮数据 -->
         <template #buttons>
           <div>
                 <el-switch
                  v-model="value"
                  size="large"
                  class="mr-4"/>
          <el-button type="primary" @click.stop="add" link size="small">修改</el-button>
          <el-button type="primary" @click.stop="add" link size="small">增加</el-button>
          <el-button type="primary" @click.stop="add" link size="small">删除</el-button>
        </div>
        </template>
     </i-tree>

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
            :options="options"
            :defaultParams="defaultParams"
            :rules="data.rules"
            :rolesList="rolesList"
            v-model="fromItem"
            ref="ruleFormRef"
            formSize="default"
            @changeRadio="changeRadio"
            @changeCascader="changeCascader"
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
    </el-card>
  </div>
</template>

<script setup>
import iHeaderAdd from "@/components/i-header-add/i-header-add.vue"; //头部 添加 按钮 部分
import iDrawer from "@/components/i-drawer/i-drawer.vue"; //模态窗 抽屉
import iForm from "@/components/i-form/i-form.vue"; //表单
import iTree from "@/components/i-tree/i-tree.vue";
import { toast } from "@/common/util"; //文字 提示信息
import {
  getTableList,
  getSearch,
  getChangeStatus,
  getDelete,
  getAdd,
  getEdit,
} from "@/api/access.js"; //api
import { reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const defaultProps = {
  children: "child",
  label: "name",
};
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
const add =()=>{
  
}

const data = reactive({
  tableData: [], //表格展示数据
  title: "新增", //模态框 标题
  drawerShow: false, //抽屉模态框 显示隐藏
  defaultShowNodes: [],

  // 表单展示数据
  formList: [
    {
      label: "上级菜单",
      type:"cascader",
      prop: "rule_id",
      placeholder: "请选择上级菜单",
    },
    {
      label: "菜单/规则",
      prop: "menu",
      type:"borderRadio",
      event:"changeRadio"
    },
    {
      label: "名称",
      prop: "name",
      width:"25%", 
      placeholder: "请填写名称",
    },
    // {
    //   label: "菜单图标",
    //   type: "iconSelect",
    //   prop: "icon",
    //   placeholder: "请选择图标",
    // },
     {
      label: "后端规则",
      prop: "condition",
      placeholder: "请选择图标",
    },{
      label: "请求方式",
      type: "select",
      prop: "method", 
    },
    {
      label: "排序",
      type: "inputNumber",
      prop: "order",
    },
  ],
});
const options=ref([])
const   defaultParams= {
        label: "name",
        value: "id",
        children: "child",
        checkStrictly: true,
        emitPath:false,
}


// 模态框 表单 v-model绑定的数据
const fromItem = reactive({
  rule_id: "",
  menu:1,
  icon:"",
  name:"",
  order: 50, 
  condition:"",
  frontpath:"",
  method:"GET",
  status:1,
});

const rolesList = ref([ {
    name:"GET",
    id:"GET",
  },{
    name:"POST",
    id:"POST",
  },{
    name:"PUT",
    id:"PUT",
  },{
    name:"DELETE",
    id:"DELETE",
  }]); // 表单中 下拉菜单 展示 数据
const id = ref(0); //id 点击 当前行 获取 当前行的id
const ruleFormRef = ref(); //模态框表单 ref
const loading = ref(false); //loading 加载 开关

// 获取 表格数据
const init = () => {
  loading.value = true;
  try {
    getTableList(data.current).then((res) => {
      if (res.msg == "ok") {
        options.value = res.data.rules;
        console.log( res.data.rules)
        data.tableData = res.data.list;
        data.total = res.data.totalCount;
        getDefaultShowNodes(2, res.data.list);
      }
      loading.value = false;
    });
  } catch (error) {
    console.log(error);
  }
};
init();

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

const changeRadio=(e)=>{
  fromItem.menu=e
  if(e==0){

    if(fromItem.rule_id){
    data.formList.splice(4,0,{
      label: "前端路由", 
      prop: "frontpath",
      placeholder: "请选择路由",
    },)

  }
    rolesList.value=store.state.iconList
    data.formList.splice(3,2,{
      label: "菜单图标",
      type: "iconSelect",
      prop: "icon",
      placeholder: "请选择图标",
    },)
  }else{
    rolesList.value=[ {
    name:"GET",
    id:"GET",
  },{
    name:"POST",
    id:"POST",
  },{
    name:"PUT",
    id:"PUT",
  },{
    name:"DELETE",
    id:"DELETE",
  }]

  if(fromItem.rule_id){
    data.formList.splice(3,2, {
      label: "后端规则",
      prop: "condition",
      placeholder: "请选择图标",
    },{
      label: "请求方式",
      type: "select",
      prop: "method", 
    },)
    return 
  }


    data.formList.splice(3,1, {
      label: "后端规则",
      prop: "condition",
      placeholder: "请选择图标",
    },{
      label: "请求方式",
      type: "select",
      prop: "method", 
    },)
  }
}

const changeCascader=(e)=>{
  console.log(e)
  fromItem.rule_id=e
  if(fromItem.rule_id&&fromItem.menu==0){
    data.formList.splice(4,0,{
      label: "前端路由", 
      prop: "frontpath",
      placeholder: "请选择路由",
    },)

  }

}


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

</script>

<style lang="scss" scoped>
</style>
