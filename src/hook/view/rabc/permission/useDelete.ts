import useApi from "@/api/rabc/PermissionApi"

/**
 * created by yangtong on 2024/5/24 15:20
 * 权限资源模块的删除
 */
export default function (list: () => void) {

    const doDelete = (id: string) => {
        useApi.deleteById([id]).then(() => list())
    }
    return {doDelete}
}