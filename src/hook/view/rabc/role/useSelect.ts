import type SysRolePageReq from "@/type/view/rabc/role/SysRolePageReq";
import {reactive, ref, watch} from "vue";
import type SysRole from "@/type/view/rabc/role/SysRole";
import type IPageResp from "@/type/common/IPageResp";
import useApi from "@/api/rabc/RoleApi"

/**
 * 角色模块的查询功能
 */
export default function () {

    //分页请求查询参数
    const reqParam = reactive<SysRolePageReq>({
        current: 1,
        size: 10,
        roleName: "",
        roleCode: "",
        roleStatus: undefined
    })

    //分页查询表单结构
    const searchView: FormView<SysRolePageReq> = {
        "角色名称": {row: 1, key: "roleName"},
        "角色编码": {row: 1, key: "roleCode"},
        "角色状态": {
            row: 1,
            key: "roleStatus",
            type: "select",
            options: [{title: "正常", value: true}, {title: "禁用", value: false}]
        },
    }

    watch(reqParam,(newValue) => {
        console.log(newValue)
    })

    //表格是否显示加载动画
    let loading = ref<boolean>(false);

    //表格结构
    const tableView: Array<ITableView<SysRole>> = [
        {title: "角色名称", prop: "roleName", type: "text"},
        {title: "角色编码", prop: "roleCode", type: "text"},
        {title: "角色状态", prop: "roleStatus", type: "tag", options: {true: "正常", false: "禁用"}},
        {title: "角色备注", prop: "roleRemark", type: "text", overflow: true},
        {title: "创建日期", prop: "createTime", type: "text"},
        {title: "修改日期", prop: "updateTime", type: "text"},
        {title: "操作", type: "operation", fixed: "right", width: 220},
    ]

    //分页响应数据
    const pageResp = reactive<IPageResp<SysRole>>({
        current: 1,
        size: 10,
        pages: 0,
        total: 0,
        records: [],
    })

    //发送分页查询请求
    const list = () => {
        useApi.list(reqParam).then((data) => {
            pageResp.records = data.records
            pageResp.current = data.current
            pageResp.size = data.size
            pageResp.pages = data.pages
            pageResp.total = data.total
        })
    }

    //分页数据改变时回调函数
    const change = (current: number, size: number) => {
        reqParam.current = current
        reqParam.size = size
        pageResp.current = current
        pageResp.size = size
        //分页数据改变后，重新查询
        list()
    }

    return {reqParam, searchView, loading, tableView, pageResp, list, change}
}