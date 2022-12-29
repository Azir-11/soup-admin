<template>
  <hover-container
    class="h-full w-40px"
    :inverted="theme.header.inverted"
    tooltip-content="主题模式"
    @click="handleSwitch"
  >
    <div class="flex-center text-18px cursor-pointer">
      <icon-mdi-moon-waning-crescent v-if="theme.darkMode" />
      <icon-mdi-white-balance-sunny v-else /></div
  ></hover-container>
</template>

<script lang="ts" setup>
import { useThemeStore } from "@/stores";

const theme = useThemeStore();
function handleSwitch() {
  theme.setDarkMode(!theme.darkMode);
}
</script>

<style scoped></style>
