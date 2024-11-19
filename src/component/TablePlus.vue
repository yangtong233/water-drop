<script setup lang="ts">
defineProps<{
  /**
   * Table视图
   */
  view: TableView,
  /**
   * 索引列
   */
  index?: boolean
}>()

</script>

<template>
  <el-scrollbar>
    <el-table :row-key="row => row.id" v-bind="$attrs" style="width: 100%">
      <!--  索引列  -->
      <el-table-column v-if="index" align="center" fixed label="序号" type="index" width="70"></el-table-column>
      <!--  数据列  -->
      <el-table-column v-for="field in view"
                       :fixed="field.fixed"
                       :label="field.title"
                       :show-overflow-tooltip="field.overflow??undefined"
                       :width="field.width"
                       align="center">

        <template v-slot="{row}">
          <!-- 普通文本内容 -->
          <p v-if="field.type === 'text' && field.prop">
            {{
              field.callback ? field.callback(row) : field.options ? field.options[row[field.prop]] : row[field.prop]
            }}
          </p>

          <!-- tag数组内容 -->
          <el-tag v-for="tagText in row[field.prop]"
                  v-if="field.type === 'tag' && field.prop && Array.isArray(row[field.prop])"
                  :type="field.tagType">
            {{ field.callback ? field.callback(tagText) : field.options ? field.options[row[field.prop]] : tagText }}
          </el-tag>

          <!-- tag普通内容 -->
          <el-tag v-if="field.type === 'tag' && field.prop && !Array.isArray(row[field.prop])"
                  :type="row[field.prop] === true ? 'primary' : row[field.prop] === false ? 'danger' : ''">
            {{
              field.callback ? field.callback(row) : field.options ? field.options[row[field.prop]] : row[field.prop]
            }}
          </el-tag>

          <!-- 回调函数 -->
          <p v-if="field.type === 'callback'">{{ field.callback ? field.callback(row) : '' }}</p>

          <el-switch v-if="field.type === 'switch' && field.prop"
                     v-model="row[field.prop]"
                     :active-text="field.options?field.options['true']:''"
                     :inactive-text="field.options?field.options['false']:''">
          </el-switch>

          <!-- 插槽 -->
          <slot v-if="field.type === 'slot'" :name="field.slotName" :row="row">{{row[field.prop ?? field.slotName ?? '']}}</slot>

          <!-- 操作列 -->
          <slot v-if="field.type === 'operation'" :row="row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<style scoped>

</style>