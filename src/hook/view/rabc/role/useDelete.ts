import useApi from "@/api/rabc/RoleApi"

/**
 * created by yangtong on 2024/5/24 15:20
 * 角色模块的删除功能
 */
export default function (list: () => void) {

    const doDelete = (id: string) => {
        useApi.deleteById([id]).then(() => list())
    }
    return {doDelete}
}