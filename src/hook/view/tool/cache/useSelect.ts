import {onMounted, reactive, ref} from "vue";
import useApi from "@/api/tool/CacheApi"
import type CacheObjResp from "@/type/view/tool/cache/CacheObjResp";

/**
 * created by yangtong on 2024/5/31 17:04:07
 * 缓存模块的查询相关代码
 */
export default function () {

    //查询条件表单的视图
    const searchBoxView: FormView<{ key: string }> = {
        "缓存key": {row: 1, key: "key", type: "text"}
    }
    //查询条件表单的数据
    let searchKey = reactive<{ key: string }>({key: ""})

    //表格视图
    const tableView: TableView<CacheObjResp> = [
        {title: "缓存key", prop: "key", type: "text", overflow: true},
        {title: "缓存数据类型", prop: "type", type: "text", overflow: true},
        {title: "缓存value", prop: "value", type: "text", overflow: true},
        {title: "创建时间", prop: "createTime", type: "text", width: 200},
        {title: "过期时间(s)", prop: "timeout", type: "text", width: 100},
        {title: "操作", type: "operation", width: 135}
    ]

    //表格数据
    const tableModel = ref<Array<CacheObjResp>>([])

    //调用缓存查询接口
    const list = () => {
        useApi.listCache(searchKey).then(list => {
            tableModel.value = list
        })
    }

    onMounted(() => list())

    return {searchBoxView, searchKey, tableView, tableModel, list}
}