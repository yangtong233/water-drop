/**
 * created by yangtong on 2024/5/29 21:03:13
 * 字典项的新增或编辑
 */
export default interface SysDictItemAddOrEdit {
    /**
     * 字典项主键id
     */
    id?: string;
    /**
     * 字典项text
     */
    itemText: string;
    /**
     * 字典项value
     */
    itemValue: string;
    /**
     * 字典项序号
     */
    sort: number;
}