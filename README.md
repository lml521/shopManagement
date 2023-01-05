# Vue 3 + Vite

# 商城后台管理系统
> 自己写的商城后台管理，Vue3  + Vite + ElementPlus ，可以作为该类技术栈项目搭建的参考
> 页面基本 UI 和逻辑基于(http://shopadmin.dishawang.com/#/login)，在此基础上加了些自己的想法

## 在线体验
http://shopadmin.dishawang.com/#/login

懒人:
* 账号：admin
* 密码：admin

## 插件
* `Vue-Router`
* `scss`
* `axios` 接口请求库，进行二次封装，采用 Hooks 风格
* `WindiCSS` 引入WindiCSS，工具库和配置，安装代码提示
* `NProgress`  引入NProgress，进度条 实现 跳转页面进度条加载

## 页面
* 登录
  - [x] 用户名校验(不能为空)
  - [x] 密码校验(不能为空)
  - [x] 注册页面实时显示用户名/密码格式是否正确
* 首页
  - [x] 实现全屏功能
  - [x] 实现修改密码功能
  - [x] 退出登录
  - [x] 递归组件 实现侧边栏
  - [x] 实现菜单展开与收起功能
  - [x] 动态页面
  - [x] 实现标签导航栏
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
