declare namespace ApiUserManagement {
  interface User {
    userId: string;
    userName: string;
    avatar: string;
    token: string;
    userRole: Auth.RoleType;
    permissions: string;
  }
}

declare namespace ApiRoute {
  interface Route {
    /** 动态路由 */
    routes: AuthRoute.Route[];
    /** 路由首页对应的key */
    home: AuthRoute.AllRouteKey;
  }
}
