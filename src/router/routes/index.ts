/** 根路由: / */
export const ROOT_ROUTE: AuthRoute.Route = {
  name: "root",
  path: "/",
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    tabsHidden: true,
    title: "Root",
  },
};

/** 固定的路由 */
export const constantRoutes: AuthRoute.Route[] = [
  ROOT_ROUTE,
  {
    name: "login",
    path: "/login",
    component: "self",
    meta: {
      title: "登录",
    },
  },

  {
    name: "403",
    path: "/403",
    meta: {
      title: "权限不足",
      tabsHidden: true,
      hideBreadcrumb: true,
    },
    component: "basic",
  },
  {
    name: "404",
    path: "/404",
    meta: {
      title: "页面未找到",
      tabsHidden: true,
      hideBreadcrumb: true,
    },
    component: "basic",
  },
  {
    name: "500",
    path: "/500",
    meta: {
      title: "服务器错误",
      tabsHidden: true,
      hideBreadcrumb: true,
    },
    component: "basic",
  },
  // 匹配无效路径的路由
  {
    name: "not-found",
    path: "/:pathMatch(.*)*",
    component: "basic",
    meta: {
      title: "未找到",
    },
  },
];
