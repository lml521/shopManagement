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
* `axios` 接口请求库，进行二次封装，采用 Hooks 风格
* `scss`
* `WindiCSS` 引入WindiCSS，工具库和配置，安装代码提示
* `NProgress`  引入NProgress，进度条 实现 跳转页面进度条加载


## 页面
* 登录
  - [√] 用户名校验(不能为空)
  - [√] 密码校验(不能为空)
  - [√] 注册页面实时显示用户名/密码格式是否正确
* 首页
  - [x] 用户名校验(不能为空)
  - [x] 密码校验(不能为空)
  - [x] 注册页面实时显示用户名/密码格式是否正确

* 账单列表（已完成）
  - [x] 无限滚动
  - [x] 下拉刷新
  - [x] 滑动删除
  - [x] 账单详情
  - [x] 新增/修改账单
  - [x] 自定义支出/收入标签(待开发)
* 账单统计（已完成）
  - [x] 进度条
  - [x] 环形图
  - [x] 无数据页面
* 个人中心(已完成)
  - [x] 修改签名
  - [x] 修改头像（头像存于 Github，通过 jsdelivr 加速访问）
  - [x] 项目地址
  - [x] 修改密码
  - [√] 退出登录
* 权限校验
  - [√] 全局路由守卫，验证 token，无 token 则跳转登录页
  - [√] 有 token 情况下，打开登录页，直接跳转 '/'
  - [√] 未匹配路由跳转 '/404'
* 其他功能
  - [√] vue3中@不能代表路径，解决
  - [√] 实现动态设置页面标题
## 构建步骤
``` bash
# 克隆项目
git clone  

# 进入项目目录
cd day-day-account-book-frontend

# 安装依赖，推荐 yarn
yarn # npm i

#  启动项目
yarn dev # npm run dev

# 打包项目
yarn build # npm run build
