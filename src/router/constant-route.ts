import type SysPermission from "@/type/view/rabc/permission/SysPermission";

const login: SysPermission = {
    id: "login",
    pid: "0",
    sort: 0,
    code: 'Login',
    name: "登录",
    type: 1,
    routerPath: "/login",
    routerComponent: "/view/login/Login.vue",
    visible: false,
    icon: "",
    children: []
}

const home: SysPermission = {
    id: "layout",
    pid: "0",
    sort: 0,
    code: 'Layout',
    name: "布局",
    type: 1,
    routerPath: "/",
    redirect: "/home",
    visible: true,
    icon: "Promotion",
    children: [
        {
            id: "home",
            pid: "0",
            sort: 0,
            code: 'Home',
            name: "首页",
            type: 1,
            routerPath: "/home",
            routerComponent: "/view/home/index.vue",
            visible: true,
            icon: "Avatar",
            children: []
        }
    ]
}

/**
 * 放在控制台报警告：No match found for location with path "xxx"
 */
const notFound: SysPermission = {
    id: "notFound",
    pid: "0",
    code: "",
    type: 1,
    routerPath: "/:catchAll(.*)",
    routerComponent: "/view/404/index.vue",
    visible: false,
    children: []
}

const constantRoutes: SysPermission[] = [
    login,
    home,
    notFound
]

export default constantRoutes