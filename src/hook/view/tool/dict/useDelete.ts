import useApi from "@/api/tool/DictApi"

/**
 * created by yangtong on 2024/5/29 19:13:25
 * 字典的删除
 */
export default function (list: () => void) {

    const doDelete = (code: string) => {
        console.log(code)
        useApi.deleteDict(code).then(() => list())
    }

    return {doDelete}
}