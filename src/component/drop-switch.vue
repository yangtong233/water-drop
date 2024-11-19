<script setup lang="ts">

const emit = defineEmits(['update:modelValue'])
defineProps({
  title: {
    type: String
  },
  modelValue: {
    type: String
  }
})

const updateValue = (e: Event) => {
  let inputElement = e.target as HTMLInputElement
  if (inputElement && inputElement.checked != undefined) {
    console.log(inputElement.checked)
    emit('update:modelValue', inputElement.checked)
  }
}

</script>

<template>
  <!-- 开关按钮 -->
  <div class="switch-box">
    <label>{{ title }}</label>
    <label class="switch">
      <input type="checkbox" id="toggle" :value="modelValue" @input="updateValue">
      <span class="slider round"></span>
    </label>
  </div>

</template>

<style scoped>
.switch-box {
  height: 100%;
}

label{
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: var(--text-color);
  display: inline-block;
  text-align: right;
  margin-left: 28px;
  vertical-align: middle;
  overflow: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  letter-spacing: 2px;
}


/* 开关按钮的基本样式 */
.switch {
  position: relative;
  display: inline-block;
  top:2px;
  width: 60px; /* 宽度 */
  height: 30px; /* 高度 */
}

/* 隐藏默认的复选框 */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* 自定义滑块/滑条 */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc; /* 默认灰色背景 */
  transition: .4s; /* 动画过渡 */
  border-radius: 34px; /* 圆角边框 */
}

/* 滑块内的圆形 */
.slider:before {
  position: absolute;
  content: "";
  height: 22px; /* 滑块高度 */
  width: 22px; /* 滑块宽度 */
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%; /* 圆形 */
}

/* 选中时的滑块颜色变化 */
input:checked + .slider {
  background-color: #2196F3; /* 蓝色背景 */
}

/* 选中时滑块位置变化 */
input:checked + .slider:before {
  transform: translateX(26px); /* 移动滑块 */
}

/* 增加可访问性：焦点时的样式 */
input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}
</style>