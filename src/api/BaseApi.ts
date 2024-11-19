import {type AxiosInstance} from 'axios'
import axiosInstance from '@/util/request'
import type IResp from '@/type/common/IResp'
import responseHandler from "@/util/RespHandler";

/**
 * 后端响应的数据格式都是固定的，用一个接口CommonResponse来表示响应的数据格式
 */
abstract class BaseApi {
    protected readonly prefix: string
    protected request: AxiosInstance

    /**
     * 构造器，进行一些初始化工作
     * @param prefix 前缀，对于同一个模块的不同接口，其前缀一般都是固定的
     */
    protected constructor(prefix: string) {
        if (!prefix.endsWith('/')) {
            prefix = prefix + '/'
        }
        this.prefix = prefix
        this.request = axiosInstance
    }

    /**
     * @description 发送get请求
     * @param uri get请求路径
     * @param {P }params get请求参数
     * @return {R} get请求返回值，将响应对象CommonResponse的data参数抽取出来，封装成Promise对象返回
     * @template R CommonResponse的data属性类型
     * @template P get请求的请求行参数类型，默认类型是never* resultHandler会统一处理响应值CommonResponse
     * 返回值为Promise的表达式，如果加了await，返回值就变成Promise里装的值
     */
    protected get = async <R = any, P extends object = never>(uri: string, params?: P): Promise<R> => {
        this.handlerParam<P>(params)
        const response = await this.request.get<never, IResp<R>>(`${this.prefix}${uri}`, {params})
        return responseHandler<R>(response);
    }

    /**
     * @description 发送post请求
     * @param uri post请求路径
     * @param {T} data post请求体参数
     * @param {P} params post请求行参数
     * @return {R} post请求返回值，将响应对象CommonResponse的data参数抽取出来，封装成Promise对象返回
     * @template R post请求返回值类型
     * @template T post请求的请求体参数类型
     * @template P post请求的请求行参数类型
     */
    protected post = async <R = any, T extends object = never, P extends object = never>(uri: string, data?: T, params?: P): Promise<R> => {
        this.handlerParam<P>(params)
        const response = await this.request.post<never, IResp<R>>(`${this.prefix}${uri}`, data, {params});
        return responseHandler<R>(response);
    }

    /**
     * @description 发送put请求
     * @param uri put请求路径
     * @param {T} data put请求体参数
     * @param {P} params put请求行参数
     * @return {R} put请求返回值，将响应对象CommonResponse的data参数抽取出来，封装成Promise对象返回
     * @template R put请求返回值类型
     * @template T put请求的请求体参数类型
     * @template P put请求的请求行参数类型
     */
    protected put = async <R = any, T extends object = never, P extends object = never>(uri: string, data?: T, params?: P): Promise<R> => {
        this.handlerParam<P>(params)
        const response = await this.request.put<never, IResp<R>>(`${this.prefix}${uri}`, data, {params});
        return responseHandler<R>(response);
    }

    /**
     * 发送delete请求，restful规范里删除数据的请求
     * 强制规定删除只能通过id，且参数放在请求路径中，示例：delete/1,2,3,4,5
     * @param uri delete请求路径
     * @param params 即将被删除的数据id，数组形式
     * @return {R} delete请求返回值，将响应对象CommonResponse的data参数抽取出来，封装成Promise对象返回
     * @template R delete请求返回值类型
     */
    protected delete = async <R = any>(uri: string, params: string[]): Promise<R> => {
        if (params && params.length > 0) {
            const response = await this.request.delete<never, IResp<R>>(`${this.prefix}${uri}/${params.join(",")}`);
            return responseHandler<R>(response);
        }
        return Promise.reject('delete请求必须指定id参数')
    }

    /**上面的函数，只能用于返回值为CommonResponse的一般接口，对于非一般接口(比如文件下载接口，响应体装的是二进制流)，需要额外处理*/

    protected upload = () => {

    }

    protected download = () => {

    }

    /**
     * 如果参数对象params存在空属性，则剔除这些属性
     * eg: {name:"zs", age:null, hobbies: []} -> {name:"zs"}
     * @param params
     */
    private handlerParam = <P>(params?: P) => {
        if (params) {
            for (let key in params) {
                //如果某个字段为空，则删除这个字段
                if (params[key] === undefined || params[key] === null) {
                    delete params[key]
                }
                //如果字符串字段为空字符串，则删除这个字段
                else if (typeof params[key] === "string" && (<string>params[key]).trim() === "") {
                    delete params[key]
                }
                //如果数组字段为空数组，则删除这个字段
                else if (Array.isArray(params[key]) && (<Array<any>>params[key]).length === 0) {
                    delete params[key]
                }
            }
        }
    }
}

export default BaseApi