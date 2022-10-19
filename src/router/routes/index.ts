import { Layout } from "@/router/routes/constant";
import { RouteRecordRaw } from "vue-router";
import { PageEnum } from "@/enum";

/** 根路由: / */
export const ROOT_ROUTE: RouteRecordRaw = {
  name: "root",
  path: "/",
  redirect: PageEnum.BASE_HOME_REDIRECT,
  meta: {
    tabsHidden: true,
    title: "Root",
  },
};

/** 固定的路由 */
export const constantRoutes: RouteRecordRaw[] = [
  ROOT_ROUTE,
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    name: "abnormal",
    path: "/abnormal",
    component: Layout,
    children: [
      {
        path: PageEnum.NO_PERMISSION_PATH,
        name: "No-permission",
        meta: {
          title: "权限不足",
          tabsHidden: true,
          hideBreadcrumb: true,
        },
        component: () => import("@/views/exception/403.vue"),
      },
      {
        path: PageEnum.NOT_FOUND_NAME,
        name: "notFound404",
        meta: {
          title: "页面未找到",
          tabsHidden: true,
          hideBreadcrumb: true,
        },
        component: () => import("@/views/exception/404.vue"),
      },
      {
        path: PageEnum.SERVICE_ERROR_NAME,
        name: "ServiceError",
        meta: {
          title: "服务器错误",
          tabsHidden: true,
          hideBreadcrumb: true,
        },
        component: () => import("@/views/exception/500.vue"),
      },
    ],
  },
  // 匹配无效路径的路由
  {
    name: "InvalidPath",
    path: "/:pathMatch(.*)*",
    component: Layout,
    meta: {
      title: "NotFound",
    },
    children: [
      {
        path: PageEnum.INVALID_NAME,
        name: "InvalidPath404",
        meta: {
          title: PageEnum.INVALID_NAME,
          tabsHidden: true,
          hideBreadcrumb: true,
        },
        component: () => import("@/views/exception/404.vue"),
      },
    ],
  },
];
