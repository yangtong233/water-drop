<script setup lang="ts">

const emit = defineEmits(['update:modelValue'])
const updateValue = (value: String) => {
  emit('update:modelValue', value)
}

defineProps({
  data: {
    type: Array<RadioData>
  },
  modelValue: {
    type: String
  }
})

</script>

<template>

  <div class="radio-group">
    <span class="name">单选框</span>
    <label class="custom-radio" v-for="item in data">
      <input type="radio" name="option" :value="item.value" :checked="item.default ? item.default : false" @click="updateValue(item.value)">
      <span class="radio-btn"><i class="icon-check"></i></span>
      <span class="title">{{ item.title }}</span>
    </label>
  </div>
</template>

<style scoped>
.radio-group {
  display: flex; /* 使用flex布局使元素水平排列 */
  align-items: center; /* 垂直居中所有子项 */
  /*justify-content: center;*/ /* 水平居中 */
}

.name {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: var(--text-color);
  display: inline-block;
  text-align: right;
  margin-left: 25px;
  vertical-align: middle;
  overflow: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  letter-spacing: 2px;
}

.custom-radio {
  user-select: none;
  padding: 5px 10px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.custom-radio input[type="radio"] {
  opacity: 0;
  position: absolute;
}

.radio-btn {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  border: 1px solid #dcdfe6;
  display: inline-block;
  position: relative;
  margin-right: 10px;
  background-color: white; /* 默认背景色为白色 */
  transition: background-color 0.3s ease; /* 平滑过渡效果 */
}

.radio-btn::after {
  content: "";
  display: block;
  width: 8px; /* 中间小圆点的大小 */
  height: 8px;
  border-radius: 50%;
  background: white; /* 中间小圆点的颜色 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.7);
  opacity: 0; /* 默认不显示 */
}

.custom-radio input[type="radio"]:checked + .radio-btn::after {
  opacity: 1; /* 选中时显示中间的小白点 */
}

.custom-radio input[type="radio"]:checked + .radio-btn {
  background-color: #2196F3; /* 选中时背景色变为蓝色 */
}

.custom-radio input[type="radio"]:checked ~ .title {
  color: #2196F3;
}

.custom-radio:hover .radio-btn {
  border-color: #2196F3;
}
</style>