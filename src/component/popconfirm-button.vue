<script setup lang="ts">
defineProps<{
  pop: string,
  confirm: () => void,
  type?: 'danger' | 'success' | 'info' | 'primary' | 'warning' | 'text',
  size?: 'small' | 'medium' | 'large' | 'huge' | 'default',
  text?: string,
}>()
</script>

<template>
  <el-popconfirm :title="pop"
                 confirm-button-text="是"
                 cancel-button-text="否"
                 @confirm="confirm"
                 v-bind="$attrs">
    <template #reference>
      <el-button :type="type" :size="size" v-bind="$attrs">
        <slot></slot>
        {{ text }}
      </el-button>
    </template>
  </el-popconfirm>
</template>

<style scoped>

</style>