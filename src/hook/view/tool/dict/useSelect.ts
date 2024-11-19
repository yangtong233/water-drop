import {onMounted, reactive} from "vue";
import type SysDictReq from "@/type/view/tool/dict/SysDictReq";
import type SysDict from "@/type/view/tool/dict/SysDict";
import type IPageResp from "@/type/common/IPageResp";
import useApi from "@/api/tool/DictApi"

/**
 * created by yangtong on 2024/5/29 19:13:25
 * 字典的查询相关模块
 */
export default function () {
    //查询条件表单的视图结构
    const searchBoxView: FormView<SysDictReq> = {
        "字典名称": {row: 1, key: "dictName"},
        "字典编码": {row: 1, key: "dictCode"}
    }
    //查询条件表单的数据
    const searchBoxModel = reactive<SysDictReq>({
        current: 0,
        size: 0,
        dictCode: "",
        dictName: "",
        itemText: "",
        itemValue: "",
        type: ""
    })

    //分页查询响应数据
    const pageResp = reactive<IPageResp<SysDict>>({
        current: 1,
        size: 10,
        pages: 0,
        total: 0,
        records: []
    })

    //分页查询表格的视图结构
    const tableView: TableView<SysDict> = [
        {title: "字典名称", type: "text", prop: "dictName"},
        {title: "字典编码", type: "text", prop: "dictCode"},
        {title: "排序", type: "text", prop: "sort"},
        {title: "描述", type: "text", prop: "dictDesc"},
        {title: "创建时间", type: "text", prop: "createTime"},
        {title: "修改时间", type: "text", prop: "updateTime"},
        {title: "操作", type: "operation", fixed: "right", width: 220},
    ]

    //调用分页查询接口
    const list = () => {
        useApi.listDict(searchBoxModel).then(page => {
            pageResp.records = page.records
        })
    }

    //分页数据改变时回调函数
    const change = (current: number, size: number) => {
        pageResp.current = current
        pageResp.size = size
        searchBoxModel.current = current
        searchBoxModel.size = size
        //分页数据改变后，重新查询
        list()
    }

    //钩子函数
    onMounted(() => list())

    return {searchBoxView, searchBoxModel, pageResp, tableView, list, change}
}