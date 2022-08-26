<template>
  <n-config-provider :locale="zhCN" :theme="getDarkTheme" :date-locale="dateZhCN">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { AppProvider } from "@/components/Application";
import { RouterView } from "vue-router";
import { zhCN, dateZhCN, darkTheme } from "naive-ui";
import { useSystemSettingStore } from "@/stores/modules/systemSetting";

const systemStore = useSystemSettingStore();

const getDarkTheme = computed(() => (systemStore.darkTheme ? darkTheme : undefined));
</script>

<style>
@import "@/assets/base.css";
</style>
