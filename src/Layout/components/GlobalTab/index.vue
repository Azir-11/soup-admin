<template>
  <section class="w-full shadow-md flex items-end">
    <div class="px-6">
      <n-tabs :value="state.activeKey" type="card" @close="closeTabPane">
        <n-tab
          v-for="(item, index) in tabsList"
          :key="index"
          :name="item.path"
          :closable="!item.meta.affix"
          @click="goPage(item.path)"
          @contextmenu="handleContextMenu($event, item.path)"
        >
          {{ item.meta.title }}
        </n-tab>
      </n-tabs>
      <n-dropdown
        placement="bottom-start"
        trigger="manual"
        :x="x"
        :y="y"
        :options="options"
        :show="showDropdown"
        :on-clickoutside="onClickoutside"
        @select="handleSelect"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGo } from "@/utils/router";
import { useTabStore, RouteItem, tagsWhitelist } from "@/stores";
import { PageEnum } from "@/enum/pageEnum";
import { storage } from "@/utils/storage/storage";
import { TABS_ROUTES } from "@/stores/mutation-types";

const route = useRoute();
const router = useRouter();
const go = useGo();
const tabsViewStore = useTabStore();
const message = window["$message"];

// 获取简易的路由对象
const getSimpleRoute = (route) => {
  const { fullPath, hash, meta, name, params, path, query } = route;
  return { fullPath, hash, meta, name, params, path, query };
};

let cacheRoutes: RouteItem[] = [];
const simpleRoute = getSimpleRoute(route);
try {
  const routesStr = storage.get(TABS_ROUTES) as string | null | undefined;
  cacheRoutes = routesStr ? JSON.parse(routesStr) : [simpleRoute];
} catch (e) {
  cacheRoutes = [simpleRoute];
}

// 将最新的路由信息同步到 localStorage 中
const routes = router.getRoutes();
cacheRoutes.forEach((cacheRoute) => {
  const route = routes.find((route) => route.path === cacheRoute.path);
  if (route) {
    cacheRoute.meta = route.meta || cacheRoute.meta;
    cacheRoute.name = (route.name || cacheRoute.name) as string;
  }
});

// 初始化标签页
tabsViewStore.initTabs(cacheRoutes);

// 标签页列表
const tabsList: any = computed(() => tabsViewStore.tabsList);

const state = reactive({
  activeKey: route.fullPath,
  isMultiHeaderFixed: false,
});

watch(
  () => route.fullPath,
  (to) => {
    if (tagsWhitelist.includes(route.name as PageEnum)) return;
    const router = routes.find((route) => route.path === to);
    if (router?.meta?.tabsHidden) return;
    state.activeKey = to;
    tabsViewStore.addTabs(getSimpleRoute(route));
  },
  { immediate: true },
);

const options = [
  {
    label: "关闭左侧的标签页",
    key: "closeLeftTabs",
  },
  {
    label: "关闭右侧的标签页",
    key: "closeRightTabs",
  },
  {
    label: "关闭其他页",
    key: "closeOtherTabs",
  },
];
const showDropdown = ref(false);
const x = ref(0);
const y = ref(0);
const activeContextMenuPath = ref("");
const handleSelect = (key: string | number) => {
  showDropdown.value = false;
  message.info(String(key));
  switch (key) {
    case "closeLeftTabs":
      tabsViewStore.closeLeftTabs(activeContextMenuPath.value, state.activeKey);
      break;
    case "closeRightTabs":
      tabsViewStore.closeRightTabs(activeContextMenuPath.value, state.activeKey);
      break;
    case "closeOtherTabs":
      tabsViewStore.closeOtherTabs(activeContextMenuPath.value, state.activeKey);
      break;
  }
};

/**
 * tab栏右击事件，用来有目的的关闭标签页
 * @param e 鼠标右击的位置
 * @param path 该标签页指向页面的路径信息
 */
const handleContextMenu = (e: MouseEvent, path: string) => {
  e.preventDefault();
  showDropdown.value = false;
  nextTick().then(() => {
    showDropdown.value = true;
    activeContextMenuPath.value = path;
    x.value = e.clientX;
    y.value = e.clientY;
  });
};
const onClickoutside = () => {
  message.info("clickoutside");
  showDropdown.value = false;
};

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
  const routeInfo = tabsList.value.find((item) => item.fullPath == path);
  removeTab(routeInfo);
};

/**
 * 关闭当前页面
 * @param {string} route 当前的路由对象
 */
const removeTab = (route) => {
  if (tabsList.value.length === 1) {
    message.warning("这已经是最后一页，不能再关闭了！");
    return;
  }
  tabsViewStore.closeCurrentTab(route);
  // 如果关闭的是当前页,则跳转到最后一页
  if (state.activeKey === route.fullPath) {
    const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
    state.activeKey = currentRoute.fullPath;
    router.push(currentRoute);
  }
};

/**
 * 在页面关闭或刷新之前，保存标签页的数据
 */
window.addEventListener("beforeunload", () => {
  storage.set(TABS_ROUTES, JSON.stringify(tabsList.value));
});
</script>
