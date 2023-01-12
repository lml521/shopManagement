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
         <template #default="{data}"  >
           <div>
                 <el-switch
                 :active-value="1"
                 :inactive-value	="0"
                 @change="changeStatus(data.id,data.status)"
                  v-model="data.status"
                  size="large"
                  class="mr-4"/>


          <el-button type="primary" @click.stop="handleEdit(data)" 
           link size="small">修改</el-button>
          <el-button type="primary" @click.stop="handleAdd" link size="small">增加</el-button>
        


          <el-popconfirm
              
                confirm-button-text="确认"
                cancel-button-text="取消"
                title="是否要删除该记录?"
                @confirm="handleDelete(data)">
                
                <template #reference>
                  <el-button type="primary"  link size="small">删除</el-button>
                </template>
              </el-popconfirm>
              
        
          


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


const data = reactive({
  tableData: [], //表格展示数据
  title: "新增", //模态框 标题
  drawerShow: false, //抽屉模态框 显示隐藏
  defaultShowNodes: [],

  // 表单展示数据
  formList: [
    {
      label: "上级菜单",
      type: "cascader",
      prop: "rule_id",
      event:"changeCascader",
      placeholder: "请选择上级菜单",
    },
    {
      label: "菜单/规则",
      prop: "menu",
      type: "borderRadio",
      event: "changeRadio",
      button: [
        {
          value: "菜单",
          label: 1,
        },
        {
          value: "规则",
          label: 0,
        },
      ],
    },
    {
      label: "名称",
      prop: "name",
      width: "25%",
      placeholder: "请填写名称",
    },

    // 规则
    {
      // 3
      label: "后端规则",
      prop: "condition",
      hidden: false, //是否隐藏
      placeholder: "请选择图标",
    },
    {
      // 4
      label: "请求方式",
      type: "select",
      hidden: false, //是否隐藏
      prop: "method",
    },

    // 菜单
    {
      // 5
      label: "菜单图标",
      type: "iconSelect",
      hidden: true, //是否隐藏
      prop: "icon",
      placeholder: "请选择图标",
    },
    {
      // 6
      label: "前端路由",
      prop: "frontpath",
      hidden: true, //是否隐藏
      placeholder: "请选择路由",
    },

    {
      label: "排序",
      type: "inputNumber",
      prop: "order",
    },
  ],
});
const options = ref([]);
const defaultParams = {
  label: "name",
  value: "id",
  children: "child",
  checkStrictly: true,
  emitPath: false,
};

// 模态框 表单 v-model绑定的数据
const fromItem = reactive({
  rule_id: "",
  menu: 0,
  icon: "",
  name: "",
  order: 50,
  condition: "",
  frontpath: "",
  method: "GET",
  status: 1,
});

const rolesList = ref([
  {
    name: "GET",
    id: "GET",
  },
  {
    name: "POST",
    id: "POST",
  },
  {
    name: "PUT",
    id: "PUT",
  },
  {
    name: "DELETE",
    id: "DELETE",
  },
]); // 表单中 下拉菜单 展示 数据
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
        console.log(res.data.rules);
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

const changeRadio = (e) => {
  fromItem.menu = e;
  // 菜单
  if (e == 1) {
    rolesList.value = store.state.iconList;
    data.formList[6].hidden = fromItem.rule_id ? false : true;
    data.formList[3].hidden = true;
    data.formList[4].hidden = true;
    data.formList[5].hidden = false;
  } else {
    data.formList[3].hidden = false;
    data.formList[4].hidden = false;
    data.formList[5].hidden = true;
    data.formList[6].hidden=true
  }
};

const changeCascader = (e) => {
  fromItem.rule_id = e;
  data.formList[6].hidden =fromItem.menu? false : true;
};

// 添加表格数据
const handleAdd = () => {
  data.drawerShow = true;
  data.title = "新增";
};
// 编辑
const handleEdit = (e) => {
  console.log(e,e.rule_id)

  fromItem.rule_id=e.rule_id
  fromItem.menu=e.menu
  fromItem.icon=e.icon
  fromItem.name=e.name
  fromItem.order=e.order
  fromItem.condition=e.condition
  fromItem.frontpath=e.frontpath
  fromItem.method=e.method
  fromItem.status=e.status
  data.title = "修改";
  data.drawerShow = true;
  id.value = e.id
  changeRadio(fromItem.menu)
    
};
// 删除
const handleDelete = async (e) => {

  let res = await getDelete(e.id);
  if (res.msg == "ok") {
    toast("删除成功", "success");
    init();
  }
};


// 表格 修改状态
const changeStatus = async (id, status) => {
  console.log(id, status);
  let res = await getChangeStatus(id, status);
  console.log(res);
  if (res.msg == "ok") {
    toast("修改状态成功", "success");
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
