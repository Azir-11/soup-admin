<template>
  <div class="flex flex-col justify-center">
    <div class="flex-x-center">
      <img src="~@/assets/images/exception/500.svg" alt="" />
    </div>
    <div class="text-center">
      <h1 class="text-2xl py-4 text-gray-500">抱歉，服务器出错了</h1>
      <n-button type="info" @click="goHome">回到首页</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>
