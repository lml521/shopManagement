import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 引入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入router
import router from './router/index'

// 引入 store
import store from './store/index'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')