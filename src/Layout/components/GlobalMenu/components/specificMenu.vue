<template>
  <n-layout has-sider class="h-full">
    <n-layout-sider
      bordered
      :collapsed="app.siderCollapse"
      :collapsed-width="theme.sider.collapsedWidth"
      collapse-mode="width"
      :inverted="theme.sider.inverted"
      :width="theme.sider.width"
    >
      <div
        class="flex items-center justify-center gap-3 border-b border-gray-200"
        :style="`height:${theme.header.height}px`"
      >
        <img src="@/assets/logo.svg" alt="logo" class="w-8" />
      </div>
      <n-menu
        :options="menus"
        :expanded-keys="openKeys"
        :value="selectedKeys"
        :collapsed="app.siderCollapse"
        :collapsed-width="theme.sider.collapsedWidth"
        :collapsed-icon-size="22"
        :indent="18"
        :inverted="theme.sider.inverted"
        @update:value="handleUpdateValue"
        @update:expanded-keys="menuExpanded"
    /></n-layout-sider>
  </n-layout>
</template>

<script setup lang="ts">
import type { MenuOption } from "naive-ui";
import { useAppStore, useRouteStore, useThemeStore } from "@/stores";
import { generatorMenu } from "@/utils/router";

const app = useAppStore();
const router = useRouter();
const asyncRouteStore = useRouteStore();
const theme = useThemeStore();
const menus = ref<any[]>([]);
const currentRoute = useRoute();

// 获取当前打开的子菜单
const emit = defineEmits(["clickMenuItem"]);
const matched = currentRoute.matched;

let openKeys = ref(
  (matched && matched.length ? matched.map((item) => item.name) : []) as Array<string>,
);

const selectedKeys = ref<string>(currentRoute.name as string);

const updateMenu = () => {
  menus.value = generatorMenu(asyncRouteStore.getMenus);
};

onMounted(() => {
  updateMenu();
});

// 跟随页面路由变化，切换菜单选中状态
watch(
  () => currentRoute.fullPath,
  () => {
    // updateMenu();
    const matched = currentRoute.matched;
    openKeys.value = matched.map((item) => item.name) as Array<string>;
    const activeMenu: string = (currentRoute.meta?.activeMenu as string) || "";
    selectedKeys.value = unref(activeMenu ? (activeMenu as string) : (currentRoute.name as string));
  },
);

// 点击菜单
const handleUpdateValue = (key: string, _item: MenuOption) => {
  if (/http(s)?:/.test(key)) {
    window.open(key);
  } else {
    router.push({ name: key });
  }
  emit("clickMenuItem", key);
};

/**
 * 展开菜单事件
 * @param thisOpenkeys 当前点击的菜单的key
 * 如果当前点击的菜单是已经展开的，则关闭，否则展开
 */
const menuExpanded = (thisOpenKeys: string[]) => {
  if (!thisOpenKeys) return;
  const latestOpenKey = thisOpenKeys.find((key) => openKeys.value.indexOf(key) === -1);
  const isExistChildren = findChildrenLen(latestOpenKey as string);
  openKeys.value = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : thisOpenKeys;
};
//查找是否存在子路由
const findChildrenLen = (key: string) => {
  if (!key) return false;
  const subRouteChildren: string[] = [];
  for (const { children, key } of unref(menus)) {
    if (children && children.length) {
      subRouteChildren.push(key as string);
    }
  }
  return subRouteChildren.includes(key);
};
</script>

<style scoped>
.n-menu {
  width: 100%;
}
</style>
