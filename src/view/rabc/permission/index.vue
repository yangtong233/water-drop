<script setup lang="ts">
import {onMounted} from "vue";
import FormPlus from "@/component/FormPlus.vue";
import TablePlus from "@/component/TablePlus.vue";
//引入hook
import useSelect from "@/hook/view/rabc/permission/useSelect"
import useAddOrEdit from "@/hook/view/rabc/permission/useAddOrEdit"
import useDelete from "@/hook/view/rabc/permission/useDelete"
import PopconfirmButton from "@/component/popconfirm-button.vue";
import Pagination from "@/component/Pagination.vue";

/**
 * 分页查询
 */
const {pageParam, searchView, pageTreeResp, tableView, pageTree, change} = useSelect()

/**
 * 新增-编辑-分配下级
 */
const {title, enableFormBox, permissionView, permissionModel, addOrEditOrAssign, doAddOrEditOrAssign} = useAddOrEdit(pageTree)
/**
 * 删除
 */
const {doDelete} = useDelete(pageTree)

/**
 * 钩子函数
 */
onMounted(() => {
  pageTree()
})
</script>

<template>
  <div class="permission-box">

    <div class="search-box">
      <FormPlus :model="pageParam" :view="searchView"></FormPlus>
      <el-button class="search" type="primary" @click="pageTree()">搜 索</el-button>
    </div>

    <!--表格操作区域-->
    <div class="center-box">
      <el-button type="success" size="small" @click="addOrEditOrAssign(undefined, undefined)">新 增</el-button>
    </div>

    <!--表格主体-->
    <div class="table-box">
      <TablePlus :tree-props="{ children: 'children' }" row="id" :view="tableView" :data="pageTreeResp.records" border>
        <template #icon="{row}">
          <el-icon>
            <component :is="row.icon"></component>
          </el-icon>
        </template>

        <template #default="{row}">
          <el-button size="small" type="primary" link @click="addOrEditOrAssign(undefined, row.id)">添加下级</el-button>
          <el-button size="small" type="success" link @click="addOrEditOrAssign(row.id, undefined)">编辑</el-button>
          <popconfirm-button pop="确认删除?" type="danger" size="small" text="删除" :confirm="() => doDelete(row.id)" link/>
        </template>
      </TablePlus>
    </div>

    <!--分页组件-->
    <div>
      <Pagination :page="pageTreeResp" :change="change"></Pagination>
    </div>
  </div>

  <!-- 新增-编辑-分配下级弹框 -->
  <el-dialog v-model="enableFormBox" :title="title" width="500">
    <FormPlus :view="permissionView" :model="permissionModel" label-width="auto"></FormPlus>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="enableFormBox = false">取消</el-button>
        <el-button type="success" @click="doAddOrEditOrAssign">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.permission-box {
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

.permission-box > * {
  margin: 5px 20px;
}

</style>