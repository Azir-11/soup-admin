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
        :on-mask-click="handleUpdateValue"
        :width="theme.sider.width"
      >
        <Menu @click-menu-item="handleUpdateValue" />
      </n-drawer>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from "@/stores";
import { Menu } from "./components";

const app = useAppStore();
const theme = useThemeStore();
const thisShowSideDrawder = ref(false);

const emit = defineEmits(["update:collapsed"]);

// 点击菜单
const handleUpdateValue = () => {
  emit("update:collapsed");
};
</script>

<style scoped>
.n-menu {
  width: 100%;
}
</style>
