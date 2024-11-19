<script setup lang="ts">
import DropInput from "@/component/drop-input.vue";
import DropBtn from "@/component/drop-btn.vue";
import sysApi from "@/api/sys/SysApi";
import {onMounted, ref} from "vue";
import type UserLogin from "@/type/common/UserLogin";
import usePinia from '@/store/index'
import {useRoute, useRouter} from "vue-router";
import {ElNotification} from "element-plus";
import currentTime from "@/util/hello";

let pinia = usePinia()
let $router = useRouter()
let $route = useRoute()
//登录页背景图片
const image = ref('url("./login_background.jpg")');

onMounted(() => {
  getCaptcha()
})

/**
 * 验证码相关代码
 */
let captcha = ref<string>()
let captchaUUID = ref<string>('')
const getCaptcha = () => {
  sysApi.getCaptcha().then(res => {
    captcha.value = "data:image/bmp;base64," + res.base64ImgStr
    captchaUUID.value = res.uuid
  })
}

/**
 * 登录相关代码
 */
let loginInfo = ref<UserLogin>({
  userName: 'admin',
  password: '1',
  captcha: '',
  captchaUUID: ''
})
//登录函数
const login = () => {
  loginInfo.value.captchaUUID = captchaUUID.value
  sysApi.login(loginInfo.value).then((data) => {
    //将用户数据存入pinia
    Object.assign(pinia, data)
    pinia.updatePermission(data.permissions)

    console.log(`${data.userName}登录成功!!!`)

    //跳转
    $router.replace(($route.query.redirect ?? "/") as string)
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: currentTime()
    })
  }).catch(() => {
    loginInfo.value.captcha = ''
    getCaptcha()
  })
}

</script>

<template>
  <div id="container">
    <div id="box">
      <div class="box-item"><h1>登 录</h1></div>
      <div class="box-item">
        <DropInput title="账 号" v-model="loginInfo.userName"></DropInput>
      </div>
      <div class="box-item">
        <DropInput title="密 码" v-model="loginInfo.password" password></DropInput>
      </div>
      <div class="box-item yzm">
        <DropInput title="验证码" v-model="loginInfo.captcha" @keyup.enter="login"></DropInput>
        <img :src="captcha" @click="getCaptcha" alt="出错啦!!!"/>
      </div>
      <div class="box-item">
        <drop-btn @click="login">Login</drop-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  background: v-bind(image);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}

#box {
  height: 400px;
  min-height: 300px;
  padding: 0 50px;
  background-color: #dedede;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0.9;
}

.box-item {
  text-align: center;
}

.yzm {
  display: flex;
  align-items: center;
}

.yzm img {
  width: 80px;
  height: 35px;
  flex-grow: 1;
  margin-right: 10px;
  border-radius: 2px;
}
</style>