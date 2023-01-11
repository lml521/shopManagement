<template>
  <div>
    <!-- 管理员管理 -->
    <el-card class="box-card">
      <!-- 头部 搜索数据 -->
      <i-header-form
        :formList="RequestList"
        v-model="RequestItem"
        size="small"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
      >
      </i-header-form>

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
        :stripe="data.stripe"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @changeStatus="changeStatus"
      >
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
          <el-button type="primary" @click="submitForm" :loading="loading"
            >提交</el-button
          >
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
import iHeaderForm from "@/components/i-header-form/i-header-form.vue"; //头部表单 按钮
import iHeaderAdd from "@/components/i-header-add/i-header-add.vue";
import iTable from "@/components/i-table/i-table.vue"; //表格
import iDrawer from "@/components/i-drawer/i-drawer.vue"; //模态窗
import iForm from "@/components/i-form/i-form.vue"; //表单

import iPagination from "@/components/i-pagination/i-pagination.vue"; //分页
import { getTableList, getSearch, getChangeStatus,getDelete } from "@/api/manager.js";
import { reactive, ref } from "vue";
import { toast } from "@/common/util";
const data = reactive({
  tableHeader: [
    {
      type: "userInfo",
      label: "管理员",
      width: "256px",
    },
    {},
    {
      prop: "role.name",
      label: "所属管理员",
      align: "center",
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

          title:"是否要删除改管理员?",
          confirm:"确认",
          cancel:"取消",
          size: "small",
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
  title: "新增",
  pageSize: 10, //每页显示条目个数
  current: 1, //当前页数
  activeId: 0,
  drawerShow: false,

  // 表单展示数据
  formList: [
    {
      label: "管路",
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
const id = ref(0);
// 头部表单 按钮  展示数据
const RequestList = ref([
  {
    label: "关键词",
    prop: "title",
    placeholder: "请填写管理员昵称",
    width: "100%",
  },
]);
// 头部 表单 v-model 绑定的数据
const RequestItem = ref({
  title: "",
});

const headerButton = ref([
  {
    name: "新增",
    event: "handleAdd",
    type: "primary",
    size: "small",
    align: "left",
  },
  {
    name: "新增",
    icon: "Refresh",
    event: "init",
    class: "ml-auto",
    align: "right",
    tooltip: true,
    content: "刷新数据",
    placement: "top",
  },
]);

const ruleFormRef = ref(); //模态框表单 ref
// 表单v-model绑定的数据
const fromItem = reactive({
  title: "",
  content: "",
});

const loading = ref(false);

// 获取 表格数据
const init = () => {
  console.log(1234, loading.value);
  loading.value = true;
  console.log(loading.value);
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

// 头部 重置 事件
const handleReset = () => {
  init();
  for (let i in RequestItem.value) {
    RequestItem.value[i] = "";
  }
}
const changeStatus = async (id, status) => {
  console.log(id, status);
  let res = await getChangeStatus(id,status);
  console.log(res);
  if(res.msg=='ok'){
    toast("修改状态成功", "success");
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
  fromItem.title = e.title;
  fromItem.content = e.content;
  id.value = e.id;
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
