/**
 * 表单类型
 */
type FormView<T = any> = Record<string, FormItem<T>>

/**
 * 通用表单视图
 */
type FormType =
    "text"
    | "button"
    | "text-button"
    | "number"
    | "password"
    | "switch"
    | "radio"
    | "select"
    | "textarea"
    | "checkbox"
    | "date"

/**
 * 表单项类型
 */
interface FormItem<T = any> {
    /**
     * 表单项是第几行
     */
    row: number;

    /**
     * 表单项绑定变量
     */
    key: keyof T;

    /**
     * 表单项名称
     */
    title?: string,
    /**
     * 表单项占用宽度
     */
    span?: number,

    /**
     * 表单项类型，默认text
     */
    type?: FormType
    /**
     * 如果表单项是单选框时，radioData所有单选项
     */
    radioData?: RadioData[];
    /**
     * switch的激活和不激活时的文字
     */
    active?: string,
    inactive?: string,
    /**
     * 如果表单项是下拉框时，options是所有下拉选项
     */
    options?: SelectOption[];
    /**
     * 如果表单项是复选框时，options是所有复选选项
     */
    checkbox?: null
    /**
     * 按钮回调函数
     */
    btnHandler?: (e: any) => void
    /**
     * 按钮显示文字
     */
    btnText?: string,
    /**
     * 按钮尺寸
     */
    btnSize?: string,
    /**
     * 按钮类型
     */
    btnType?: string
    /**
     * 表单项是否禁用
     */
    disabled?: boolean
}