import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// 引入 ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 引入 WindiCSS
import "virtual:windi.css";

// 引入router
import { router } from "./router/index";
import "animate.css";
// 引入 store
import store from "./store/index";

// 封装的事件
import "./permission";
// Vue3一兄弟组件传值之mitt
import mitt from "mitt";
// vue3挂载到全局

const app = createApp(App);
app.config.globalProperties.$mitt = mitt();

// 引入 图标
const iconList = [];

app.directive("focus", {
  created:(el)=>{
    console.log(el.children[0].children[0]);
    el.children[0].children[0].focus();
  },
  inserted: (el) => {
    console.log(el.children[0]);
    el.focus();
  },
});

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  let item = { name: key, id: key };
  iconList.push(item);
  app.component(key, component);
}

console.log(iconList);
store.commit("setIconList", iconList);

app.use(store).use(router).use(ElementPlus).mount("#app");
