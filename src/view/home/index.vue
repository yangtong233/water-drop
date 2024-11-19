<script setup lang="ts">
import usePinia from '@/store/index'

const pinia = usePinia()
</script>

<template>
  <el-card>
    <h1>你好，{{ pinia.realName }}~</h1>
  </el-card>
</template>

<style scoped>
.el-card {
  height: 90%;
  margin: 20px;
}
h1 {
  text-align: center;
}
</style>