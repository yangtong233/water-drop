<script setup lang="ts">

</script>

<template>
  <div class="dropdown">
    <button class="dropbtn">Dropdown Menu</button>
    <div class="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div>
</template>

<style scoped>
/* 下拉菜单按钮样式 */
.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* 下拉内容容器，初始时隐藏 */
.dropdown-content {
  display: block; /* 初始设为可见但透明 */
  opacity: 0; /* 透明度设为0，使其不可见 */
  visibility: hidden; /* 设置为hidden防止内容可点击 */
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  transition: opacity 0.5s, visibility 0.5s; /* 添加过渡效果 */
}

/* 链接样式 */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* 链接 - 鼠标悬停时的颜色变化 */
.dropdown-content a:hover {background-color: #f1f1f1}

/* 显示下拉菜单内容 */
.dropdown:hover .dropdown-content {
  opacity: 1; /* 透明度设为1，使其完全不透明 */
  visibility: visible; /* 设置为visible使内容显示 */
}

/* 下拉按钮悬停时的背景颜色 */
.dropbtn:hover {
  background-color: #3e8e41;
}
</style>