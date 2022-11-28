<template>
  <hover-container class="h-full w-40px" tooltip-content="主题模式" @click="changeCollapsed">
    <icon-line-md-menu-fold-left v-if="app.siderCollapse" class="text-16px" />
    <icon-line-md-menu-unfold-left v-else class="text-16px" />
  </hover-container>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores";

const app = useAppStore();

const changeCollapsed = () => {
  if (app.isMobile) {
    app.setSiderCollapse(false);
    app.setMenuDrawerVisible(true);
  } else {
    app.toggleSiderCollapse();
  }
};
</script>
