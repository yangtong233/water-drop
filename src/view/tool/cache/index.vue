<script lang="ts" setup>
import FormPlus from "@/component/FormPlus.vue";
import TablePlus from "@/component/TablePlus.vue";
import PopconfirmButton from "@/component/popconfirm-button.vue";

import useSelect from "@/hook/view/tool/cache/useSelect"
import useAddOrEdit from "@/hook/view/tool/cache/useAddOrEdit"
import useDelete from "@/hook/view/tool/cache/useDelete"

/**
 * 缓存查询
 */
const {searchBoxView, searchKey, tableView, tableModel, list} = useSelect()

/**
 * 新增和编辑
 */
const {
  title,
  isShowAddOrEditForm,
  addOrEditFormView,
  addOrEditFormModel,
  clickAdd,
  clickEdit,
  doAddOrEdit
} = useAddOrEdit(list)

/**
 * 删除
 */
const {doDelete} = useDelete(list)
</script>

<template>
  <div class="cache-box">
    <!--条件查询区域-->
    <div class="search-box">
      <FormPlus :model="searchKey" :view="searchBoxView"/>
      <el-button class="search" type="primary" @click="list">搜 索</el-button>
    </div>

    <!--表格操作区域-->
    <div class="center-box">
      <el-button size="small" type="success" @click="clickAdd()">新 增</el-button>
    </div>

    <!--表格主体-->
    <div class="table-box">
      <TablePlus :data="tableModel" :view="tableView" border index stripe>
        <template #default="{row}">
          <el-button size="small" type="success" @click="clickEdit(row)">编辑</el-button>
          <popconfirm-button :confirm="()=> doDelete(row.key)" pop="确认删除?" size="small" text="删除" type="danger"/>
        </template>
      </TablePlus>
    </div>
  </div>

  <el-dialog v-model="isShowAddOrEditForm" :title="title" width="500">
    <FormPlus :model="addOrEditFormModel" :view="addOrEditFormView" label-width="auto"/>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShowAddOrEditForm = false">取消</el-button>
        <el-button type="success" @click="doAddOrEdit()">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.cache-box {
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

.cache-box > * {
  margin: 5px 20px;
}
</style>