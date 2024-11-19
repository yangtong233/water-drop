/**
 * 路由守卫
 */
import router from "@/router/index";
import usePinia from '@/store/index'
import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import useApi from "@/api/rabc/UserApi";
import Cookie from "js-cookie";
import sysApi from "@/api/sys/SysApi";

/**
 * 每次路由跳转前，都会回调前置守卫
 * @param to 到哪去
 * @param from 从哪来
 * @param next 调用该回调函数放行路由
 */
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    let pinia = usePinia()
    //从cookie中获取授权令牌
    let token = Cookie.get("Authorization")
    //未登录时
    if (!token) {
        //如果要跳转的路由是公共路由，直接放行
        if (to.path === "/login") {
            next()
        }
        //否则需要先登录，跳转到登录页面
        else {
            next({path: '/login', query: {redirect: to.path}})
        }
    }
    //登录时
    else {
        //已经登录则不能访问登录页面
        if (to.path === "/login") {
            next({path: '/home'})
        }
        //访问其他页面时
        else {
            //如果刷新了浏览器，则pinia数据会情空，此时需要重新给pinia添加资源数据
            if (pinia.permissions.length === 0) {
                console.log("用户数据被刷新，重新请求授权")
                useApi.getUserDetailByToken().then(userDetail => {
                    Object.assign(pinia, userDetail)
                    pinia.updatePermission(userDetail.permissions)
                    //next()会造成刷新后白屏
                    next({...to, replace: true})
                }).catch(error => {
                    console.log("授权不通过，跳到登录页面")
                    console.log(error)

                    //退出，然后跳转到登录页面
                    sysApi.logout().finally(() => {
                        Cookie.remove("Authorization")
                        next({path: '/login', query: {redirect: to.path}})
                    });
                })
            }
            //没有刷新浏览器，可以放行
            else {
                next()
            }
        }
    }
})

router.afterEach((to: any, from: any) => {
    document.title = to.meta.title
})
