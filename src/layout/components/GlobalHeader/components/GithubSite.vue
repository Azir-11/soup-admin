<template>
  <hover-container class="h-full w-40px" @click="handleClickLink">
    <icon-mdi-github class="text-20px" />
  </hover-container>
</template>

<script lang="ts" setup>
function handleClickLink() {
  window.open("https://github.com/soup-Lee/soup-admin", "_blank");
}
</script>

<style scoped></style>
