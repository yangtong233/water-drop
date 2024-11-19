import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  //获取当前的环境变量
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
    ],
    resolve: {
      //给src目录设置一个别名@
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      //node环境启动，使用的主机地址
      host: env.VITE_APP_HOST,
      //占用的端口
      port: Number(env.VITE_APP_PORT),
      //启动后是否自动打开浏览器
      open: true
    }
  }
})
