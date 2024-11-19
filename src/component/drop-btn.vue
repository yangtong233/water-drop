<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "primary"
  },
  size: {
    type: Number,
    default: 1
  }
})
const _size = computed(() => {
  return props.size
})
const _size_active = computed(() => {
  return props.size - 0.05
})

const style = getComputedStyle(document.documentElement)
let backgroundColor = style.getPropertyValue(`--${props.type}-btn-background-color`).trim();
let backgroundColorHover = style.getPropertyValue(`--${props.type}-btn-background-color-hover`).trim();
let backgroundColorActive = style.getPropertyValue(`--${props.type}-btn-background-color-active`).trim();
let fontSize = style.getPropertyValue(`--${props.type}-btn-font-size`).trim();
let fontWeight = style.getPropertyValue(`--${props.type}-btn-font-weight`).trim();
let letterSpacing = style.getPropertyValue(`--${props.type}-btn-letter-spacing`).trim();
let color = style.getPropertyValue(`--${props.type}-btn-color`).trim();
let colorHover = style.getPropertyValue(`--${props.type}-btn-color-hover`).trim();
let colorActive = style.getPropertyValue(`--${props.type}-btn-color-active`).trim();
let borderColor = style.getPropertyValue(`--${props.type}-btn-border-color`).trim();
let borderColorHover = style.getPropertyValue(`--${props.type}-btn-border-color-hover`).trim();
let borderColorActive = style.getPropertyValue(`--${props.type}-btn-border-color-active`).trim();
</script>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

button {
  /**按钮本身基础属性**/
  min-width: 65px;
  padding: 0 10px;
  height: 30px;
  background-color: v-bind(backgroundColor);
  /**按钮内部文字属性**/
  font-size: v-bind(fontSize);
  font-weight: v-bind(fontWeight);
  letter-spacing: v-bind(letterSpacing);
  color: v-bind(color);
  /**边框**/
  border: 1px v-bind(borderColor) solid;
  border-radius: 2px;
  /**阴影**/
  box-shadow: 2px 2px 3px #cbced1;
  /**过渡**/
  transition: 100ms all;
  transform: scale(v-bind(_size));
  user-select: none;
}

button:hover {
  background-color: v-bind(backgroundColorHover);
  color: v-bind(colorHover);
  border: 1px v-bind(borderColorHover) solid;
}

button:active {
  box-shadow: 3px 3px 10px #cbced1;
  background-color: v-bind(backgroundColorActive);
  color: v-bind(colorActive);
  border: 1px v-bind(borderColorActive) solid;
  transform: scale(v-bind(_size_active));
}
</style>