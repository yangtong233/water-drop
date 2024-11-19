/**
 * created by yangtong on 2024/5/29 19:16:07
 * 系统字典/项
 */
export default interface SysDict {
    /**
     * 主键id
     */
    id: string;
    /**
     * 字典项对应的字典id，如果是字典，则pid=0
     */
    pid: string;
    /**
     * 字典type = 1， 字典项type = 0，与pid多多少少有点冗余，主要为了一目了然
     */
    type: string
    /**
     * 字典名称，比如性别、男、女
     */
    dictName: string
    /**
     * 字典code
     *  - 对于字典，一般是英文名称，比如 性别 -> sex，应该唯一
     */
    dictCode: string

    /**
     * 字典项值，比如"0"
     */
    itemValue: string

    /**
     * 字典项文字，比如"女"
     */
    itemText: string

    /**
     * 排序
     */
    sort: string;
    /**
     * 描述
     */
    dictDesc: string;

    /**
     * 创建时间
     */
    createTime?: Date;

    /**
     * 修改时间
     */
    updateTime?: Date;
}