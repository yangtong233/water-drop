/**
 * 权限资源的实体类型
 */
export default interface SysPermission {
    /**
     * 资源主键id
     */
    id: string,
    /**
     * 父资源主键id，通过该字段将SysPermission数组转为树状数据
     */
    pid: string,
    /**
     * 资源类型,0-按钮，1-菜单
     */
    type: SysPermissionEnum,
    /**
     * 资源名称，展示在页面上
     */
    name?: string,
    /**
     * 资源编码，区分唯一的资源，资源名称可以重复，但是编码不能重复
     * 用作：路由名称，按钮标识符等
     */
    code: string,
    /**
     * 组件路由地址, 例如:/sys/user
     */
    routerPath: string,
    /**
     * 该路由对应的文件路径, 例如:/view/sys/user/index.vue
     */
    routerComponent?: string,
    /**
     * 是否可见
     */
    visible: boolean,
    /**
     * 资源图表
     */
    icon?: string,
    /**
     * 重定向路径，针对路由
     */
    redirect?: string,
    /**
     * 排序
     */
    sort?: number,
    /**
     * 备注
     */
    remark?: string,
    /**
     * 子资源
     */
    children?: Array<SysPermission>
}