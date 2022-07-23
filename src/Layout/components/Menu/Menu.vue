<template>
  <n-space vertical>
    <n-layout has-sider>
      <n-menu
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menus"
        :expanded-keys="openKeys"
        :value="selectedKeys"
        @update:value="handleUpdateValue"
        @update:expanded-keys="menuExpanded"
      />
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, unref } from "vue";
import type { MenuOption } from "naive-ui";
import { useAsyncRouteStore } from "@/stores/modules/asyncRoute";
import { generatorMenu } from "@/utils";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const asyncRouteStore = useAsyncRouteStore();
const menus = ref<any[]>([]);
const currentRoute = useRoute();

// 获取当前打开的子菜单

const emit = defineEmits(["update:collapsed", "clickMenuItem"]);
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
