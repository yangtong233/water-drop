import {defineStore} from 'pinia'
//hooks
import useLocal from "@/hook/pinia/useLocal";
import useUserInfo from "@/hook/pinia/useUserInfo";
import request from "@/util/request";
import type IResp from "@/type/common/IResp";

/**
 * 创建pinia大仓库
 *  参数1:该仓库的id
 *  参数2:仓库内容(为对象时即配置式写法，为函数时即setup组合式写法)
 */
const usePinia = defineStore('pinia', () => {
    /**
     * 本地持久化存储相关函数
     */
    const local = useLocal()

    /**
     * 用户相关信息
     */
    const userInfo = useUserInfo()

    return {...local, ...userInfo}
})

export default usePinia