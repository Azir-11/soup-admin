<template>
  <n-config-provider
    :locale="zhCN"
    :theme="undefined"
    :date-locale="dateZhCN">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { AppProvider } from "@/components/Application";
import { RouterView } from "vue-router";
  import { zhCN, dateZhCN, darkTheme } from 'naive-ui';
</script>

<style>
@import "@/assets/base.css";
</style>
