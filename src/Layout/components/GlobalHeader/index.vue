<template>
  <header class="shadow-sm">
    <div class="flex h-full w-full items-center justify-between">
      <div class="flex h-full">
        <MenuCollapse />
        <!-- 在移动端不显示面包屑导航（太大了塞不下！） -->
        <div v-if="!app.isMobile && theme.header.crumb.visible" class="ml-4 flex items-center">
          <Breadcrumb />
        </div>
      </div>
      <div class="flex h-full items-center">
        <FullScreenVue />
        <ThemeMode />
        <GithubSite />
        <Setting />
        <UserAvatar />
      </div>
    </div>
    <SettingDrawer />
  </header>
</template>

<script setup lang="ts">
import { useThemeStore, useAppStore } from "@/stores";
import {
  Breadcrumb,
  SettingDrawer,
  UserAvatar,
  MenuCollapse,
  Setting,
  GithubSite,
  ThemeMode,
  FullScreenVue,
} from "./components";

const app = useAppStore();
const theme = useThemeStore();
</script>
