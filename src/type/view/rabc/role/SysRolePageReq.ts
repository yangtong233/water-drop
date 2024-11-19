import type IPageReq from "@/type/common/IPageReq";

/**
 * created by yangtong on 2024/5/24 11:08
 * 角色模块分页查询请求参数类型
 */
export default interface SysRolePageReq extends IPageReq {
    /**
     * 角色名称
     */
    roleName: string;
    /**
     * 角色状态
     */
    roleStatus: boolean | undefined;
    /**
     * 角色编码
     */
    roleCode: string;
}