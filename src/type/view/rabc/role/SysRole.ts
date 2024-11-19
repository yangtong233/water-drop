/**
 * created by yangtong on 2024/5/24 11:34
 * 角色的实体类型
 */
export default interface SysRole {
    /**
     * 角色id
     */
    id: string | undefined;
    /**
     * 角色姓名
     */
    roleName: string;
    /**
     * 角色编码
     */
    roleCode: string;
    /**
     * 角色状态
     */
    roleStatus: boolean;
    /**
     * 角色备注
     */
    roleRemark: string;
    /**
     * 创建日期
     */
    createTime: Date | undefined;
    /**
     * 修改日期
     */
    updateTime: Date | undefined;
}