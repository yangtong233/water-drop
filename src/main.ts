// 引入样式
import '@/assets/normalize.css'
import '@/assets/global.css'
import '@/assets/iconfont/iconfont.js'
import 'element-plus/dist/index.css'

//引入项目必备组件
import App from '@/App.vue'
import {createApp} from 'vue'
import router from '@/router'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@/router/router-guard"

//安装组件，挂载并运行项目
const app = createApp(App)
let piniaStore = createPinia()
app.use(piniaStore)

app.use(router)
app.use(ElementPlus)
//全局注册elementPlus提供的icon图标
for (const [key, component] of Object.entries<any>(ElementPlusIconsVue)) {
    app.component(key, component)
}

//渲染
app.mount('#app')
console.log("正在使用vue版本:", app.version)