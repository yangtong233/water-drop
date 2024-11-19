/**
 * 表格数组类型
 */
type TableView<T = any> = Array<ITableView<T>>

/**
 * Table组件的样式
 */
type Type = "index" | "text" | "tag" | "switch" | "button" | "callback" | "slot" | "operation"
type TagType = "default" | "primary" | "success" | "warning" | "danger" | "info"
type CallbackFun<T> = (data: T) => string

/**
 * 表格列类型
 */
interface ITableView<T = any> {
    /**
     * 表格列类型
     */
    type: Type;
    /**
     * 表格列名称
     */
    title: string;
    /**
     * 表格列绑定字段，只能是T类中的字段
     * 如果T类长这样：{string, number, date}
     * 那么keyof T就相当于：type TType = 'string'|'number'|'date'
     */
    prop?: keyof T;
    /**
     * 表格列宽度
     */
    width?: string | number;

    /**
     * 当表格列内容过长被隐藏时是否显示tooltip
     */
    overflow?: boolean;

    /**
     * 处理当前列数据的回调函数
     */
    callback?: CallbackFun<T>;
    /**
     * 插槽名称
     */
    slotName?: string;

    /**
     * 表格列fixed属性
     */
    fixed?: 'left' | 'right';
    /**
     * tag类型
     */
    tagType?: TagType;

    /**
     * 隐射，真实值是键，显示的文本是值，根据键映射值
     */
    options?: Record<any, any>;
}