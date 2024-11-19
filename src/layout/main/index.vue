<script setup lang='ts'>

</script>

<template>
  <!-- 路由组件出口位置 -->
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div class="component">
          <keep-alive>
            <component :is="Component" :key="$route.path"/>
          </keep-alive>
        </div>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.component {
  height: 100%;
}
</style>