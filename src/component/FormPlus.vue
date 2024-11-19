<script setup lang="ts">
import "@/type/component/FormView"

import {computed} from "vue";

const props = defineProps<{
  model: any,
  view: FormView
}>()

/**
 * 模型
 */
const formModel = computed(() => props.model)

/**
 * 将使用者传来的原始视图对象FormView，转换成程序方便处理的视图对象FormItem[][]
 */
const formView = computed<FormItem[][]>(() => {
  let view = props.view;
  let map: Map<Number, FormItem[]> = new Map<Number, FormItem[]>()
  for (let key in view) {
    const current = view[key]
    let a: FormItem = {row: current.row, key: current.key, title: key}
    let arr = map.get(current.row)
    if (!arr) {
      Object.assign(a, current)
      map.set(current.row, [a])
    } else {
      Object.assign(a, current)
      arr.push(a)
      map.set(current.row, arr)
    }
  }

  let arr: FormItem[][] = []
  for (let entry of map.entries()) {
    arr[entry[0] as number - 1] = entry[1]
  }
  return arr
})

</script>

<template>
  <!-- 基于ElementPlus进行的二次开发 -->
  <div>
    <el-form v-bind="$attrs">
      <el-row class="row" :gutter="20" v-for="row in formView" justify="start" align="middle">
        <el-col v-for="item in row" :span="item.span??(24 / row.length)">
          <el-form-item :label="item.title">
            <!--输入框-->
            <el-input v-if="!item.type || item.type === 'text'"
                      v-model="formModel[item.key]"
                      :placeholder="item.title"
                      :disabled="item.disabled"
                      clearable>
            </el-input>

            <!--数字输入框-->
            <el-input-number v-if="item.type === 'number'"
                             v-model="formModel[item.key]"
                             :placeholder="item.title"
                             :disabled="item.disabled"
                             clearable>
            </el-input-number>

            <!--密码框-->
            <el-input v-if="item.type === 'password'"
                      type="password"
                      v-model="formModel[item.key]"
                      :disabled="item.disabled"
                      clearable show-password>
            </el-input>

            <!--按钮-->
            <el-button v-if="item.type === 'button'"
                       :size="item.btnSize??'small'"
                       :type="item.btnType??''"
                       :disabled="item.disabled"
                       @click="item.btnHandler">
              {{ item.btnText }}
            </el-button>

            <!--带按钮的输入框-->
            <el-input v-if="item.type === 'text-button'"
                      v-model="formModel[item.key]"
                      :disabled="item.disabled"
                      clearable>
              <template #append>
                <el-button @click="item.btnHandler" :size="item.btnSize??'small'" :type="item.btnType??''">
                  {{ item.btnText }}
                </el-button>
              </template>
            </el-input>

            <!--文本域-->
            <el-input v-if="item.type === 'textarea'"
                      v-model="formModel[item.key]"
                      type="textarea"
                      :disabled="item.disabled"/>

            <!--开关-->
            <el-switch v-if="item.type === 'switch'"
                       :active-text="item.active??undefined"
                       :inactive-text="item.inactive??undefined"
                       v-model="formModel[item.key]"
                       :disabled="item.disabled"/>

            <!--下拉框-->
            <el-select v-if="item.type === 'select'"
                       v-model="formModel[item.key]"
                       :placeholder="item.title"
                       :disabled="item.disabled" clearable>
              <el-option v-for="option in item.options" :label="option.title" :value="option.value"/>
            </el-select>

            <!--单选框-->
            <el-radio-group v-if="item.type === 'radio'" v-model="formModel[item.key]" :disabled="item.disabled">
              <el-radio v-for="radio in item.radioData" :value="radio.value">{{ radio.title }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>

</template>

<style scoped>
</style>