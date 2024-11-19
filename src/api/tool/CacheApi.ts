import BaseApi from "@/api/BaseApi";
import type CacheObjResp from "@/type/view/tool/cache/CacheObjResp";
import type AddOrEditCacheReq from "@/type/view/tool/cache/AddOrEditCacheReq";

/**
 * created by yangtong on 2024/5/31 17:20:21
 */
class CacheApi extends BaseApi {
    constructor() {
        super('/tool/cache/')
    }

    /**
     * 查询缓存数据
     */
    listCache = (key: { key: string }) => {
        return this.get<Array<CacheObjResp>, { key: string }>('listCache', key)
    }

    /**
     * 新增缓存数据
     */
    addCache = (cache: AddOrEditCacheReq) => {
        return this.post<string, AddOrEditCacheReq>("addCache", cache)
    }

    /**
     * 编辑缓存数据
     */
    editCache = (cache: AddOrEditCacheReq) => {
        return this.put<string, AddOrEditCacheReq>("editCache", cache)
    }

    /**
     * 删除缓存数据
     */
    deleteCache = (key: string) => {
        return this.delete<string>("deleteCache", [key])
    }
}

export default new CacheApi()