<script setup lang="ts">
import FormPlus from "@/component/FormPlus.vue";
import TablePlus from "@/component/TablePlus.vue";
import {onMounted} from "vue";
import Pagination from "@/component/Pagination.vue";
import PopconfirmButton from "@/component/popconfirm-button.vue";
//引入hook
import useSelect from "@/hook/view/rabc/role/useSelect"
import useAddOrEdit from "@/hook/view/rabc/role/useAddOrEdit"
import useDelete from "@/hook/view/rabc/role/useDelete"
import useAssignPermission from "@/hook/view/rabc/role/useAssignPermission"
import {ElTree} from "element-plus";

/**
 * 分页查询
 */
const {reqParam, searchView, loading, tableView, pageResp, list, change} = useSelect()

/**
 * 新增或编辑
 */
const {title, enableAddOrEditFormBox, addOrEditBoxModel, addOrEditBoxView, addOrEdit, doAddOrEdit} = useAddOrEdit(list)

/**
 * 删除
 */
const {doDelete} = useDelete(list)

/**
 * 分配资源
 */
const {
  treeRef,
  enableDraw,
  direction,
  rolePermissions,
  clickAssignRole,
  computeCheckedNodeId,
  submit
} = useAssignPermission()

/**
 * 钩子函数
 */
onMounted(() => {
  list()
})
</script>

<template>
  <div class="role-box">
    <!--条件查询-->
    <div class="search-box">
      <FormPlus :model="reqParam" :view="searchView"></FormPlus>
      <el-button class="search" type="primary" @click="list()">搜 索</el-button>
    </div>

    <!--表格操作区域-->
    <div class="center-box">
      <el-button type="success" size="small" @click="addOrEdit(undefined)">新 增</el-button>
    </div>

    <!--表格主体-->
    <div class="table-box">
      <TablePlus :view="tableView" :data="pageResp.records" :v-loading="loading" index border stripe>
        <template #default="{row}">
          <el-button size="small" @click="clickAssignRole(row.id)">资源</el-button>
          <el-button type="success" size="small" @click="addOrEdit(row.id)">编辑</el-button>
          <popconfirm-button pop="确认删除?" type="danger" size="small" text="删除" :confirm="() => doDelete(row.id)">
          </popconfirm-button>
        </template>
      </TablePlus>
    </div>

    <!--分页组件-->
    <div>
      <Pagination :page="pageResp" :change="change"></Pagination>
    </div>
  </div>

  <!-- 新增-编辑弹出框 -->
  <el-dialog v-model="enableAddOrEditFormBox" :title="title" width="500">
    <FormPlus :view="addOrEditBoxView" :model="addOrEditBoxModel" label-width="auto"></FormPlus>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="enableAddOrEditFormBox = false">取消</el-button>
        <el-button type="success" @click="doAddOrEdit">提交</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 分配资源侧边栏 -->
  <el-drawer v-model="enableDraw" :direction="direction" title="分配资源">
    <el-tree v-show="enableDraw" ref="treeRef" :data="rolePermissions"
             :default-checked-keys="computeCheckedNodeId([], rolePermissions)"
             :props="{children: 'children', label: 'permissionName'}"
             default-expand-all
             node-key="permissionId"
             show-checkbox
             check-on-click-node/>

    <!--底部-->
    <template #footer>
      <div style="flex: auto">
        <el-button @click="enableDraw = false">取消</el-button>
        <popconfirm-button pop="确定提交?" :confirm="submit" type="primary" text="提交"/>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>
.role-box {
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

.role-box > * {
  margin: 5px 20px;
}
</style>