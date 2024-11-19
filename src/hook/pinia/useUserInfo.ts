import {reactive, toRefs} from "vue";
import $router from "@/router";
import type SysUserDetail from "@/type/view/rabc/user/SysUserDetail";
import type SysPermission from "@/type/view/rabc/permission/SysPermission";
import {toRoutes} from "@/router/asnyc-route";
import constantRoutes from "@/router/constant-route"

export default () => {
    /**
     * 用户角色和权限相关
     */
    const userDetail = reactive<SysUserDetail>({
        id: "",
        avatar: "",
        email: "",
        phone: "",
        realName: "",
        remark: "",
        roles: [],
        userName: "",
        token: "",
        permissions: [],
    })

    /**
     * 更新权限的函数，单独抽取出来作为一个方法，是因为当权限更新时，需要同步更新动态路由
     * @param newPermissions
     */
    const updatePermission = (newPermissions: Array<SysPermission>) => {
        let allPermissions: SysPermission[] = []
        allPermissions.push(...constantRoutes)
        allPermissions.push(...newPermissions)
        userDetail.permissions = allPermissions
        let routes = toRoutes(newPermissions);
        if (routes) {
            routes.forEach(route => {
                $router.addRoute(route)
            })
        }
    }

    return {
        ...toRefs(userDetail), updatePermission
    }
}