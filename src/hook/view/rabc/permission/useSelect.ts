import useApi from "@/api/rabc/PermissionApi";
import type SysPermissionPageReq from "@/type/view/rabc/permission/SysPermissionPageReq";
import {reactive} from "vue";
import type SysPermission from "@/type/view/rabc/permission/SysPermission";
import type IPageResp from "@/type/common/IPageResp";

/**
 * created by yangtong on 2024/5/26 22:02
 * 权限资源模块的查询hooks
 */
export default function () {

    //分页查询的请求参数
    const pageParam = reactive<SysPermissionPageReq>({
        current: 1,
        size: 10
    })

    //分页查询表单结构
    const searchView: FormView<SysPermission> = {
        "资源名称": {row: 1, key: "name"},
        "资源标识": {row: 1, key: "code"},
        "资源类型": {
            row: 1,
            key: "type",
            type: "select",
            options: [{title: "菜单", value: 1}, {title: "按钮", value: 2}]
        }
    }

    //分页查询响应数据
    const pageTreeResp = reactive<IPageResp<SysPermission>>({
        current: 0,
        size: 0,
        pages: 0,
        total: 0,
        records: [],
    })

    //资源表格结构
    const tableView: Array<ITableView<SysPermission>> = [
        {title: "展开", type: "text", width: 90},
        {title: "序号", prop: "sort", type: "text", width: 90},
        {title: "资源名称", prop: "name", type: "text", width: 150},
        {title: "资源编码", prop: "code", type: "text", width: 150},
        {title: "资源图标", prop: "icon", type: "slot", slotName: "icon", width: 150},
        {
            title: "资源类型",
            prop: "type",
            type: "tag",
            options: {0: "按钮", 1: "菜单"},
            width: 150
        },
        {title: "路由地址", prop: "routerPath", type: "text", width: 150},
        {title: "组件地址", prop: "routerComponent", type: "text", overflow: true, width: 150},
        {
            title: "显示与否",
            prop: "visible",
            type: "tag",
            options: {true: "显示", false: "隐藏"},
            width: 150
        },
        {title: "备注", prop: "remark", type: "text", overflow: true, width: 250},
        {title: "操作", type: "operation", fixed: "right", width: 220}
    ]

    //分页查询资源的树状数据
    const pageTree = () => {
        useApi.pageTree(pageParam).then(data => {
            pageTreeResp.records = data.records
            pageTreeResp.current = data.current
            pageTreeResp.size = data.size
            pageTreeResp.pages = data.pages
            pageTreeResp.total = data.total
        })
    }

    //分页数据改变时回调函数
    const change = (current: number, size: number) => {
        pageTreeResp.current = current
        pageTreeResp.size = size
        pageParam.current = current
        pageParam.size = size
        //分页数据改变后，重新查询
        pageTree()
    }

    return {pageParam, searchView, pageTreeResp, tableView, pageTree, change}
}