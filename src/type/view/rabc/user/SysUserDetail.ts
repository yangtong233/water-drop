import type SysPermission from "@/type/view/rabc/permission/SysPermission";

/**
 * 登录成功后返回的用户详细信息
 */
export default interface SysUserDetail {
    /**
     * 用户id
     */
    id: string,
    /**
     * 用户名
     */
    userName: string,
    /**
     * 用户真实姓名
     */
    realName: string,
    /**
     * 用户头像
     */
    avatar: string,
    /**
     * 手机号
     */
    phone: string,
    /**
     * 邮箱
     */
    email: string,
    /**
     * 备注
     */
    remark: string,

    /**
     * 令牌
     */
    token: string,
    /**
     * 该用户角色
     */
    roles: Array<any>,
    /**
     * 该用户拥有资源
     */
    permissions: Array<SysPermission>
}