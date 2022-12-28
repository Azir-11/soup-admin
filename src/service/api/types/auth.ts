export interface Login {
  userId: string;
  userName: string;
  avatar: string;
  token: string;
  userRole: string;
  permissions: string;
}

export interface Route {
  /** 动态路由 */
  routes: AuthRoute.Route[];
  /** 路由首页对应的key */
  home: AuthRoute.AllRouteKey;
}
