import userApi from "@/api/rabc/UserApi";

export default function (list: () => void) {

    //const table = ref<InstanceType<typeof ElTable>>()
    //是否点击了批量删除
    //let enableBatchDelete = ref(false)
    //批量删除，选中的数据id
    //let batchDeleteId = ref<Array<any>>([])
    //表格行的选中状态改变时的回调函数
    // const handleSelectionChange = (val) => {
    //     batchDeleteId.value = val.map(item => {
    //         return item.id
    //     })
    // }
    //调用批量删除接口
    // const batchDelete = () => {
    //     //如果表格不是处于批量删除状态，则变成批量删除状态
    //     if (!enableBatchDelete.value) {
    //         enableBatchDelete.value = true
    //     }
    //     //如果表格处于批量删除状态，则先删除，再清空表格的批量删除状态
    //     else {
    //         if (batchDeleteId.value.length > 0) {
    //             doDelete(batchDeleteId.value)
    //         }
    //         //清空表格的批量删除状态
    //         enableBatchDelete.value = false
    //         batchDeleteId.value.length = 0
    //         table.value!.clearSelection()
    //     }
    // }
    //删除
    const doDelete = (ids: string[]) => {
        userApi.deleteById(ids).then(() => {
            list()
        })
    }

    return {doDelete}
}