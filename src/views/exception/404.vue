<template>
  <div class="flex flex-col justify-center page-container w-full rounded-2xl py-12">
    <div class="text-center">
      <img src="~@/assets/images/exception/404.svg" alt="" class="w-1/3" />
    </div>
    <div class="text-center">
      <h1 class="text-2xl text-gray-500">抱歉，你访问的页面不存在</h1>
      <n-button class="text-xl" type="info" @click="goHome">回到首页</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goHome() {
  router.push("/");
}
</script>
