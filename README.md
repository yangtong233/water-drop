# 1项目启动
1. node版本：node-v22.11.0

2. 包管理工具pnpm

   ```bash
   #安装pnpm，安装慢可以切换下载源
   npm i pnpm -g
   #查看pnpm当前下载源
   pnpm config get registry
   #切换pnpm下载源
   pnpm config set registry https://registry.npmmirror.com/
   ```

3. 安装依赖并启动

   ```bash
   pnpm install
   pnpm run dev
   ```