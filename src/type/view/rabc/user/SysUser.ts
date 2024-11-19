/**
 * created by yangtong on 2024/3/24 11:21
 * 用户的实体类型
 */
export default interface SysUser {
    /**
     * 用户id
     */
    id: string;
    /**
     * 用户名
     */
    userName: string;
    /**
     * 密码
     */
    password?: string;
    /**
     * 真实姓名
     */
    realName: string;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 电话
     */
    phone: string;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 状态
     */
    status: Number;
    /**
     * 备注
     */
    remark: string;
    /**
     * 创建日期
     */
    createTime: Date | undefined;
    /**
     * 修改日期
     */
    updateTime: Date | undefined;
    /**
     * 该用户拥有的角色名称
     */
    roles: string[];
}


