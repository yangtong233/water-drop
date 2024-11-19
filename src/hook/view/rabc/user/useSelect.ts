import {reactive, ref} from "vue";
import type IPageResp from "@/type/common/IPageResp";
import userApi from "@/api/rabc/UserApi";
import type SysUser from "@/type/view/rabc/user/SysUser";
import type SysUserReq from "@/type/view/rabc/user/SysUserReq";

/**
 * 用户模块的查询hook
 * vue组件的script标签能写的东西，hook里都能写
 */
export default function () {

    //表格是否显示加载动画
    let loading = ref<boolean>(false);

    //分页响应数据
    const page = reactive<IPageResp<SysUser>>({
        current: 1,
        size: 10,
        pages: 0,
        total: 0,
        records: [],
    })

    //分页查询请求参数
    const reqParam = reactive<SysUserReq>({
        current: page.current,
        size: page.size,
        realName: undefined,
        roles: undefined,
        status: undefined,
        userName: undefined
    })

    //查询条件输入框的样式和映射的数据
    const searchBoxView: FormView = {
        "用户名": {row: 1, key: "userName"},
        "真实姓名": {row: 1, key: "realName"},
        "状态": {
            row: 1,
            key: "status",
            type: 'select',
            options: [{title: '正常', value: true}, {title: '禁用', value: false}]
        }
    }

    //调用分页接口获取分页数据
    const list = () => {
        userApi.list(reqParam).then((data) => {
            page.records = data.records
            page.current = data.current
            page.size = data.size
            page.pages = data.pages
            page.total = data.total
        }).finally(() => {
            loading.value = false
        })
    }

    //分页数据改变时回调函数
    const change = (current: number, size: number) => {
        reqParam.current = current
        reqParam.size = size
        page.current = current
        page.size = size
        //分页数据改变后，重新查询
        list()
    }

    //表格样式
    const tableView: Array<ITableView<SysUser>> = [
        {title: "用户名", prop: "userName", type: "text", width: 150},
        {title: "真实姓名", prop: "realName", type: "text", width: 150},
        {title: "电话", prop: "phone", type: "text", width: 150},
        {title: "邮箱", prop: "email", type: "text", width: 150, overflow: true},
        {title: "电话", prop: "phone", type: "text", width: 150},
        {title: "角色", prop: "roles", type: "tag", tagType: "success", width: 200},
        {title: "状态", prop: "status", type: "slot", slotName: "status", width: 100},
        {title: "备注", prop: "remark", type: "text", width: 300, overflow: true},
        {title: "创建日期", prop: "createTime", type: "text", width: 170},
        {title: "修改日期", prop: "updateTime", type: "text", width: 170},
        {title: "操作", type: "operation", fixed:"right", width: 220},
    ]


    //该函数向外提供东西
    return {loading, reqParam, page, searchBoxView, tableView, list, change}
}