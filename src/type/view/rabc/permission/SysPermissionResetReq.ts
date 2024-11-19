/**
 * created by yangtong on 2024/5/28 21:17:35
 * 重置角色资源的请求类型
 */
export default interface SysPermissionResetReq {
    /**
     * 角色id
     */
    roleId: string

    /**
     * 资源id数组
     */
    permissionIds: string[]
}