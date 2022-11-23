import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useRouteStore } from "@/stores";
import { storage } from "@/utils";
import { ACCESS_TOKEN } from "@/stores/mutation-types";
import { PageEnum } from "@/enum";

const BASE_LOGIN_PATH = PageEnum.BASE_LOGIN_PATH;
const NOT_FOUND_PATH = PageEnum.NOT_FOUND_PATH;
const INVALID_PATH_NAME = PageEnum.INVALID_NAME;

/**
 * 动态路由
 */
export const createDynamicRouteGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const route = useRouteStore();
  const isLogin = Boolean(storage.get(ACCESS_TOKEN));

  // 初始化权限路由
  if (!route.isInitAuthRoute) {
    // 未登录情况下直接回到登录页，登录成功后再加载权限路由
    if (!isLogin) {
      if (to.path === BASE_LOGIN_PATH) {
        next();
      } else {
        next({ path: BASE_LOGIN_PATH });
      }
      return false;
    }

    await route.initAuthRoute();

    if (to.name === INVALID_PATH_NAME) {
      // 动态路由没有加载导致被INVALID_PATH路由捕获，等待权限路由加载好了，回到之前的路由
      // 若路由是从根路由重定向过来的，重新回到根路由
      const ROOT_ROUTE_NAME = "root";
      const path = to.redirectedFrom?.fullPath === ROOT_ROUTE_NAME ? "/" : to.fullPath;
      next({ path, replace: true, query: to.query, hash: to.hash });
      return false;
    }
  }

  // 权限路由已经加载，仍然未找到，重定向到not-found
  if (to.name === INVALID_PATH_NAME) {
    next({ path: NOT_FOUND_PATH, replace: true });
    return false;
  }
  return true;
};
