import {nextTick} from "vue";
import type IResp from "@/type/common/IResp";
import {ElMessage, ElNotification} from 'element-plus'
// import useSystemInfo from "@/hooks/pinia/useLocal";
import router from "@/router/index";
import Cookie from "js-cookie";

// const {clearLocal} = useSystemInfo()

/**
 * 因为存在约定，所以对应一般的请求，接口返回值肯定是CommonResponse类型(例外：文件下载接口)
 * 所以可以在这里根据CommonResponse的字段对返回值进行统一处理
 * 统一处理后，剔除通用参数(success、code、msg...)，将真正的数据data包装成Promise返回，再由调用方进行进一步处理
 * async修饰的函数，会将返回封装一层Promise
 */
const RespHandler = async <R>(response: IResp<R>): Promise<R> => {

    //请求成功
    if (response.success) {
        //弹出正常提示
        if (response.message) {
            ElMessage({
                message: response.message,
                type: 'success',
            })
        }
        return response.data;
    }
    //请求异常
    else {
        //弹出错误提示
        ElNotification({
            message: response.message,
            type: 'error',
        })

        //响应码为-1表示需要重新登录
        if (response.code === 1 || response.code === 2) {
            //clearLocal()
            Cookie.remove("Authorization")
            await nextTick(() => {
                router.replace("/login")
            })

        }
        return Promise.reject(response.message)
    }
}

export default RespHandler