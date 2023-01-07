import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 在编写router前我们来设置下别名，在vue2中我们@就代表了src下边的内容非常方便，
// 在vue3中我们想要实现，则要vite中自己配置了，下边我们先来配置下路径别名。
import { resolve } from 'path'
//  引入 WindiCSS
import WindiCSS from 'vite-plugin-windicss'


export default defineConfig({
  plugins: [vue(),WindiCSS()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    proxy: {
      '/api': {
        // target:'http://ceshi13.dishait.cn',
        target:'http://shopapi.2yuecloud.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
