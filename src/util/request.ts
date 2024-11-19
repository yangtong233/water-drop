import axios from 'axios'
import {ElNotification} from 'element-plus'
// import usePinia from "@/store";
//
// let getToken: () => string | undefined | null
/**
 * 创建axios实例，整个项目都将会使用该实例发送请求
 */
const request = axios.create({
    baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
    timeout: import.meta.env.VITE_REQUEST_TIME_OUT,
    withCredentials: true
})

/**
 * 添加并设置请求拦截器
 * 参数为一个回调函数，感觉回调函数的返回结果判断是否放行该请求
 */
request.interceptors.request.use(req => {
    // if (!getToken) {
    //     getToken = usePinia().getToken
    // }
    //req表示即将发送的请求，返回req表示放行请求，否则不发送该请求
    //const token = getToken()
    // if (token) {
    //     req.headers.Authorization = token
    // }
    return req
})

/**
 * 添加并设置响应拦截器
 * 有两个必传参数
 *  1.res:响应状态码为200时的回调函数
 *  2.errRes:响应状态码不为200时的回调函数
 */
request.interceptors.response.use(
    res => {
        return res.data
    }, errRes => {
        ElNotification({
            message: errRes.message,
            type: 'error',
        })
        return Promise.reject(errRes)
    }
)

export default request