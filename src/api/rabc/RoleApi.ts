import BaseApi from "@/api/BaseApi";
import type SysRolePageReq from "@/type/view/rabc/role/SysRolePageReq";
import type IPageResp from "@/type/common/IPageResp";
import type SysRole from "@/type/view/rabc/role/SysRole";
import type SysUserRoleResp from "@/type/view/rabc/user/SysUserRoleResp";
import type SysUserRoleReq from "@/type/view/rabc/user/SysUserRoleReq";

/**
 * created by yangtong on 2024/5/24 11:55
 */
class RoleApi extends BaseApi {
    constructor() {
        super("/rabc/role/")
    }

    /**
     * 分页查询角色数据
     */
    list = (roleParam: SysRolePageReq) => {
        return this.get<IPageResp<SysRole>, SysRolePageReq>("list", roleParam)
    }

    /**
     * 根据id查询角色实体
     * @param id
     */
    queryById = (id: string) => {
        return this.get<SysRole, { id: string }>('queryById', {id})
    }

    /**
     * 新增或编辑角色
     */
    addOrUpdate = (role: SysRole) => {
        return this.post<string, SysRole>("addOrUpdate", role)
    }

    /**
     * 根据ids删除角色
     */
    deleteById = (ids: string[]) => {
        return this.delete<string>("delete", ids)
    }

    /**
     * 根据用户id查询该用户的所有角色信息
     */
    listUserRole = (userId: string) => {
        return this.get<Array<SysUserRoleResp>, { userId: string }>('listUserRole', {userId})
    }

    /**
     * 给指定用户分配指定角色
     */
    assignRole = (userRole: SysUserRoleReq) => {
        return this.post<string, SysUserRoleReq>('assignRole', userRole)
    }

    /**
     * 取消指定用户的指定角色
     */
    cancelRole = (userRole: SysUserRoleReq) => {
        return this.post<string, SysUserRoleReq>('cancelRole', userRole)
    }
}

export default new RoleApi()