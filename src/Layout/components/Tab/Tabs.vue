<template>
  <div class="px-4 pt-2 h-12">
    <n-tabs :value="state.activeKey" type="card" @close="closeTabPane">
      <n-tab
        v-for="(item, index) in tabsList"
        :key="index"
        :name="item.path"
        :closable="!item.meta.affix"
        @click="goPage(item.path)"
      >
        {{ item.meta.title }}
      </n-tab>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGo } from "@/utils";
import { useTabsViewStore } from "@/stores/modules/tabList";
import { PageEnum } from "@/enums/pageEnum";

const route = useRoute();
const router = useRouter();
const go = useGo();
const tabsViewStore = useTabsViewStore();
const message = window["$message"];

// 标签页列表
const tabsList: any = computed(() => tabsViewStore.tabsList);
const whiteList: string[] = [
  PageEnum.BASE_LOGIN_NAME,
  PageEnum.REDIRECT_NAME,
  PageEnum.ERROR_PAGE_NAME,
];

const state = reactive({
  activeKey: route.fullPath,
  isMultiHeaderFixed: false,
});

// 获取简易的路由对象
const getSimpleRoute = (route) => {
  const { fullPath, hash, meta, name, params, path, query } = route;
  return { fullPath, hash, meta, name, params, path, query };
};

watch(
  () => route.fullPath,
  (to) => {
    if (whiteList.includes(route.name as string)) return;
    state.activeKey = to;
    tabsViewStore.addTabs(getSimpleRoute(route));
  },
  { immediate: true },
);

/** 点击标签页跳转页面
 * @param {string} path 路径
 */
const goPage = (path: string) => {
  if (path === route.fullPath) return;
  state.activeKey = path;
  go(path, true);
};

/** 根据路径删除tabPane
 * @param {string} path 路径
 */
const closeTabPane = (path: String) => {
  console.log("path", path);
  const routeInfo = tabsList.value.find((item) => item.fullPath == path);
  removeTab(routeInfo);
};

// 关闭当前页面
const removeTab = (route) => {
  if (tabsList.value.length === 1) {
    message.warning("这已经是最后一页，不能再关闭了！");
    return;
  }
  tabsViewStore.closeCurrentTab(route);
  // 如果关闭的是当前页
  if (state.activeKey === route.fullPath) {
    const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
    state.activeKey = currentRoute.fullPath;
    router.push(currentRoute);
  }
};
</script>
