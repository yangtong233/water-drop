import {reactive, ref, watch} from "vue";
import type SysDict from "@/type/view/tool/dict/SysDict";
import useApi from "@/api/tool/DictApi"
import type SysDictItemAddOrEdit from "@/type/view/tool/dict/SysDictItemAddOrEdit";
import {ElMessage} from "element-plus";

/**
 * created by yangtong on 2024/5/29 20:09:36
 * 字典项
 */
export default function () {
    //字典项操作弹框是否显示
    let isShowDictItemForm = ref(false)

    //当前字典项属于哪个字典
    let currentDictId = ""

    //字典项表格的视图结构
    let dictItemTableView: TableView<SysDict> = [
        {title: "名称", type: "slot", slotName: "itemText", prop: "itemText"},
        {title: "值", type: "slot", slotName: "itemValue", prop: "itemValue"},
        {title: "排序", type: "slot", slotName: "sort"},
        {title: "操作", type: "operation", fixed: "right", width: 100},
    ]

    //字典项表格的数据
    let dictItemTableModel = ref<Array<SysDict>>([])

    //查询字典项
    const listDictItem = (id: string) => {
        useApi.listDictItemByPid(id).then(dictItems => {
            dictItemTableModel.value = dictItems
            console.log(dictItems)
        })
    }

    //点击字典项按钮的回调函数,id -> 字典id
    const clickDictItem = (id: string) => {
        currentDictId = id
        listDictItem(id)
        isShowDictItemForm.value = true
    }

    //字典项的新增和编辑模型数据
    const addOrEditDictItemModel = reactive<SysDictItemAddOrEdit>({
        id: undefined,
        itemText: "",
        itemValue: "",
        sort: 0
    })

    //确保如果字典项弹框关闭，addOrEditDictItemModel.id必须被置为undefined
    watch(isShowDictItemForm, (newVal) => {
        if (!newVal) {
            addOrEditDictItemModel.id = undefined
            currentDictId = ""
        }
    })

    //点击字典项列表的编辑按钮回调函数
    const clickEditDictItem = (row: any) => {
        if (addOrEditDictItemModel.id != undefined) {
            ElMessage({
                message: '请先保存上一项',
                type: 'error',
            })
            return
        }
        addOrEditDictItemModel.id = row.id
        addOrEditDictItemModel.itemText = row.itemText
        addOrEditDictItemModel.itemValue = row.itemValue
        addOrEditDictItemModel.sort = row.sort
        row['isEdit'] = true
    }

    //点击 Add DictItem 按钮的回调函数
    const clickAddDictItem = () => {
        if (addOrEditDictItemModel.id != undefined) {
            ElMessage({
                message: '请先保存上一项',
                type: 'error',
            })
            return
        }
        //每次新增清空缓存数据
        for (let key in addOrEditDictItemModel) {
            addOrEditDictItemModel[key] = undefined
        }
        addOrEditDictItemModel.id = ""
        addOrEditDictItemModel['isEdit'] = true

        // dictItemTableModel.value.push({itemValue:'', itemText:'', sort:'', isEdit: true} as SysDict)
        dictItemTableModel.value.push(addOrEditDictItemModel)
    }

    //调用保存字典项的接口
    const doSaveDictItem = (row: any) => {
        if ((row.itemText && row.itemText.length > 0) && (row.itemValue && row.itemValue.length > 0)) {
            const dictItem: any = {}
            Object.assign(dictItem, addOrEditDictItemModel)
            dictItem['pid'] = currentDictId
            dictItem['type'] = 0
            useApi.addOrUpdate(dictItem as SysDict).then(res => {
                clickDictItem(currentDictId)
                addOrEditDictItemModel.id = undefined
                row['isEdit'] = false
            })
        } else {
            ElMessage({
                message: '字典项的名称和值必须都不为空!',
                type: 'error',
            })
        }
    }

    //调用删除字典项的接口
    const deleteDictItem = (row: any) => {
        row['isEdit'] = false
        addOrEditDictItemModel.id = undefined
        useApi.deleteById(row.id).then(res => {
            clickDictItem(currentDictId)
        })
    }

    //点击字典项取消按钮的回调函数
    const clickCancel = (row: any) => {
        row.isEdit = false
        addOrEditDictItemModel.id = undefined
        dictItemTableModel.value = dictItemTableModel.value.filter(item => {
            return (item.itemText && item.itemText.length > 0) && (item.itemValue && item.itemValue.length > 0)
        })
    }

    return {
        isShowDictItemForm,
        dictItemTableView,
        dictItemTableModel,
        addOrEditDictItemModel,
        listDictItem,
        clickDictItem,
        clickEditDictItem,
        clickAddDictItem,
        doSaveDictItem,
        deleteDictItem,
        clickCancel
    }
}