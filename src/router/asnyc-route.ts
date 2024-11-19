import type SysPermission from "@/type/view/rabc/permission/SysPermission";
import type {RouteRecordRaw} from "vue-router";

const views = import.meta.glob('@/view/**/*.vue')
const layout = import.meta.glob('@/layout/**/index.vue')
const viewComponents: any = {}
Object.keys(views).forEach(view => {
    viewComponents[view] = views[view]
})
Object.keys(layout).forEach(view => {
    viewComponents[view] = layout[view]
})

export const toRoutes = (permission: SysPermission[]): RouteRecordRaw[] => {
    if (!permission || permission.length === 0) {
        return [] as RouteRecordRaw[]
    }
    return permission.map(route => {
        //找到该路由对应的组件
        let component = viewComponents[`/src${route.routerComponent}`]
        if (!component) {
            component = viewComponents[`/src/views${route.routerPath}/index.vue`]
        }
        if (!component) {
            component = viewComponents[`${route.routerComponent}`]
        }
        if (!component) {
            // component = viewComponents['/src/view/404/index.vue']
            component = viewComponents['/src/layout/index.vue']
        }

        //将permission对象转为route对象
        let routeObj: RouteRecordRaw = {
            path: route.routerPath,
            component,
            name: route.code,
            children: route.children ? toRoutes(route.children) : [],
            meta: {
                title: route.name,
                visible: route.visible,
            }
        }
        //重定向
        if (route.redirect) {
            routeObj['redirect'] = route.redirect
        }
        return routeObj
    }) as RouteRecordRaw[];
}