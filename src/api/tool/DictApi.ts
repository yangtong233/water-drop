import BaseApi from "@/api/BaseApi";
import type SysDictReq from "@/type/view/tool/dict/SysDictReq";
import type SysDict from "@/type/view/tool/dict/SysDict";
import type IPageResp from "@/type/common/IPageResp";

/**
 * created by yangtong on 2024/5/29 19:25:25
 */
class DictApi extends BaseApi {
    constructor() {
        super('/sys/dict/')
    }

    /**
     * 分页查询字典
     */
    listDict = (dictReq: SysDictReq) => {
        return this.get<IPageResp<SysDict>, SysDictReq>('listDict', dictReq)
    }

    /**
     * 根据父字典id查询的所有字典项
     */
    listDictItemByPid = (pid: string) => {
        return this.get<Array<SysDict>, { pid: string }>('listDictItemByPid', {pid})
    }

    /**
     * 根据字典code查询的所有字典项
     */
    listDictItemByCode = (code: string) => {
        return this.get<Record<any, any>, { code: string }>('listDictItemByCode', {code})
    }

    /**
     * 根据字典code和字典项value得到字典项的text
     */
    getItemText = (code: string, itemValue: any) => {
        return this.get<string, { code: string, itemValue: any }>('getItemText', {code, itemValue})
    }

    /**
     * 根据id查询字典或字典项
     */
    queryById = (id: string) => {
        return this.get<SysDict, { id: string }>('queryById', {id})
    }

    /**
     * 新增或编辑和字典项
     */
    addOrUpdate = (dict: SysDict) => {
        return this.post<string, SysDict>('addOrUpdate', dict)
    }

    /**
     * 根据code删除字典，及其该字典所属的字典项
     */
    deleteDict = (code: string) => {
        return this.delete<string>('deleteDict', [code])
    }

    /**
     * 根据id删除字典或字典项
     */
    deleteById = (id: string) => {
        return this.delete<string>('delete', [id])
    }

}

export default new DictApi()