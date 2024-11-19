import type IResp from "@/type/common/IResp"
import {ref} from "vue";
import {ElNotification} from 'element-plus'

/**
 * 初始化系统执行操作的的hook
 */
export default () => {

    let tokenTimeOut: number = import.meta.env.VITE_TOKEN_TIME_OUT

    /**
     * 给本地缓存添加键值对
     * @param key
     * @param value
     */
    const setLocal = (key: string, value: string) => {
        localStorage.setItem(key, value)
    }

    /**
     * 根据key从本地缓存获取value
     * @param key
     */
    const getLocal = (key: string) => {
        return localStorage.getItem(key)
    }

    /**
     * 清除本地缓存
     * @param key 要清除的缓存key，如果不指定则清除所有缓存
     */
    const clearLocal = (...key: string[]) => {
        if (key && key.length > 0) {
            key.forEach(k => {
                localStorage.removeItem(k)
            })
        } else {
            localStorage.clear()
        }
    }

    const setToken = (value: string) => {
        setLocal("token", value)
        setLocal("tokenTimeOut", (Date.now() + tokenTimeOut * 1000) + "")
    }

    const getToken = () => {
        //判断token有没有过期
        if (Number(getLocal("tokenTimeOut")) < Date.now()) {
            clearLocal("token", "tokenTimeOut")
            return undefined
        } else {
            //没有过期，给token续期
            setLocal("tokenTimeOut", (Date.now() + 600 * 1000) + "")
            return getLocal("token")
        }

    }

    const clearToken = () => {
        clearLocal("token", "tokenTimeOut")
    }

    //向外部提供点东西
    return {
        setLocal, getLocal, clearLocal, setToken, getToken, clearToken
    }
}