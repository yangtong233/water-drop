import {reactive, ref} from "vue";
import type SysDict from "@/type/view/tool/dict/SysDict";
import useApi from "@/api/tool/DictApi"

/**
 * created by yangtong on 2024/5/29 19:13:25
 * 字典新增与编辑
 */
export default function (list: () => void) {

    //新增或编辑表单的标题
    let title = ref("")

    //新增或编辑表单是否显示
    let isShowAddOrEditForm = ref(false);

    //新增或编辑表单的样式
    const addOrEditFormView: FormView<SysDict> = {
        "字典名称": {row: 1, key: "dictName"},
        "字典编码": {row: 1, key: "dictCode"},
        "排序": {row: 2, key: "sort", type:"number"},
        "字典描述": {row: 2, key: "dictDesc"},
    }

    //新增或编辑表单的数据
    const addOrEditFormModel = reactive<SysDict>({
        dictCode: "", dictDesc: "", dictName: "", id: "", itemText: "", itemValue: "", pid: "", sort: "", type: ""
    })

    //点击新增或编辑按钮, id是字典id
    const clickAddOrEdit = (id: string | undefined) =>{
        title.value = id ? "编辑" : "新增"
        isShowAddOrEditForm.value = true
        //编辑，先回显数据
        if (id) {
            useApi.queryById(id).then(dict => Object.assign(addOrEditFormModel, dict))
        }
        //新增
        else {
            for (let key in addOrEditFormModel) {
                if (addOrEditFormModel.hasOwnProperty(key)) {
                    addOrEditFormModel[key] = undefined
                }
            }
        }
    }

    //调用新增或编辑接口
    const doAddOrEdit = () => {
        useApi.addOrUpdate(addOrEditFormModel).then(res => {
            isShowAddOrEditForm.value = false
            list()
        })
    }

    return {title, isShowAddOrEditForm, addOrEditFormView, addOrEditFormModel, clickAddOrEdit, doAddOrEdit}
}