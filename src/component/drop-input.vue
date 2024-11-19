<script setup lang="ts">

import {computed} from "vue";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  title: {
    type: String,
    default: ' '
  },
  password: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
  },
  modelValue: {
    type: String
  }
})
let nameWidth = computed(() => {
  return props.title.length * 20 + 'px'
})

const updateValue = (e: Event) => {
  let inputElement = <HTMLInputElement>e.target
  if (inputElement) {
    emit('update:modelValue', inputElement.value)
  }
}
</script>

<template>
  <div class="input-box">
    <div class="input-item" style="min-height: 0">
      <!--这个span就是为了对齐下面的提示消息，本身没什么用-->
      <span style="visibility: hidden;height: 0">{{ title }}</span>
      <div class="message">ok</div>
    </div>
    <!--该组件本质就是基于下面的input标签-->
    <div class="input-item">
      <span>{{ title }}</span>
      <input :type="password ? 'password' : 'text'" placeholder="请输入..." :value="modelValue" @input="updateValue"
             required/>
    </div>

    <div class="input-item" style="min-height: 0">
      <!--这个span就是为了对齐下面的提示消息，本身没什么用-->
      <span style="visibility: hidden;height: 0">{{ title }}</span>
      <div class="message">ok</div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.input-box {
  min-width: 0;
}

.input-item {
  display: flex;
  flex-direction: row;
  padding: 0 10px 0 10px;
  min-height: 35px;
}

input {
  min-width: 0;
  font-size: 15px;
  outline: none;
  padding: 0 10px;
  border: 1px #e5e7ec solid;
  border-radius: 2px;
  color: var(--text-color);
  flex-grow: 1;
  flex-shrink: 1;
}

input::placeholder {
  color: #a8abb2;
  font-size: 14px;
}

/* 使得placeholder在聚焦时消失 */
input:focus::placeholder {
  color: transparent;
}

input:hover {
  border: 1px #c0c4cc solid;
}

input:focus {
  border: 1px #409eff solid;
}

/**输入框标题**/
span {
  width: v-bind(nameWidth);
  color: var(--text-color);
  display: inline-block;
  flex-shrink: 0;
  text-align: center;
  line-height: 35px;
  letter-spacing: 2px;
  margin: 0 10px 0 10px;
  overflow: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/**提示消息**/
.message {
  color: red;
  font-size: 12px;
  margin-top: 2px;
  min-height: 0px;
  visibility: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>