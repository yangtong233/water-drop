import {ref} from "vue";
import type {DrawerProps} from "element-plus";
import {ElTree} from "element-plus";

import useApi from "@/api/rabc/PermissionApi"
import type SysRolePermission from "@/type/view/rabc/permission/SysRolePermission";
import type SysPermissionResetReq from "@/type/view/rabc/permission/SysPermissionResetReq";

/**
 * created by yangtong on 2024/5/28 16:51:45
 * 给角色分配资源
 */
export default function () {

    //树形组件实例
    const treeRef = ref<InstanceType<typeof ElTree>>()

    //当前分配资源的侧边栏是属于哪个角色的
    let currentRoleId = ref('')

    //分配资源的侧边栏是否显示
    let enableDraw = ref(false)

    //侧边栏显示的方向
    let direction = ref<DrawerProps['direction']>('rtl')

    //角色-资源对照关系
    const rolePermissions = ref<Array<SysRolePermission>>([])

    //调用接口查询角色-资源对照关系
    const listRolePermission = (roleId: string) => {
        useApi.listRolePermission(roleId).then((list) => {
            rolePermissions.value = list
        })
    }

    const clickAssignRole = (roleId: string) => {
        currentRoleId.value = roleId
        listRolePermission(roleId)
        enableDraw.value = true;
    }

    //递归计算树的哪些节点是被选中的
    const computeCheckedNodeId = (nodeIdArr: Array<string>, rpArr: Array<SysRolePermission>) => {
        if (!rpArr || rpArr.length === 0) {
            return nodeIdArr
        }
        for (let rp of rpArr) {
            //只记录叶子节点的id
            if (rp.roleId && (!rp.children || rp.children.length === 0)) {
                nodeIdArr.push(rp.permissionId)
            }
            computeCheckedNodeId(nodeIdArr, rp.children)
        }
        return nodeIdArr
    }

    //提交按钮回调函数
    const submit = () => {
        let checkedKeys = treeRef.value!.getCheckedKeys()
        if (checkedKeys.length > 0) {
            for (let halfCheckedKey of treeRef.value!.getHalfCheckedKeys()) {
                checkedKeys.push(halfCheckedKey)
            }

        }
        const permissionResetReq: SysPermissionResetReq = {
            roleId: currentRoleId.value,
            permissionIds: <string[]>checkedKeys
        }
        useApi.resetPermission(permissionResetReq).then(() => enableDraw.value = false)
    }

    return {
        treeRef,
        enableDraw,
        direction,
        rolePermissions,
        listRolePermission,
        clickAssignRole,
        computeCheckedNodeId,
        submit
    }
}