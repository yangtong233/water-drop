<script setup lang="ts">
import type IPageResp from "@/type/common/IPageResp";

defineProps<{
  page: IPageResp,
  change: (current: number, size: number) => void
}>()

</script>

<template>
  <div class="pagination-box">
    <el-pagination
        v-model:current-page="page.current"
        v-model:page-size="page.size"
        :page-sizes="[10, 20, 30, 50]"
        :small="true"
        layout="total, prev, pager, next, jumper, sizes"
        v-model:total="page.total"
        @change="change"
    />
  </div>
</template>

<style scoped>
.pagination-box {
  display: flex;
  justify-content: right;
  margin-top: 20px;
}
</style>