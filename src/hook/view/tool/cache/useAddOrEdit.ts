import {reactive, ref} from "vue";
import useApi from "@/api/tool/CacheApi"
import type AddOrEditCacheReq from "@/type/view/tool/cache/AddOrEditCacheReq";

/**
 * created by yangtong on 2024/5/31 17:04:07
 * 缓存模块的新增编辑相关代码
 */
export default function (list: () => void) {

    //新增或编辑表单的标题
    let title = ref("")

    //当前是新增(1)还是编辑(2)
    let currentStatus: number | undefined = undefined

    //新增或编辑表单是否显示
    let isShowAddOrEditForm = ref(false);

    //新增或编辑表单的样式
    const addOrEditFormView = reactive<FormView<AddOrEditCacheReq>>({
        "缓存key": {row: 1, key: "key"},
        "缓存值": {row: 2, key: "value"},
        "过期时间(s)": {row: 3, key: "timeout", type: "number"}
    })

    //新增或编辑表单的数据
    const addOrEditFormModel = reactive<AddOrEditCacheReq>({
        key: "",
        value: undefined,
        timeout: 0
    })

    //点击新增按钮的回调函数
    const clickAdd = () => {
        title.value = "新增"
        addOrEditFormView['缓存key'].disabled = false
        currentStatus = 1
        isShowAddOrEditForm.value = true
        for (let key in addOrEditFormModel) {
            addOrEditFormModel[key] = undefined
        }
    }

    //点击编辑按钮的回调函数
    const clickEdit = (row: any) => {
        Object.assign(addOrEditFormModel, row)
        addOrEditFormView['缓存key'].disabled = true
        title.value = "编辑"
        currentStatus = 2
        isShowAddOrEditForm.value = true
    }

    //调用新增或编辑接口
    const doAddOrEdit = () => {
        //新增
        if (currentStatus && currentStatus === 1) {
            useApi.addCache(addOrEditFormModel).then(() => {
                isShowAddOrEditForm.value = false
                list()
            });
        }
        //编辑
        else if (currentStatus && currentStatus === 2) {
            useApi.editCache(addOrEditFormModel).then(() => {
                isShowAddOrEditForm.value = false
                list()
            });
        }
    }

    return {title, isShowAddOrEditForm, addOrEditFormView, addOrEditFormModel, clickAdd, clickEdit, doAddOrEdit}
}