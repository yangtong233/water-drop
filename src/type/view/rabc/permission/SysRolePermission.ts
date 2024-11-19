/**
 * created by yangtong on 2024/5/27 21:14
 * 角色-资源映射类型
 */
export default interface SysRolePermission {
    /**
     * 主键id，一个角色的资源id不可能重复，所有该id就是资源id
     */
    id: string
    /**
     * 角色id
     */
    roleId: string;
    /**
     * 资源id
     */
    permissionId: string;
    /**
     * 角色名称
     */
    roleName: string;
    /**
     * 角色编码
     */
    roleCode: string;
    /**
     * 资源名称
     */
    permissionName: string;
    /**
     * 资源名称
     */
    permissionCode: string;

    /**
     * 角色-资源映射子集
     */
    children?: Array<SysRolePermission>
}