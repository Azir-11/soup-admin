import { toRaw, unref } from "vue";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { store } from "@/stores";
import { asyncRoutes } from "@/router/index";

export interface ISystemConfigState {
  menus: RouteRecordRaw[];
  routers: any[];
  addRouters: any[];
  keepAliveComponents: string[];
  isDynamicAddedRoute: boolean;
}

const config = {
  // 主题
  theme: "light",
  // 底部栏的位置，false则悬浮，true则固定在底部
  footerColumn: false,
  // 头部高度
  headerHeight: 64,
  // 标签页高度
  tabsHeight: 64,
  // 侧边栏展开宽度
  asideMenuExpandWid: 320,
  routerViewSwitchAnimation: "",
};

export const useSystemConfig = defineStore({
  id: "app-system-config",
  state: (): ISystemConfigState => ({
    menus: [],
    routers: asyncRoutes,
    addRouters: [],
    keepAliveComponents: [],
    // 是否动态添加路由
    isDynamicAddedRoute: false,
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.addRouters);
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    // 设置动态路由
    setRouters(routers: any) {
      this.addRouters = routers;
      this.routers = asyncRoutes.concat(routers);
    },
    setMenus(menus: any) {
      // 设置动态路由
      this.menus = menus;
    },
    setKeepAliveComponents(compNames: any) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },
    async generateRoutes(data: any) {
      const accessedRouters = asyncRoutes;
      this.setRouters(accessedRouters);
      this.setMenus(accessedRouters);
      return toRaw(accessedRouters);
    },
  },
});

// 需要在setup周期外使用
export function useAsyncSystemConfig() {
  return useSystemConfig(store);
}
