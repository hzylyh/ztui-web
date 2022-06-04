import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`
    }
  },
  // 反向代理这样配置
  server: {
    port: 3000,
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false,
    proxy: {
      '/uiAtApi/': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/uiAtApi/, '/uiAtApi/'),
      }
    }
  },
})
