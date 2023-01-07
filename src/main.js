import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 引入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入 WindiCSS
import 'virtual:windi.css'



// 引入router
import {router} from './router/index'
import 'animate.css';
// 引入 store
import store from './store/index'

import "./permission"

const app = createApp(App)
// 引入 图标 
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}



app.use(store).use(router).use(ElementPlus).mount('#app')