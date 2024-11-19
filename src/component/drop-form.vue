<script setup lang="ts">

import DropInput from "@/component/drop-input.vue";
import DropBtn from "@/component/drop-btn.vue";
import DropSwitch from "@/component/drop-switch.vue";
import {computed, ref} from "vue";
import DropRadio from "@/component/drop-radio.vue";

const props = defineProps<{
  name: string,
  handler?: (modelValues: Map<String, any>) => void,
  cancel?: () => void,
  data: Array<Array<IFormModel>>
}>()
//如果父组件没有传递要给handler函数，则使用默认函数
let defaultHandler = () => {
  console.log("请传递一个handler函数作为表单提交按钮的点击事件")
}
let _handler = ref(props.handler || defaultHandler)

const form = computed(() => {
  let data = props.data;
  data.forEach(item => {
    item.forEach(i => {
      i.value = ''
    })
    return data
  })
  return data
})


const getModelValues = (): Map<String, any> => {
  let map: Map<String, any> = new Map()
  form.value.forEach(item => {
    item.forEach(i => {
      map.set(i.key, i.value)
    })
  })
  return map
}

</script>

<!--一个封装的表单组件-->
<template>
  <div class="parent" @click="cancel">
    <div class="form-body" @click.stop>
      <div class="header">
        {{ name }}
      </div>

      <div class="center">
        <div class="row" v-for="items in form">
          <template v-for="item in items">
            <!--自定义组件使用v-model，就等价这两个 :modelValue="value" @update:modelValue="value=$event" ，给组件传值和接收组件的事件，至于组件内部怎么处理这两个东西就不关心了-->
            <!--可以改变modelValue成其他名称,v-model:newValue="value" 等价于-> :newValue="value" @update:newValue="value=$event" -->
            <DropInput v-if="!item.type || item.type==='text'" v-model="item.value" :title="item.title"></DropInput>
            <drop-switch v-if="item.type === 'switch'" v-model="item.value" :title="item.title"></drop-switch>
            <drop-radio
                v-if="item.type === 'radio'"
                :data="item.radioData"
                v-model="item.value"
                :title="item.title">
            </drop-radio>
          </template>

        </div>
      </div>

      <div class="footer">
        <drop-btn @click="_handler(getModelValues())">登录</drop-btn>
        <drop-btn type="normal" @click="cancel">Cancel</drop-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.parent {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding-top: 15vh;
  background-color: #0007;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 999;
}

.form-body {
  min-height: 300px;
  width: 600px;
  background-color: #FFF;
  border: 1px #dcdfe6 solid;
  box-shadow: #888 10px 10px 10px;

  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  letter-spacing: 3px;
}

.header {
  text-align: left;
  height: 40px;
  line-height: 40px;
  color: #25172b;
  font-size: 18px;
  margin: 0 20px;
}

.center .row {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.center .row * {
  flex: 1 1 0;
}

.footer {
  height: 40px;
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.footer * {
  margin-left: 20px;
}
</style>