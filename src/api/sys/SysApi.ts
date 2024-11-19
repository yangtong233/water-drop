import BaseApi from "@/api/BaseApi"

import type UserLogin from "@/type/common/UserLogin";
import type SysUserDetail from "@/type/view/rabc/user/SysUserDetail";

class SysApi extends BaseApi {

    constructor() {
        super('/sys/')
    }

    /**
     * 获取登录验证码
     */
    getCaptcha = () => {
        return this.get<any, never>("getCaptcha")
    }

    /**
     * 登录
     * @param userLogin
     */
    login = (userLogin: UserLogin) => {
        return this.post<SysUserDetail, UserLogin>("login", userLogin)
    }

    /**
     * 退出
     */
    logout = () => {
        return this.post<SysUserDetail, UserLogin>("logout")
    }
}

export default new SysApi()
