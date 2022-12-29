<template>
  <hover-container class="h-full w-40px" @click="openSetting">
    <n-icon>
      <SettingsOutline />
    </n-icon>
  </hover-container>
</template>

<script setup lang="ts">
import { SettingsOutline } from "@vicons/ionicons5";
import { useAppStore } from "@/stores";

const app = useAppStore();

const openSetting = () => {
  app.openSettingDrawer();
};
</script>
