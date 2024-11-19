/**
 * created by yangtong on 2024/5/31 17:13:13
 * 查询缓存的响应数据
 */
export default interface CacheObjResp {
    /**
     * 缓存键
     */
    key: string

    /**
     * 缓存值
     */
    value: string

    /**
     * 缓存值类型
     */
    type: string

    /**
     * 缓存创建
     */
    createTime: string

    /**
     * 缓存过期时间
     */
    timeout: string
}