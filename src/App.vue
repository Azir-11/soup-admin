<template>
  <n-config-provider
    :locale="zhCN"
    :theme="theme.naiveTheme"
    :theme-overrides="theme.naiveThemeOverrides"
    :date-locale="dateZhCN"
    class="h-full"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { AppProvider } from "@/components/Application";
import { zhCN, dateZhCN, darkTheme } from "naive-ui";
import { subscribeStore, useThemeStore } from "@/stores";

const theme = useThemeStore();

// 开始订阅
subscribeStore();
</script>
