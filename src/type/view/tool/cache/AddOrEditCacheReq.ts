/**
 * created by yangtong on 2024/5/31 18:04:24
 * 缓存项
 */
export default interface AddOrEditCacheReq {
    /**
     * 缓存key
     */
    key: string;

    /**
     * 缓存值
     */
    value: any;

    /**
     * 过期时间，单位(s)
     */
    timeout: number;
}