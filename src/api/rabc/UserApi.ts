import BaseApi from "@/api/BaseApi";
import type SysUserDetail from "@/type/view/rabc/user/SysUserDetail";
import type IPageResp from "@/type/common/IPageResp";
import type SysUser from "@/type/view/rabc/user/SysUser";
import type SysUserReq from "@/type/view/rabc/user/SysUserReq";

class UserApi extends BaseApi {
    constructor() {
        super('/rabc/user/')
    }

    /**
     * 根据token获取在线用户详情
     */
    getUserDetailByToken = () => {
        return this.get<SysUserDetail>("getUserDetailByToken")
    }

    /**
     * 分页查询用户列表
     */
    list = (userDto: SysUserReq) => {
        return this.get<IPageResp<SysUser>, SysUserReq>('list', userDto)
    }

    /**
     * 根据有无id新增或编辑用户
     */
    addOrUpdate = (userVo: SysUser) => {
        return this.post<string, SysUser>('addOrUpdate', userVo)
    }

    /**
     * 根据id查询用户
     */
    queryById = (id: String) => {
        return this.get('queryById', {id})
    }

    /**
     * 根据id删除用户
     */
    deleteById = (ids: string[]) => {
        return this.delete<string>('delete', ids)
    }


}

export default new UserApi()