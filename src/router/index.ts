import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { createRouterGuards } from "./router-guards";

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

//普通路由 无需验证权限
export const asyncRoutes: any[] = [...routeModuleList];

const router = createRouter({
  history: createWebHistory(""),
  strict: true,
  routes: routeModuleList,
});

// 创建路由守卫
export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
