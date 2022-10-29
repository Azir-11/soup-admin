<template>
  <main>
    <div class="p-6 h-full">
      <RouterView v-slot="{ Component }">
        <transition :name="theme.pageAnimateMode" mode="out-in" :appear="true">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores";

const theme = useThemeStore();
</script>
