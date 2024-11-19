<script lang="ts" setup>
import FormPlus from "@/component/FormPlus.vue";
import TablePlus from "@/component/TablePlus.vue";
import PopconfirmButton from "@/component/popconfirm-button.vue";

import useSelect from "@/hook/view/tool/dict/useSelect"
import useDictItem from "@/hook/view/tool/dict/useDictItem"
import useAddOrEdit from "@/hook/view/tool/dict/useAddOrEdit"
import useDelete from "@/hook/view/tool/dict/useDelete"
import Pagination from "@/component/Pagination.vue";

/**
 * 查询
 */
const {searchBoxView, searchBoxModel, pageResp, tableView, list, change} = useSelect()

/**
 * 字典的新增或编辑
 */
const {title, isShowAddOrEditForm, addOrEditFormView, addOrEditFormModel, clickAddOrEdit, doAddOrEdit} = useAddOrEdit(list)

/**
 * 字典的删除
 */
const {doDelete} = useDelete(list)

/**
 * 字典项
 */
const {
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
} = useDictItem()
</script>

<template>
  <!--表格相关区域-->
  <div class="dict-box">
    <!--条件查询区域-->
    <div class="search-box">
      <FormPlus :model="searchBoxModel" :view="searchBoxView"/>
      <el-button class="search" type="primary" @click="list">搜 索</el-button>
    </div>

    <!--表格操作区域-->
    <div class="center-box">
      <el-button type="success" size="small" @click="clickAddOrEdit(undefined)">新 增</el-button>
    </div>

    <!--表格主体-->
    <div class="table-box">
      <TablePlus :view="tableView" :data="pageResp.records" index border stripe>
        <!--操作列-->
        <template #default="{row}">
          <el-button size="small" @click="clickDictItem(row.id)">字典项</el-button>
          <el-button type="success" size="small" @click="clickAddOrEdit(row.id)">编辑</el-button>
          <popconfirm-button pop="确认删除?" :confirm="()=> doDelete(row.dictCode)" text="删除" type="danger" size="small"/>
        </template>
      </TablePlus>
    </div>

    <!--分页组件-->
    <div>
      <Pagination :page="pageResp" :change="change"></Pagination>
    </div>
  </div>

  <!--字典的新增或编辑表单-->
  <el-dialog v-model="isShowAddOrEditForm" :title="title" width="500">
    <FormPlus :view="addOrEditFormView" :model="addOrEditFormModel" label-width="auto" />

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShowAddOrEditForm = false">取消</el-button>
        <el-button type="success" @click="doAddOrEdit">提交</el-button>
      </div>
    </template>
  </el-dialog>

  <!--字典项表单-->
  <el-dialog v-model="isShowDictItemForm" width="500">
    <TablePlus :view="dictItemTableView" :data="dictItemTableModel" index stripe>
      <!--字典项名称插槽-->
      <template #itemText="{row}">
        <el-input v-if="row.isEdit === true" size="small" v-model="addOrEditDictItemModel.itemText"/>
      </template>
      <!--字典项值插槽-->
      <template #itemValue="{row}">
        <el-input v-if="row.isEdit === true" size="small" v-model="addOrEditDictItemModel.itemValue"/>
      </template>
      <!--字典项排序插槽-->
      <template #sort="{row}">
        <el-input-number v-if="row.isEdit === true" size="small"
                         v-model="addOrEditDictItemModel.sort"
                         style="max-width: 85px"/>
      </template>
      <!--字典项操作列插槽-->
      <template #default="{row}">
        <el-button v-if="!row.isEdit" type="success" size="small" @click="clickEditDictItem(row)" link>编辑</el-button>
        <el-button v-else type="primary" size="small" @click="doSaveDictItem(row)" link>保存</el-button>
        <popconfirm-button v-if="!row.isEdit" pop="确认删除?"
                           :confirm="()=> deleteDictItem(row)" text="删除"
                           type="danger" size="small" link/>
        <el-button v-else type="danger" size="small" link @click="clickCancel(row)">
          取消
        </el-button>
      </template>
    </TablePlus>
    <el-button class="mt-4" style="width: 100%;margin-top: 5px" @click="clickAddDictItem()">Add DictItem
    </el-button>
  </el-dialog>
</template>

<style scoped>
.dict-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-box {
  display: flex;
  justify-content: space-between;
  padding-top: 20px
}

.dict-box > * {
  margin: 5px 20px;
}
</style>