<template>
  <main>
    <div class="p-6 h-full">
      <RouterView v-slot="{ Component, route }">
        <transition :name="theme.pageAnimateMode" mode="out-in" :appear="true">
          <keep-alive :include="routeStore.cacheRoutes">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </RouterView>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useThemeStore, useRouteStore } from "@/stores";

const theme = useThemeStore();

const routeStore = useRouteStore();
</script>
