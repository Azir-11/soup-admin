import { Layout } from "@/router/constant";
import { RouteRecordRaw } from "vue-router";
import { PageEnum } from "@/enums/pageEnum";

/** 根路由: / */
export const ROOT_ROUTE: RouteRecordRaw = {
  name: "root",
  path: "/",
  redirect: PageEnum.BASE_HOME,
  meta: {
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
    name: "NoPermission",
    path: "/NoPermission",
    component: Layout,
    meta: {
      title: "无权限",
      singleLayout: "blank",
    },
    children: [
      {
        path: "NoPermission",
        name: "NoPermission403",
        meta: {
          title: "403",
          hideBreadcrumb: true,
        },
        component: () => import("@/views/exception/403.vue"),
      },
    ],
  },
  {
    name: "NotFound",
    path: "/notFound",
    component: Layout,
    meta: {
      title: "404",
    },
    children: [
      {
        path: "NotFound",
        name: "notFound404",
        meta: {
          title: "404",
          hideBreadcrumb: true,
        },
        component: () => import("@/views/exception/404.vue"),
      },
    ],
  },
  {
    name: "ServiceError",
    path: "/ServiceError",
    component: Layout,
    meta: {
      title: "服务器错误",
    },
    children: [
      {
        path: "ServiceError",
        name: "ServiceError500",
        meta: {
          title: "500",
          hideBreadcrumb: true,
        },
        component: () => import("@/views/exception/500.vue"),
      },
    ],
  },
  // 匹配无效路径的路由
  {
    name: "NotFoundPage",
    path: "/:pathMatch(.*)*",
    redirect: "/NotFound/NotFound",
    meta: {
      title: "404",
    },
  },
];
