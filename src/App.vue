<template>
  <n-config-provider :locale="zhCN" :theme="getDarkTheme" :date-locale="dateZhCN" class="h-full">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { AppProvider } from "@/components/Application";
import { zhCN, dateZhCN, darkTheme } from "naive-ui";
import { useSystemSettingStore } from "@/stores/modules/systemSetting";

const systemStore = useSystemSettingStore();

const getDarkTheme = computed(() => (systemStore.darkTheme ? darkTheme : undefined));
</script>
