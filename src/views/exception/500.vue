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
function goHome() {
  router.push("/");
}
</script>

<style scoped>
.page-container {
  width: 100%;
  border-radius: 4px;
  padding: 50px 0;
  height: 100vh;
}
.page-container .text-center h1 {
  color: #666;
  padding: 20px 0;
}
img {
  width: 350px;
  margin: 0 auto;
}
</style>
