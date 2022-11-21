import type { RouteRecordRaw } from "vue-router";
import { store } from "@/stores";
import { router, asyncRoutes } from "@/router";
import { transformAuthRouteToMenu, transformRoutePathToRouteName } from "@/utils";
import { useTabStore } from "@/stores";

// const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);
export interface AsyncRouteState {
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   */
  authRouteMode: ImportMetaEnv["VITE_AUTH_ROUTE_MODE"];
  /** 路由首页name(前端静态路由时生效，后端动态路由该值会被后端返回的值覆盖) */
  routeHomeName: string;
  /** 菜单 */
  menus: RouteRecordRaw[];
  /** 路由 */
  routers: any[];
  /** 缓存的路由 */
  keepAliveComponents: string[];
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
}

interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: "id",
  children: "children",
  pid: "pid",
};

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {},
): T[] {
  config = getConfig(config);
  const children = config.children as string;

  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }

  return listFilter(tree);
}

export const useRouteStore = defineStore({
  id: "app-async-route",
  state: (): AsyncRouteState => ({
    authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
    routeHomeName: transformRoutePathToRouteName(import.meta.env.VITE_ROUTE_HOME_PATH),
    menus: [],
    routers: asyncRoutes,
    keepAliveComponents: [],
    isInitAuthRoute: false,
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
      return toRaw(this.routers);
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    // 设置动态路由
    setRouters(routers: any) {
      this.routers = asyncRoutes.concat(routers);
    },
    // 设置菜单
    setMenus(menus: any) {
      this.menus = menus;
    },
    setKeepAliveComponents(compNames: any) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },
    async initDynamicRoute(data: any) {
      let accessedRouters;
      const permissionsList = data || [];
      const routeFilter = (route) => {
        const { meta } = route;
        const { permission } = meta || {};
        if (!permission) return true;
        return permissionsList.some((item) => permission.includes(item));
      };
      try {
        //过滤账户是否拥有某一个权限，并将菜单从加载列表移除
        accessedRouters = filter(asyncRoutes, routeFilter);
      } catch (error) {
        console.log(error);
      }
      accessedRouters = accessedRouters.filter(routeFilter);
      this.setRouters(accessedRouters);
      this.setMenus(transformAuthRouteToMenu(accessedRouters));
      const routes = toRaw(accessedRouters);
      routes.forEach((item) => {
        router.addRoute(item as unknown as RouteRecordRaw);
      });
    },
    /** 初始化权限路由 */
    async initAuthRoute() {
      const { initHomeTab } = useTabStore();

      const isDynamicRoute = this.authRouteMode === "dynamic";
      if (isDynamicRoute) {
        await this.initDynamicRoute();
      } else {
        await this.initStaticRoute();
      }

      initHomeTab(this.routeHomeName, router);

      this.isInitAuthRoute = true;
    },
  },
});

// 需要在setup周期外使用
export function useAsyncRouteStoreWidthOut() {
  return useRouteStore(store);
}
