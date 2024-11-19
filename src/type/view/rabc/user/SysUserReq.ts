import type IPageReq from "@/type/common/IPageReq";

/**
 * 用户模块分页查询的请求参数
 */
export default interface SysUserReq extends IPageReq {
    /**
     * 用户名
     */
    userName?: string;
    /**
     * 真实姓名
     */
    realName?: string;
    /**
     * 状态
     */
    status?: boolean;
    /**
     * 该用户拥有的角色名称
     */
    roles?: string;
}