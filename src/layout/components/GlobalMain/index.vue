<template>
  <main
    class="w-full flex-grow transition-all duration-300 bg-gray-100 dark:bg-black overflow-visible"
  >
    <div class="p-6 h-full">
      <RouterView v-slot="{ Component, route }">
        <transition :name="theme.pageAnimateMode" mode="out-in" :appear="true">
          <keep-alive :include="routeStore.cacheRoutes">
            <component :is="Component" v-if="app.reloadFlag" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </RouterView>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useThemeStore, useRouteStore, useAppStore } from "@/stores";

const theme = useThemeStore();
const app = useAppStore();

const routeStore = useRouteStore();
</script>
