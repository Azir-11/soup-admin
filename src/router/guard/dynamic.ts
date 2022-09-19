import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useRouteStore } from "@/stores/modules/asyncRoute";
import { storage } from "@/utils/storage";
import { ACCESS_TOKEN } from "@/stores/mutation-types";
import { PageEnum } from "@/enums/pageEnum";

const LOGIN_PATH = PageEnum.BASE_LOGIN;
const ERROR_PAGE = PageEnum.ERROR_PAGE;

/**
 * 动态路由
 */
export async function createDynamicRouteGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const route = useRouteStore();
  const isLogin = Boolean(storage.get(ACCESS_TOKEN));

  // 初始化权限路由
  if (!route.isInitAuthRoute) {
    // 未登录情况下直接回到登录页，登录成功后再加载权限路由
    if (!isLogin) {
      if (to.path === LOGIN_PATH) {
        next();
      } else {
        next({ path: LOGIN_PATH });
      }
      return false;
    }

    await route.initAuthRoute();

    if (to.path === ERROR_PAGE) {
      // 动态路由没有加载导致被not-found-page路由捕获，等待权限路由加载好了，回到之前的路由
      // 若路由是从根路由重定向过来的，重新回到根路由
      const ROOT_ROUTE_NAME = "root";
      const path = to.redirectedFrom?.name === ROOT_ROUTE_NAME ? "/" : to.fullPath;
      next({ path, replace: true, query: to.query, hash: to.hash });
      return false;
    }
  }

  // 权限路由已经加载，仍然未找到，重定向到not-found
  if (to.name === ERROR_PAGE) {
    next({ name: ERROR_PAGE, replace: true });
    return false;
  }

  return true;
}
