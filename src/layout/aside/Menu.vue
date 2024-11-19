<script setup lang='ts'>
import type SysPermission from '@/type/view/rabc/permission/SysPermission'
import Menu from '@/layout/aside/Menu.vue'

defineProps<{ menus: Array<SysPermission> }>()
</script>

<template>
  <!-- 遍历资源，生成菜单 -->
  <template v-for="item in menus">
    <!-- 如果当前遍历到的资源存在子资源并且子资源数量大于1，则递归 -->
    <el-sub-menu v-if="item.visible && item.children && item.children.length > 1" :index="item.routerPath" class="menu">
      <template #title>
        <!--el-menu在使用图标时，最好以下面的方式使用，否则菜单折叠时图标会闪烁一下，视觉效果不好-->
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <Menu :menus="item.children"></Menu>
    </el-sub-menu>

    <!-- 有子资源但是只有一个 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item v-if="item.children[0].visible" :index="item.children[0].routerPath">
        <el-icon>
          <component :is="item.children[0].icon"></component>
        </el-icon>
        <template #title><span>{{ item.children[0].name }}</span></template>
      </el-menu-item>
    </template>

    <!-- 如果当前遍历到的资源没有子资源，则直接显示 -->
    <template v-if="!item.children || item.children.length == 0">
      <el-menu-item v-if="item.visible" :index="item.routerPath" class="menu-item">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <template #title><span>{{ item.name }}</span></template>
      </el-menu-item>
    </template>
  </template>
</template>

<style scoped>
span{
  transition: 150ms all;
}
span:hover{
  transform: scale(1.15);
  font-weight: 600;
}
</style>