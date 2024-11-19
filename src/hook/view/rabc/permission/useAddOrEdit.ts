import {reactive, ref, watch} from "vue";
import type SysRolePermission from "@/type/view/rabc/permission/SysRolePermission";
import useApi from "@/api/rabc/PermissionApi"
import type SysPermission from "@/type/view/rabc/permission/SysPermission";

/**
 * created by yangtong on 2024/5/26 22:02
 * 权限资源模块的新增、编辑、分配
 */
export default function (list: () => void) {

    let title = ref<string>("")

    //新增-编辑-分配下级框显示与否
    const enableFormBox = ref(false)

    //新增-编辑-分配下级表单的模型数据
    const permissionModel = reactive<SysPermission>({
        id: "",
        pid: "",
        routerPath: "",
        visible: false,
        code: "",
        type: 1
    })

    watch(permissionModel, newVal => {
        console.log(newVal)
    })

    //新增-编辑-分配下级表单的视图数据
    const permissionView: FormView<SysPermission> = {
        "资源名称": {row: 1, key: "name"}, "资源编码": {row: 1, key: "code"},
        "资源类型": {row: 2, key: "type", type: "select", options: [{value: '0', title: "按钮"}, {value: '1', title: "菜单"}]},
        "是否可见": {row: 2, key: "visible", type: "switch", active: "显示", inactive: "隐藏"},
        "路由地址": {row: 3, key: "routerPath"},
        "组件路径": {row: 4, key: "routerComponent"},
        "资源图标": {row: 5, key: "icon"}, "排序": {row: 5, key: "sort", type: "number"},
        "备注": {row: 6, key: "remark", type: "textarea"},
    }

    //分配-取消资源
    const rolePermission = reactive<SysRolePermission>({
        id: "",
        permissionCode: "",
        permissionId: "",
        permissionName: "",
        roleCode: "",
        roleId: "",
        roleName: ""
    })

    //点击新增-编辑-分配下级按钮的回调函数
    const addOrEditOrAssign = (id: string | undefined, pid: string | undefined) => {
        if (pid) {
            title.value = '分配下级'
        } else {
            title.value = id ? '编辑' : '新增'
        }
        enableFormBox.value = true
        //编辑
        if (id) {
            useApi.queryById(id).then(data => {
                Object.assign(permissionModel, data)
            })
        }
        //新增
        else {
            for (let key in permissionModel) {
                if (permissionModel.hasOwnProperty(key)) {
                    permissionModel[key] = undefined
                }
            }
            //分配下级
            if (pid) {
                permissionModel.pid = pid
            }
        }
    }

    //调用新增-编辑-分配下级接口
    const doAddOrEditOrAssign = () => {
        useApi.addOrUpdate(permissionModel).then(res => list())
        enableFormBox.value = false
    }

    return {title, enableFormBox, permissionView, permissionModel, rolePermission, addOrEditOrAssign, doAddOrEditOrAssign}
}