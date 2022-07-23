<template>
  <RouterView v-slot="{ Component }" class="bg-white p-1.5">
    <transition :name="animateName" mode="out-in" appear>
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
const animates = [
  { value: "zoom-fade", label: "渐变" },
  { value: "zoom-out", label: "闪现" },
  { value: "fade-slide", label: "滑动" },
  { value: "fade", label: "消退" },
  { value: "fade-bottom", label: "底部消退" },
  { value: "fade-scale", label: "缩放消退" },
];
// TODO:切换效果待完善
const animateName = animates[2].value;
</script>

<style lang="less" scoped>
@import "@/styles/index.less";
</style>
