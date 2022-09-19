import type { App } from "vue";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "./routes";
import { createRouterGuards } from "./guard/router-guards";

const { VITE_HASH_ROUTE = "N", VITE_BASE_URL } = import.meta.env;

// 导入模块内的所有路由 star
const modules = (import.meta as any).globEager("./modules/**/*.ts");

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

const sortRoute = (a: any, b: any) => {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
};

routeModuleList.sort(sortRoute);

// 导入路由 End

//需要验证权限
export const asyncRoutes: any[] = [...routeModuleList];

export const router = createRouter({
  history:
    VITE_HASH_ROUTE === "Y" ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
  strict: true,
  routes: constantRoutes,
});

// 创建路由守卫
export async function setupRouter(app: App) {
  app.use(router);
  createRouterGuards(router);
  await router.isReady();
}

export default router;
