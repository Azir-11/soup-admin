import type { App } from "vue";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { transformAuthRouteToVueRoutes } from "@/utils/router/transform";
import { constantRoutes } from "./routes";
import { createRouterGuards } from "./guard/router-guards";

const VITE_HASH_ROUTE = false;
const VITE_BASE_URL = "/";

export const router = createRouter({
  history: VITE_HASH_ROUTE ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
  strict: true,
  routes: transformAuthRouteToVueRoutes(constantRoutes),
});

// 创建路由守卫
export const setupRouter = async (app: App) => {
  app.use(router);
  createRouterGuards(router);
  await router.isReady();
};

export default router;

/** 路由名称 */
export const routeName = (key) => key;

export * from "./modules";
export * from "./routes";
