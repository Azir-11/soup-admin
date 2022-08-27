import type { RouteRecordRaw } from "vue-router";
import { store } from "@/stores";
import { asyncRoutes } from "@/router/index";

// const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);
export interface IAsyncRouteState {
  menus: RouteRecordRaw[];
  routers: any[];
  addRouters: any[];
  keepAliveComponents: string[];
  isDynamicAddedRoute: boolean;
}

export const useAsyncRouteStore = defineStore({
  id: "app-async-route",
  state: (): IAsyncRouteState => ({
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
    async generateRoutes(_data: any) {
      const accessedRouters = asyncRoutes;
      this.setRouters(accessedRouters);
      this.setMenus(accessedRouters);
      return toRaw(accessedRouters);
    },
  },
});

// 需要在setup周期外使用
export function useAsyncRouteStoreWidthOut() {
  return useAsyncRouteStore(store);
}
