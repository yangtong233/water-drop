<script setup lang="ts">
import usePinia from '@/store/index'

let pinia = usePinia()

defineProps({
  isCollapse: {
    type: Boolean
  }
})
</script>

<template>
  <el-avatar class="avatar" shape="square" size="" fit="cover"
             :src="pinia.avatar" alt="错误"/>

  <span :class="`text ${isCollapse ? 'collapse' : ''}`">{{pinia.realName}}</span>
</template>

<style scoped>
.avatar {
  margin-left: 10px;
  line-height: 60px;
  transition: 200ms transform;
}

.avatar:hover {
  transform: scale(1.15);
  box-shadow: #666 2px 2px 5px;
}

.text {
  width: 149px;
  padding: 0 10px;
  overflow: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  transition: .4s all;
}

.collapse{
  padding: 0;
  width: 0;
  opacity: 0;
}

</style>