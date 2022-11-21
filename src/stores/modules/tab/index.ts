import type { RouteLocationNormalizedLoaded, Router } from "vue-router";
import { defineStore } from "pinia";
import { useRouterPush } from "@/composables";
import { useThemeStore } from "../theme";
import {
  clearTabRoutes,
  getIndexInTabRoutes,
  getIndexInTabRoutesByRouteName,
  getTabRouteByVueRoute,
  getTabRoutes,
  isInTabRoutes,
  setTabRoutes,
} from "./helpers";

/** 多页签Tab的路由 */
interface GlobalTabRoute
  extends Pick<import("vue-router").RouteLocationNormalizedLoaded, "name" | "fullPath" | "meta"> {}

interface TabState {
  /** 多页签数据 */
  tabs: GlobalTabRoute[];
  /** 多页签首页 */
  homeTab: GlobalTabRoute;
  /** 当前激活状态的页签(路由fullPath) */
  activeTab: string;
}

export const useTabStore = defineStore("tab-store", {
  state: (): TabState => ({
    tabs: [],
    homeTab: {
      name: "root",
      fullPath: "/",
      meta: {
        title: "Root",
      },
    },
    activeTab: "",
  }),
  getters: {
    /** 当前激活状态的页签索引 */
    activeTabIndex(state) {
      const { tabs, activeTab } = state;
      return tabs.findIndex((tab) => tab.fullPath === activeTab);
    },
  },
  actions: {
    /** 重置Tab状态 */
    resetTabStore() {
      clearTabRoutes();
      this.$reset();
    },
    /** 缓存页签路由数据 */
    cacheTabRoutes() {
      setTabRoutes(this.tabs);
    },
    /**
     * 设置当前路由对应的页签为激活状态
     * @param fullPath - 路由fullPath
     */
    setActiveTab(fullPath: string) {
      this.activeTab = fullPath;
    },
    /**
     * 设置当前路由对应的页签title
     * @param title - tab名称
     */
    setActiveTabTitle(title: string) {
      const item = this.tabs.find((tab) => tab.fullPath === this.activeTab);
      if (item) {
        item.meta.title = title;
      }
    },
    /**
     * 初始化首页页签路由
     * @param routeHomeName - 路由首页的name
     * @param router - 路由实例
     */
    initHomeTab(routeHomeName: string, router: Router) {
      const routes = router.getRoutes();
      const findHome = routes.find((item) => item.name === routeHomeName);
      if (findHome && !findHome.children.length) {
        // 有子路由的不能作为Tab
        this.homeTab = getTabRouteByVueRoute(findHome);
      }
    },
    /**
     * 添加多页签
     * @param route - 路由
     */
    addTab(route: RouteLocationNormalizedLoaded) {
      const tab = getTabRouteByVueRoute(route);

      if (isInTabRoutes(this.tabs, tab.fullPath)) {
        return;
      }

      const index = getIndexInTabRoutesByRouteName(this.tabs, route.name as string);

      if (index === -1) {
        this.tabs.push(tab);
        return;
      }

      const { multiTab = false } = route.meta;
      if (!multiTab) {
        this.tabs.splice(index, 1, tab);
        return;
      }

      this.tabs.push(tab);
    },
    /**
     * 删除多页签
     * @param fullPath - 路由fullPath
     */
    removeTab(fullPath: string) {
      console.log("fullPath", fullPath);
      const { routerPush } = useRouterPush(false);

      const isActive = this.activeTab === fullPath;
      const updateTabs = this.tabs.filter((tab) => tab.fullPath !== fullPath);
      this.tabs = updateTabs;
      if (isActive && updateTabs.length) {
        const activePath = updateTabs[updateTabs.length - 1].fullPath;
        this.setActiveTab(activePath);
        routerPush(activePath);
      }
    },
    /**
     * 清空多页签(多页签首页保留)
     * @param excludes - 保留的多页签path
     */
    clearTab(excludes: string[] = []) {
      const { routerPush } = useRouterPush(false);

      const homePath = this.homeTab.fullPath;
      const remain = [homePath, ...excludes];
      const hasActive = remain.includes(this.activeTab);
      const updateTabs = this.tabs.filter((tab) => remain.includes(tab.fullPath));
      this.tabs = updateTabs;
      if (!hasActive && updateTabs.length) {
        const activePath = updateTabs[updateTabs.length - 1].fullPath;
        this.setActiveTab(activePath);
        routerPush(activePath);
      }
    },
    /**
     * 清除左边多页签
     * @param fullPath - 路由fullPath
     */
    clearLeftTab(fullPath: string) {
      const index = getIndexInTabRoutes(this.tabs, fullPath);
      if (index > -1) {
        const excludes = this.tabs.slice(index).map((item) => item.fullPath);
        this.clearTab(excludes);
      }
    },
    /**
     * 清除右边多页签
     * @param fullPath - 路由fullPath
     */
    clearRightTab(fullPath: string) {
      const index = getIndexInTabRoutes(this.tabs, fullPath);
      if (index > -1) {
        const excludes = this.tabs.slice(0, index + 1).map((item) => item.fullPath);
        this.clearTab(excludes);
      }
    },
    /** 清除所有多页签 */
    clearAllTab() {
      this.clearTab();
    },
    /**
     * 点击单个tab
     * @param fullPath - 路由fullPath
     */
    handleClickTab(fullPath: string) {
      const { routerPush } = useRouterPush(false);

      const isActive = this.activeTab === fullPath;
      if (!isActive) {
        this.setActiveTab(fullPath);
        routerPush(fullPath);
      }
    },
    /** 初始化Tab状态 */
    iniTabStore(currentRoute: RouteLocationNormalizedLoaded) {
      const theme = useThemeStore();

      const tabs: GlobalTabRoute[] = theme.tab.isCache ? getTabRoutes() : [];

      const hasHome = getIndexInTabRoutesByRouteName(tabs, this.homeTab.name as string) > -1;
      if (!hasHome && this.homeTab.name !== "root") {
        tabs.unshift(this.homeTab);
      }

      const isHome = currentRoute.fullPath === this.homeTab.fullPath;
      const index = getIndexInTabRoutesByRouteName(tabs, currentRoute.name as string);
      if (!isHome) {
        const currentTab = getTabRouteByVueRoute(currentRoute);
        if (!currentRoute.meta.multiTab) {
          if (index > -1) {
            tabs.splice(index, 1, currentTab);
          } else {
            tabs.push(currentTab);
          }
        } else {
          const hasCurrent = isInTabRoutes(tabs, currentRoute.fullPath);
          if (!hasCurrent) {
            tabs.push(currentTab);
          }
        }
      }

      this.tabs = tabs;
      this.setActiveTab(currentRoute.fullPath);
    },
  },
});
