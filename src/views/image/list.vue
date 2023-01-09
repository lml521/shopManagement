<template>
  <div>
    <!-- 图库管理 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button type="primary" size="small" @click="addImgName"
            >新增图片分类</el-button
          >
          <el-button type="warning" size="small" @click="handleUpload"
            >上传图片</el-button
          >
        </div>
      </template>
      <!-- 新增图片分类 模态框  -->
      <i-drawer
        :title="data.title"
        v-model="data.drawerShow"
        @handleClose="handleClose"
      >
        <template #content>
          <div v-if="data.title == '新增'">
            <i-form
              :formList="data.formList"
              :rules="data.rules"
              v-model="fromItem"
              ref="ruleFormRef"
              formSize="default"
            >
            </i-form>
          </div>
          <div v-else-if="data.title=='上传图片'">
            <el-upload
            name="img"
            :headers="headers"
            action="http://ceshi13.dishait.cn/admin/image/upload"
            list-type="text"
            accept="image/png,image/gif,image/jpg,image/jpeg"
            :on-success="handleSuccess"
            ref='frontUpload'
            class="upload-demo"
            multiple drag
           :data="{image_class_id:id}"
        >

    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      讲文件拖到此处,或<em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        只能上传jpg/png文件,且不超过500kb
      </div>
    </template>
  </el-upload>
          </div>
        </template>
        <template #buttons>
          <div v-if="data.title == '新增'">
            <el-button type="primary" @click="submitForm" :loading="loading">提交</el-button>
            <el-button @click="handleClose">取消</el-button>
          </div>
        </template>
      </i-drawer>

      <div>
        <el-container style="height: 500px">
          <!-- 侧边数据 -->
          <ImageAside ref="RefChilde"></ImageAside>

          <ImageMain ref="MainChilde"></ImageMain>
        </el-container>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import ImageAside from "@/components/ImageAside/ImageAside.vue";
import ImageMain from "@/components/ImageMain/ImageMain.vue";
import iDrawer from "@/components/i-drawer/i-drawer.vue"; //模态窗
import iForm from "@/components/i-form/i-form.vue"; //表单
import { ref, reactive } from "vue";
import { getSubmit } from "@/api/image";
import { toast } from "@/common/util";
const ruleFormRef = ref(null);
const MainChilde = ref(null);
const loading = ref(false);
// 侧边 ref 数据
const RefChilde = ref(null);
const data = reactive({
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

const headers = ref({
  token: localStorage.getItem("token"),
});
// 表单v-model绑定的数据
const fromItem = reactive({
  id: null,
  name: "",
  order: "50",
});
const id = ref(0);

// 点击新增按钮
const addImgName = () => {
  data.title = "新增";
  fromItem.order = "50";
  data.drawerShow = true;
};
// 点击上传图片按钮
const handleUpload = () => {
  id.value = RefChilde.value.data.activeId;
  data.title = "上传图片";
  data.drawerShow = true;
};

// 模态框 取消 按钮
const handleClose = () => {
  data.drawerShow = false;
  if (data.title == "新增") {
    ruleFormRef.value.ruleFormRef.resetFields();
  }
};
// 模态框 提交 按钮
const submitForm = async () => {
  // 使用 ref 获取子组件方法
  await ruleFormRef.value.ruleFormRef.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      handleSubmit();
    } else {
      console.log("error submit!", fields);
    }
  });
};
// 提交 按钮 事件
const handleSubmit = async () => {
  loading.value = true;
  try {
    let res = await getSubmit(fromItem);
    if (res.msg === "ok") {
      handleClose();
      toast("新增成功", "success");
      RefChilde.value.getNameList();
    }
  } catch (error) {
    consloe.log(error);
  } finally {
    loading.value = false;
  }
};

function handleSuccess(res) {
  if (res.msg == "ok") {
    MainChilde.value.init();
  }else{
    toast(res.msg,"error")
  }
}

</script>

<style lang="scss" scoped>
:deep(.el-card__body),
:deep(.el-main) {
  padding: 0 !important;
}
</style>
