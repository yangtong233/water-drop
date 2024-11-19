/**
 * created by yangtong on 2024/5/25 22:41
 * 用户-角色映射的响应数据类型
 */
export default interface SysUserRoleResp {
    /**
     * 主键id
     */
    id: string;
    /**
     * 用户id
     */
    userId: string;
    /**
     * 用户名称
     */
    userName: string;
    /**
     * 角色id
     */
    roleId: string;
    /**
     * 角色编码
     */
    roleCode: string;
    /**
     * 角色名称
     */
    roleName: string;
}