<script setup lang="ts">
import {onMounted} from "vue";
import Pagination from "@/component/Pagination.vue";
import FormPlus from "@/component/FormPlus.vue";
import TablePlus from "@/component/TablePlus.vue";
//引入hooks
import useSelect from "@/hook/view/rabc/user/useSelect"
import useAddOrEdit from "@/hook/view/rabc/user/useAddOrEdit"
import useDelete from "@/hook/view/rabc/user/useDelete"
import useAssignRole from "@/hook/view/rabc/user/useAssignRole";
import PopconfirmButton from "@/component/popconfirm-button.vue";

/**
 * 分页Select
 */
const {loading, page, reqParam, searchBoxView, tableView, list, change} = useSelect()

/**
 * 新增或编辑
 */
const {title, enableAddOrEditFormBox, addOrEditView, formData, addOrEdit, doAddOrEdit} = useAddOrEdit(list)

/**
 * 删除
 */
const {doDelete} = useDelete(list)

/**
 * 分配角色
 */
const {enableAssignRoleBox, assignRoleTableView, assignRoleTableModel, clickAssignRole, assignRole, cancelRole} = useAssignRole()

/**
 * 生命周期钩子
 */
onMounted(() => {
  list()
})

</script>

<template>
  <!-- 表格相关区域 -->
  <div class="user-box">
    <!--条件查询区域-->
    <div class="search-box">
      <FormPlus :model="reqParam" :view="searchBoxView"/>
      <el-button class="search" type="primary" @click="list">搜 索</el-button>
    </div>

    <!--表格操作区域-->
    <div class="center-box">
      <el-button type="success" size="small" @click="addOrEdit(undefined)">新 增</el-button>
    </div>

    <!--表格主体-->
    <div class="table-box">
      <TablePlus :view="tableView" :data="page.records" :v-loading="loading" index border stripe>
        <!--状态-->
        <template #status="{row}">
          <el-tag v-if="row.status" type="primary">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
        <!--操作列-->
        <template #default="{row}">
          <el-button size="small" @click="clickAssignRole(row.id)">角色</el-button>
          <el-button type="success" size="small" @click="addOrEdit(row.id)">编辑</el-button>
          <el-popconfirm title="确认删除?"
                         confirm-button-text="是"
                         cancel-button-text="否"
                         @confirm="doDelete([row.id])">
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </TablePlus>
    </div>

    <!--分页组件-->
    <div>
      <Pagination :page="page" :change="change"></Pagination>
    </div>
  </div>

  <!-- 新增-编辑弹出框 -->
  <el-dialog v-model="enableAddOrEditFormBox" :title="title" width="500">
    <FormPlus :model="formData" :view="addOrEditView" label-width="auto"></FormPlus>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="enableAddOrEditFormBox = false">取消</el-button>
        <el-button type="success" @click="doAddOrEdit">提交</el-button>
      </div>
    </template>
  </el-dialog>

  <!--角色授权弹出框-->
  <el-dialog v-model="enableAssignRoleBox" title="分配角色" width="700">
    <TablePlus :view="assignRoleTableView" :data="assignRoleTableModel">
      <template #isAssign="{row}">
        <el-tag v-if="row.userId" type="success">已分配</el-tag>
        <el-tag v-else type="danger">未分配</el-tag>
      </template>
      <template #default="{row}">
        <popconfirm-button v-if="row.userId" pop="确认取消?" type="danger" size="small" text="取消" :confirm="() => cancelRole(row.roleId)" />
        <popconfirm-button v-else pop="确认分配?" type="success" size="small" text="分配" :confirm="() => assignRole(row.roleId)" />
      </template>
    </TablePlus>
  </el-dialog>
</template>

<style scoped>
.user-box {
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

.user-box > * {
  margin: 5px 20px;
}

</style>