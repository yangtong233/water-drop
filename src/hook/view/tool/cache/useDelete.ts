import useApi from "@/api/tool/CacheApi"

/**
 * created by yangtong on 2024/5/31 17:04:07
 * 缓存模块的删除相关代码
 */
export default function (list: () => void) {

    const doDelete = (key: string) => {
        useApi.deleteCache(key).then(() => {
            list()
        })
    }

    return {doDelete}
}