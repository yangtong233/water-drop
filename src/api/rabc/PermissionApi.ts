import BaseApi from "@/api/BaseApi";
import type IPageResp from "@/type/common/IPageResp";
import type SysPermission from "@/type/view/rabc/permission/SysPermission";
import type SysPermissionPageReq from "@/type/view/rabc/permission/SysPermissionPageReq";
import type SysRolePermission from "@/type/view/rabc/permission/SysRolePermission";
import type SysPermissionResetReq from "@/type/view/rabc/permission/SysPermissionResetReq";

/**
 * created by yangtong on 2024/5/26 20:39
 * 资源模块接口
 */
class PermissionApi extends BaseApi{
    constructor() {
        super("/rabc/permission/")
    }

    /**
     * 分页查询资源树
     */
    pageTree = (page: SysPermissionPageReq) => {
        return this.get<IPageResp<SysPermission>, SysPermissionPageReq>('pageTree', page)
    }

    /**
     * 根据角色id查询该角色-资源对照信息
     */
    listRolePermission = (roleId: string) => {
        return this.get<Array<SysRolePermission>, { roleId: string }>('listRolePermission', {roleId})
    }

    /**
     * 根据id查询角色实体
     */
    queryById = (id: string) => {
        return this.get<SysPermission, { id: string }>('queryById', {id})
    }

    /**
     * 新增或编辑资源
     */
    addOrUpdate = (permission: SysPermission) => {
        return this.post<string, SysPermission>('addOrUpdate', permission)
    }

    /**
     * 根据id删除资源
     */
    deleteById = (ids: string[]) => {
        return this.delete<string>('delete', ids)
    }

    /**
     * 重置指定角色的资源
     * 一次性给指定角色删除或添加资源
     */
    resetPermission = (permissionResetReq: SysPermissionResetReq) => {
        return this.post<string, SysPermissionResetReq>('resetPermission', permissionResetReq)
    }

    /**
     * 给指定角色分配指定资源
     */
    assignPermission = (rolePermission: SysRolePermission) => {
        return this.post<string, SysRolePermission>('assignPermission', rolePermission)
    }

    /**
     * 取消指定角色的指定资源
     */
    cancelPermission = (rolePermission: SysRolePermission) => {
        return this.post<string, SysRolePermission>('cancelPermission', rolePermission)
    }
}

export default new PermissionApi()