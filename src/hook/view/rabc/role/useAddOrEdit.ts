import useApi from "@/api/rabc/RoleApi"
import {reactive, ref} from "vue";
import type SysRole from "@/type/view/rabc/role/SysRole";

/**
 * created by yangtong on 2024/5/24 15:20
 * 角色模块的新增与编辑功能
 */
export default function (list: () => void) {
    //新增-编辑框的标题
    let title = ref<string>("")

    //新增-编辑框显示与否
    const enableAddOrEditFormBox = ref(false)

    //新增或编辑的模型数据
    const addOrEditBoxModel = reactive<SysRole>({
        id: undefined,
        roleName: "",
        roleCode: "",
        roleRemark: "",
        roleStatus: true,
        createTime: undefined,
        updateTime: undefined
    })

    //新增或编辑表单的视图结构
    const addOrEditBoxView: FormView<SysRole> = {
        "角色名称": {row: 1, key: "roleName"}, "角色编码": {row: 1, key: "roleCode"},
        "角色状态": {row: 2, key: "roleStatus", type: "switch", active: "正常", inactive: "禁用"},
        "角色备注": {row: 12, key: "roleRemark", type: "textarea"},
    }

    //点击新增或编辑按钮
    const addOrEdit = (id: string | undefined) => {
        title.value = id ? '编辑' : '新增'
        enableAddOrEditFormBox.value = true
        //如果id不为空，说明是编辑
        if (id) {
            useApi.queryById(id).then((data) => {
                Object.assign(addOrEditBoxModel, data)
            })
        }
        //如果id为空，说明是新增
        else {
            for (let key in addOrEditBoxModel) {
                if (addOrEditBoxModel.hasOwnProperty(key)) {
                    addOrEditBoxModel[key] = undefined
                }
            }
        }
    }

    //调用角色新增或编辑接口
    const doAddOrEdit = () => {
        useApi.addOrUpdate(addOrEditBoxModel).then((result) => {
            list()
        })
        enableAddOrEditFormBox.value = false
    }

    return {title, enableAddOrEditFormBox, addOrEditBoxModel, addOrEditBoxView, addOrEdit, doAddOrEdit}
}