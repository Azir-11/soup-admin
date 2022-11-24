<template>
  <aside class="shadow-xl">
    <section class="h-full">
      <Menu v-if="!app.isMobile" />
      <n-drawer
        v-else
        v-model:show="app.menuDrawerVisible"
        :placement="'left'"
        close-on-esc
        :native-scrollbar="true"
        :width="theme.sider.width"
      >
        <Menu />
      </n-drawer>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from "@/stores";
import { Menu } from "./components";

const app = useAppStore();
const theme = useThemeStore();
</script>
