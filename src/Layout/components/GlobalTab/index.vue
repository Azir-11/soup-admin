<template>
  <section class="w-screen shadow-md flex items-end">
    <div class="px-6 w-full flex">
      <n-tabs
        :value="tab.activeTab"
        class="flex flex-col-reverse"
        type="card"
        @close="tab.removeTab"
      >
        <n-tab
          v-for="item in tab.tabs"
          :key="item.fullPath"
          :name="item.fullPath"
          :closable="item.name !== tab.homeTab.name"
          :dark-mode="theme.darkMode"
          @click="tab.handleClickTab(item.fullPath)"
          @contextmenu="handleContextMenu($event, item.fullPath)"
        >
          <svg-icon
            :icon="item.meta.icon"
            :local-icon="item.meta.localIcon"
            class="inline-block align-text-bottom mr-4px text-16px"
          />
          {{ item.meta.title }}
        </n-tab>
      </n-tabs>
      <div class="w-[64px]" :style="`height:${theme.tab.height}px`">
        <div
          class="flex-center h-full cursor-pointer dark:hover:bg-[#333] hover:bg-[#f6f6f6]"
          @click="handleRefresh"
        >
          <icon-mdi-refresh class="text-22px" :class="{ 'animate-spin': refreshLoading }" />
        </div>
      </div>
      <context-menu
        :visible="dropdown.visible"
        :current-path="dropdown.currentPath"
        :x="dropdown.x"
        :y="dropdown.y"
        @update:visible="handleDropdownVisible"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTabStore, useThemeStore, useAppStore } from "@/stores";
import { ContextMenu } from "./components";

interface Emits {
  (e: "scroll", clientX: number): void;
}

const emit = defineEmits<Emits>();

const theme = useThemeStore();
const tab = useTabStore();
const app = useAppStore();

// 获取当前激活的tab的clientX
const tabRef = ref<HTMLElement>();
const getActiveTabClientX = async () => {
  await nextTick();
  if (tabRef.value && tabRef.value.children.length && tabRef.value.children[tab.activeTabIndex]) {
    const activeTabElement = tabRef.value.children[tab.activeTabIndex];
    const { x, width } = activeTabElement.getBoundingClientRect();
    const clientX = x + width / 2;
    setTimeout(() => {
      emit("scroll", clientX);
    }, 50);
  }
};

const dropdown = reactive({
  visible: false,
  x: 0,
  y: 0,
  currentPath: "",
});
const showDropdown = () => {
  dropdown.visible = true;
};
const hideDropdown = () => {
  dropdown.visible = false;
};
const setDropdown = (x: number, y: number, currentPath: string) => {
  Object.assign(dropdown, { x, y, currentPath });
};

let isClickContextMenu = false;

const handleDropdownVisible = (visible: boolean) => {
  if (!isClickContextMenu) {
    dropdown.visible = visible;
  }
};

/** 点击右键菜单 */
const handleContextMenu = (e: MouseEvent, fullPath: string) => {
  e.preventDefault();

  const { clientX, clientY } = e;

  isClickContextMenu = true;

  const DURATION = dropdown.visible ? 150 : 0;

  hideDropdown();

  setTimeout(() => {
    setDropdown(clientX, clientY, fullPath);
    showDropdown();
    isClickContextMenu = false;
  }, DURATION);
};

watch(
  () => tab.activeTabIndex,
  () => {
    getActiveTabClientX();
  },
  {
    immediate: true,
  },
);

const route = useRoute();

const init = () => {
  tab.iniTabStore(route);
};

watch(
  () => route.fullPath,
  () => {
    tab.addTab(route);
    tab.setActiveTab(route.fullPath);
  },
);

// 刷新按钮
const refreshLoading = ref(false);
const handleRefresh = () => {
  refreshLoading.value = true;
  app.reloadPage();
  setTimeout(() => {
    refreshLoading.value = false;
  }, 1000);
};
// 初始化
init();
</script>

<style scoped>
.n-tabs {
  width: 95%;
}
</style>
