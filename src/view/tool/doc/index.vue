<script setup lang="ts">
import {ref} from "vue";

let url = `${import.meta.env.VITE_REQUEST_BASE_URL}doc.html`

let isShow = ref(true)
// let dom: any = undefined
// const swaggerIframe = ref()
//
// onActivated(() => {
//   if (dom) {
//     isShow.value = true
//   } else {
//     document.getElementById('iframeDiv')!.appendChild(swaggerIframe.value)
//   }
// })
//
// onDeactivated(() => {
//   dom = swaggerIframe
//   isShow.value = false
// })
window.open(url)

</script>

<template>
<!--  <iframe :src="url" v-show="isShow" ref="swaggerIframe">-->
<!--  </iframe>-->

</template>

<style scoped>
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>