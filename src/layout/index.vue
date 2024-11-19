<script setup lang="ts">
import Top from '@/layout/top/index.vue';
import Main from '@/layout/main/index.vue'
import Menu from "@/layout/aside/Menu.vue";
import usePinia from '@/store/index'
import {ref} from "vue";
import Avatar from "@/layout/aside/Avatar.vue";
import Bottom from "@/layout/aside/Bottom.vue";
import DropBtn from "@/component/drop-btn.vue";
import $router from '@/router';

let pinia = usePinia()

let isCollapse = ref<boolean>(false)
</script>

<template>
  <div class="layout">

    <!--侧边栏区域-->
    <div class="aside">
      <!--侧边栏头像-->
      <div class="aside-avatar">
        <Avatar :isCollapse="isCollapse"></Avatar>
      </div>

      <!-- 侧边栏菜单 -->
      <el-scrollbar>
        <el-menu :default-active="$router.currentRoute.value.fullPath" class="aside-menu" router background-color="transparent" :collapse="isCollapse">
          <Menu :menus="pinia.permissions"></Menu>
        </el-menu>
      </el-scrollbar>

      <!--侧边栏底部-->
      <div class="avatar-bottom">
        <Bottom>
          <drop-btn style="width: 50px" @click="isCollapse = !isCollapse">12</drop-btn>
        </Bottom>
      </div>
    </div>

    <!-- 内容区 -->
    <div class="content">
      <!--顶部内容-->
      <Top class="top"></Top>
      <!--主体内容-->
      <Main class="main"></Main>
      <!--<Main class="main"></Main>-->
    </div>
  </div>
</template>

<style scoped>
.layout {
  height: 100%;
  display: flex;
}

.aside {
  /*给侧边栏开启flex弹性布局，主轴方向从上到下*/
  display: flex;
  flex-direction: column;
  /*主轴对齐方式*/
  justify-content: space-between;
  /*侧轴对齐方式*/
  align-items: stretch;
  border-right: solid 1px #dcdfe6;
}

.aside-avatar {
  height: 60px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.aside-menu {
  border-right: none;
}

.aside-menu:not(.el-menu--collapse) {
  width: 200px;
}

.avatar-bottom {
  height: 50px;
  flex-shrink: 0;
}

.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  /*这个设置可以保证如果子元素宽度很大时，该元素不会被撑得移除屏幕*/
  min-width: 0;
  position: relative;
}

.top {
  height: 40px;
  border-bottom: 1px solid #e5e7eb;
  margin: 10px 0 0 10px;
  display: flex;
}

.main{
  display: flex;
  flex-direction: column;
  /*justify-content: center;
  align-items: center;*/
  flex-grow: 1;
  user-select: text;
}
</style>