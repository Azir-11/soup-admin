<template>
  <n-config-provider :locale="zhCN" :theme="theme" :date-locale="dateZhCN">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AppProvider } from "@/components/Application";
import { RouterView } from "vue-router";
import { zhCN, dateZhCN } from "naive-ui";

const theme = ref(null);
</script>

<style>
@import "@/assets/base.css";
</style>
