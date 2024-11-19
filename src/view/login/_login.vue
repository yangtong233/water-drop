<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import { ElNotification } from 'element-plus'
import type UserLogin from "@/type/common/UserLogin";
import sysApi from "@/api/sys/SysApi";
import usePinia from "@/store";
import {useRouter, useRoute} from 'vue-router'
const pinia = usePinia()
const router = useRouter()
const route = useRoute()

let switchCtn: any = null
let switchC1: any = null
let switchC2: any = null
let switchCircle: any = null
let switchBtn: any = null
let aContainer: any = null
let bContainer: any = null
let allButtons: any = null


let changeForm = () => {
  animation()
  toggleClass()
}
// 播放动画
let animation = () => {
  switchCtn?.classList.add("is-gx");
  setTimeout(function() {
    switchCtn?.classList.remove("is-gx");
  }, 1500)
}

// 修改类名
let toggleClass = () => {
  //toggle表示添加或移除指定类名，有就移除，无就添加
  switchCtn?.classList.toggle("is-txr");
  switchCircle[0].classList.toggle("is-txr");
  switchCircle[1].classList.toggle("is-txr");

  switchC1?.classList.toggle("is-hidden");
  switchC2?.classList.toggle("is-hidden");
  aContainer?.classList.toggle("is-txl");
  bContainer?.classList.toggle("is-txl");
  bContainer?.classList.toggle("is-z");
}

onMounted(() => {
  switchCtn = document.querySelector("#switch-cnt");
  switchC1 = document.querySelector("#switch-c1");
  switchC2 = document.querySelector("#switch-c2");
  switchCircle = document.querySelectorAll(".switch_circle");
  switchBtn = document.querySelectorAll(".switch-btn");
  aContainer = document.querySelector("#a-container");
  bContainer = document.querySelector("#b-container");
  allButtons = document.querySelectorAll(".submit");

  toggleClass()

  getCaptcha()
})

const userLogin = reactive<UserLogin>(
    {
      captcha: "",
      captchaUUID: "",
      password: "",
      userName: ""
    }
)
let captchaStr = ref<string>("")
const getCaptcha = () => {
  sysApi.getCaptcha().then(data => {
    userLogin.captchaUUID = data.uuid
    captchaStr.value = data.base64ImgStr
  })
}

const login = () => {
  sysApi.login(userLogin).then((data) => {
    ElNotification({
      title: '登录成功',
      message: '登录成功',
      type: 'success',
    })
    Object.assign(pinia, data)
    pinia.updatePermission(data.permissions)
    pinia.setToken(data.token)
    router.replace((route.query.redirect ?? "/") as string)
  }).catch(err => {
    pinia.clearToken()
    getCaptcha()
  })
}
</script>

<template>
  <div class="main">
    <div class="shell">
      <div class="container a-container" id="a-container">
        <form action="" method="" class="form" id="a-form">
          <h2 class="form_title title">注册账号</h2>
          <!-- <span class="form_span">选择注册方式活电子邮箱注册</span> -->
          <input type="text" class="form_input" placeholder="账号">
          <input type="text" class="form_input form_input_middle" placeholder="密码">
          <input type="text" class="form_input" placeholder="确认密码">
          <button class="form_button button submit" @click.prevent>Resgiter</button>
        </form>
      </div>

      <div class="container b-container" id="b-container">
        <form action="" method="" class="form" id="b-form">
          <h2 class="form_title title">登录账号</h2>
          <!-- <span class="form_span">选择登录方式活电子邮箱登录</span> -->
          <input type="text" class="form_input" placeholder="账号" v-model="userLogin.userName">
          <input type="password" class="form_input form_input_middle" placeholder="密码" required
                 v-model="userLogin.password">
          <div class="captcha">
            <input type="text" class="form_input" placeholder="验证码" v-model="userLogin.captcha">
            <img class="captchaImg" :src="`data:image/png;base64,${captchaStr}`" alt="#" @click="getCaptcha"/>
          </div>

          <a class="form_link">忘记密码？</a>
          <button class="form_button button submit" @click.prevent="login">Login</button>
        </form>
      </div>

      <div class="switch" id="switch-cnt">
        <div class="switch_circle"></div>
        <div class="switch_circle switch_circle-t"></div>
        <div class="switch_container" id="switch-c1">
          <h2 class="switch_title title" style="letter-spacing: 0;">Welcome Back！</h2>
          <p class="switch_description description">已有账号？去登录吧!</p>
          <button class="switch_button button switch-btn" @click.prevent="changeForm()">To Login</button>
        </div>

        <div class="switch_container is-hidden" id="switch-c2">
          <h2 class="switch_title title" style="letter-spacing: 0;">Hello Friend！</h2>
          <p class="switch_description description">还没有账号？来注册一个!</p>
          <button class="switch_button button switch-btn" @click.prevent="changeForm()">To Resgiter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main * {
  /* 字体无法选中 */
  user-select: none;
}

.main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: var(--login-backgroud-color);
  color: #a0a5a8;
  overflow: hidden;
}

.shell {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  height: 600px;
  min-height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;

  transition-property: all;
  transition-duration: 0.25s;
  transition-timing-function: linear;
}

/* 设置响应式 */
@media (max-width: 1200px) {
  .shell {
    transform: scale(0.7);
  }
}

@media (max-width: 992px) {
  .shell {
    transform: scale(0.6);
  }
}

@media (max-width: 768px) {
  .shell {
    transform: scale(0.5);
  }
}

@media (max-width: 600px) {
  .shell {
    transform: scale(0.4);
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: 1.25s;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.form_input {
  width: 63%;
  height: 40px;
  padding-left: 25px;
  font-size: 18px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.captcha {
  width: 63%;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

.captchaImg {
  width: 35%;
  height: 40px;
  border-radius: 8px;
}

.captcha .form_input {
  width: 60%;
}

.form_input_middle {
  margin: 20px 0;
}

.form_input:focus {
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #ffffff;
}

.form_span {
  margin-top: 20px;
  margin-bottom: 12px;
}

.form_link {
  color: #181818;
  font-size: 15px;
  margin-top: 25px;
  border-bottom: 1px solid #a0a5a8;
  line-height: 2;
  cursor: pointer;
}

.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #181818;
  letter-spacing: 10px;
}

.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}

.button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4B70E2;
  color: #f9f9f9;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
}

.a-container {
  z-index: 100;
  left: calc(100% - 600px);
}

.b-container {
  left: calc(100% - 600px);
  z-index: 0;
}

.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 400px;
  padding: 50px;
  z-index: 200;
  transition: 1.25s;
  background-color: #ecf0f3;
  overflow: hidden;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
}

.switch_circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
  bottom: -60%;
  left: -60%;
  transition: 1.25s;
}

.switch_circle-t {
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}

.switch_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 400px;
  padding: 50px 55px;
  transition: 1.25s;
}

.switch_button,
.submit {
  cursor: pointer;
}

.switch_button:hover,
.submit:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  transition: 0.2s;
  background-color: #4766D8;
}

.switch_button:active,
.switch_button:focus,
.submit:active {
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  transform: scale(0.95);
  transition: 0.25s;
}

.is-txr {
  left: calc(100% - 400px);
  transition: 1.25s;
  transform-origin: left;
}

.is-txl {
  left: 0;
  transition: 1.25s;
  transform-origin: right;
}

.is-z {
  z-index: 200;
  transition: 1.25s;
}

.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}

.is-gx {
  animation: is-gx 1.25s;
}

@keyframes is-gx {

  0%,
  10%,
  100% {
    width: 400px;
  }

  30%,
  50% {
    width: 500px;
  }
}
</style>
