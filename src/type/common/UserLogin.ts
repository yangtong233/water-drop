/**
 * 用户登录相关信息
 */
export default interface UserLogin {
    //用户名
    userName: string,
    //登录密码
    password: string,
    //验证码
    captcha: string,
    //验证码UUID
    captchaUUID: string
}