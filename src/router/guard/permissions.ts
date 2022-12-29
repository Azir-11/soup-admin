import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { createDynamicRouteGuard } from "./dynamic";
import { storage } from "@/utils";
import { ACCESS_TOKEN } from "@/stores/mutation-types";
import { PageEnum } from "@/enum";
import { useAuthStore } from "@/stores";
import { exeStrategyActions } from "@/utils/common/pattern";

type Recordable<T = any> = {
  [x: string]: T;
};

const BASE_HOME = PageEnum.BASE_HOME;
const BASE_LOGIN_PATH = PageEnum.BASE_LOGIN_PATH;
const NO_PERMISSION_PATH = PageEnum.NO_PERMISSION_PATH;

/** 处理路由页面的权限 */
export const createPermissionGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const permission = await createDynamicRouteGuard(to, from, next);
  if (!permission) return;

  // 外链路由, 从新标签打开，返回上一个路由
  if (to.meta.href) {
    window.open(to.meta.href as string);
    next({ path: from.fullPath, replace: true, query: from.query });
    return;
  }

  const authStore = useAuthStore();
  const isLogin = Boolean(storage.get(ACCESS_TOKEN));
  const permissions: Array<string> = (to.meta.permission as Array<string>) || [];
  const needLogin = Boolean(to.meta?.requiresAuth) || Boolean(permissions.length);
  const hasPermission =
    !permissions.length ||
    permissions.some((routePermission) => {
      let flag = false;
      authStore.userInfo.userPermissions.forEach((userPermission) => {
        if (routePermission == userPermission) {
          flag = true;
        }
      });
      return flag;
    });

  const actions = [
    // 已登录状态跳转登录页，跳转至首页
    [
      isLogin && to.path == BASE_LOGIN_PATH,
      () => {
        next({ path: BASE_HOME });
      },
    ],
    // 不需要登录权限的页面直接通行
    [
      !needLogin,
      () => {
        next();
      },
    ],
    // 未登录状态进入需要登录权限的页面
    [
      !isLogin && needLogin,
      () => {
        const redirectData: {
          path: string;
          replace: boolean;
          query?: Recordable<string>;
        } = {
          path: BASE_LOGIN_PATH,
          replace: true,
        };
        if (to.path) {
          redirectData.query = {
            ...redirectData.query,
            redirect: to.path,
          };
        }
        next(redirectData);
      },
    ],
    // 登录状态进入需要登录权限的页面，有权限直接通行
    [
      isLogin && needLogin && hasPermission,
      () => {
        next();
      },
    ],
    [
      // 登录状态进入需要登录权限的页面，无权限，重定向到无权限页面
      isLogin && needLogin && !hasPermission,
      () => {
        next({ path: NO_PERMISSION_PATH });
      },
    ],
  ];

  exeStrategyActions(actions);
};
