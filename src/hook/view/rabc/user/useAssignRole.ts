import {ref, watch} from "vue";
import type SysUserRoleResp from "@/type/view/rabc/user/SysUserRoleResp";
import useApi from "@/api/rabc/RoleApi"

/**
 * created by yangtong on 2024/5/25 22:32
 */
export default function () {
    //角色授权弹出框是否显示
    const enableAssignRoleBox = ref(false)

    //当前用户的id
    let currentUserId: string

    watch(enableAssignRoleBox, newValue => {
        if (!newValue) {
            currentUserId = ""
        }
    })

    //角色授权弹出框里的表格样式
    const assignRoleTableView: Array<ITableView<SysUserRoleResp>> = [
        {type: "text", title: "角色名称", prop: "roleName"},
        {type: "text", title: "角色code", prop: "roleCode"},
        {type: "slot", title: "是否分配", slotName: "isAssign"},
        {type: "operation", title: "操作"}
    ]

    //角色授权弹出框里的表格数据
    const assignRoleTableModel = ref<Array<SysUserRoleResp>>([])

    //查询指定用户的角色分配情况
    const listUserRole = (userId: string) => {
        useApi.listUserRole(userId).then(userRoleResp => {
            assignRoleTableModel.value = userRoleResp
        })

    }

    //给指定用户分配指定角色
    const assignRole = (roleId: string) => {
        useApi.assignRole({userId: currentUserId, roleId}).then(res => {
            listUserRole(currentUserId)
        })
    }

    //取消指定用户的指定角色
    const cancelRole = (roleId: string) => {
        useApi.cancelRole({userId: currentUserId, roleId}).then(res => {
            listUserRole(currentUserId)
        })
    }

    //点击用户列表角色按钮的回调函数
    const clickAssignRole = (userId: string) => {
        enableAssignRoleBox.value = true
        currentUserId = userId
        listUserRole(userId);
    }

    return {enableAssignRoleBox, assignRoleTableView, assignRoleTableModel, clickAssignRole, assignRole, cancelRole}
}