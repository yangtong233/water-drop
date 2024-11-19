import type SysUser from "@/type/view/rabc/user/SysUser";
import {reactive, ref, watch} from "vue";
import userApi from "@/api/rabc/UserApi";

/**
 * 新增或编辑
 */
export default function (list: () => void) {
    //新增-编辑框的标题
    let title = ref<string>("")

    //新增-编辑框显示与否
    const enableAddOrEditFormBox = ref(false)

    //是否修改密码
    let updatePassword = ref(false)

    //新增或编辑的数据
    const formData = reactive<SysUser>({
        id: "",
        avatar: "",
        email: "",
        phone: "",
        realName: "",
        remark: "",
        roles: [],
        status: 1,
        userName: "",
        createTime: undefined,
        updateTime: undefined
    })

    //新增-编辑框的样式与绑定的值
    const addOrEditView: FormView<SysUser> = ({
        "用户名": {row: 1, key: "userName"}, "真实姓名": {row: 1, key: "realName"},
        "电话": {row: 2, key: "phone"}, "邮箱": {row: 2, key: "email"},
        "状态": {row: 3, key: "status", type: 'switch', active: '正常', inactive: '禁用'},
        "密码": {
            row: 4,
            key: "password",
            type: 'button',
            btnText: '修改密码',
            btnType: 'danger',
            btnSize: 'small',
            btnHandler: () => updatePassword.value = true
        },
        "备注": {row: 5, key: "remark", type: 'textarea'},
    })

    watch(updatePassword, (newValue) => {
        if (newValue) {
            addOrEditView.view["密码"] = {
                row: 4,
                key: "password",
                type: 'text-button',
                btnText: '退出',
                btnHandler: () => updatePassword.value = false
            }
        } else {
            addOrEditView.view["密码"] = {
                row: 4,
                key: "password",
                type: 'button',
                btnText: '修改密码',
                btnType: 'danger',
                btnSize: 'small',
                btnHandler: () => updatePassword.value = true
            }
            formData.password = undefined
            updatePassword.value = false
        }

    })


    //点击新增或编辑按钮的回调函数
    const addOrEdit = (id: any) => {
        title.value = id ? '编辑' : '新增'
        enableAddOrEditFormBox.value = true

        //编辑时
        if (id) {
            userApi.queryById(id).then((data) => {
                Object.assign(formData, data)
            })
        }
        //新增时
        else {
            for (let key in formData) {
                if (formData.hasOwnProperty(key)) {
                    formData[key] = undefined
                }
            }
        }
    }

    //调用新增或编辑用户数据的接口
    const doAddOrEdit = () => {
        userApi.addOrUpdate(formData).then((data) => {
            list()
        })

        enableAddOrEditFormBox.value = false
    }


    return {title, enableAddOrEditFormBox, formData, updatePassword, addOrEditView, addOrEdit, doAddOrEdit}
}