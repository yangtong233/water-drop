import {createRouter, createWebHistory} from "vue-router";
import {toRoutes} from "@/router/asnyc-route";
import constantRoutes from "@/router/constant-route"

const router = createRouter({
    history: createWebHistory(),
    routes: toRoutes(constantRoutes)
})

//导出router
export default router