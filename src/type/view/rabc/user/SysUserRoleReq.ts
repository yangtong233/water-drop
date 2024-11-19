/**
 * created by yangtong on 2024/5/25 22:57
 * 分配或取消用户角色的请求参数类型
 */
export default interface SysUserRoleReq {
    /**
     * 用户id
     */
    userId: string;
    /**
     * 角色id
     */
    roleId: string;
}