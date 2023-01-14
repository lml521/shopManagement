# Vue 3 + Vite

# 商城后台管理系统
> 自己写的商城后台管理，Vue3  + Vite + ElementPlus ，可以作为该类技术栈项目搭建的参考
> 页面基本 UI 和逻辑基于(http://shopadmin.dishawang.com/#/login)，在此基础上加了些自己的想法

## 在线体验
http://shopadmin.dishawang.com/#/login

* 账号：admin
* 密码：admin

## 插件
* `Vue-Router`
* `scss`
* `axios` 接口请求库，进行二次封装，采用 Hooks 风格
* `WindiCSS` 引入WindiCSS，工具库和配置，安装代码提示
* `animate.css`引入 animate.css 动画库
* `NProgress`  引入NProgress，进度条 实现 跳转页面进度条加载
* `screenfull` 引入screenfull 进行全屏退出全屏切换
* `vue-count-to` 引入 vue-count-to , 数字滚动动画
* `mitt` 引入mitt 进行兄弟传值
* `echarts` 引入echarts
## 页面
* 登录
  - [x] 用户名校验(不能为空)
  - [x] 密码校验(不能为空)
  - [x] 注册页面实时显示用户名/密码格式是否正确
* 首页
  - [x] 实现全屏功能
  - [x] 验证 修改密码与确认密码 是否一致进行校验
  - [x] 实现修改密码功能
  - [x] 实现退出登录功能
  - [x] 实现菜单展开与收起功能
  - [x] 递归组件 实现侧边栏
  - [x] 动态页面
  - [x] 实现标签导航栏
* 封装
  - [x] element plue 抽屉模态框 二次封装
  - [x] element plue 表单 二次封装
  - [x] 利用element tabs 标签页 封装tab
* 主控台
  - [x] 统计面板(支付订单、订单量、销售额、新增用户)组件开发
  - [x] 实现数字滚动动画
  - [x] 分类组件开发与跳转
  - [x] 订单统计模块开发
  - [x] 店铺及商品提示模块开发
  - [x] 交易提示模块开发
* 图库管理
  - [x] 图库模块布局开发
  - [x] 图库分类组件开发
  - [x] 图库分类列表分页实现
  - [x] 新增图库
  - [x] 修改图库
  - [x] 删除图库
  - [x] 图片列表渲染
  - [x] 图片重名命与删除功能
  - [x] 上传多图功能实现
* 管理员管理
  - [x] 上传图片
* 公告管理
* 权限校验
  - [x] 全局路由守卫，验证 token，无 token 则跳转登录页
  - [x] 有 token 情况下，打开登录页，直接跳转 '/'
  - [x] 未匹配路由跳转 '/404'
* 其他功能
  - [x] vue3中@不能代表路径，解决
  - [x] 实现全局loading进度条
  - [x] 实现动态设置页面标题
## 构建步骤
``` bash
# 克隆项目
git clone  

# 进入项目目录
cd shopmanagement

# 安装依赖，推荐 yarn
yarn # npm i

#  启动项目
yarn dev # npm run dev

# 打包项目
yarn build # npm run build
