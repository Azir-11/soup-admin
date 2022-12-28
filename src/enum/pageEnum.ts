export enum PageEnum {
  // 登录
  BASE_LOGIN_PATH = "/login",
  BASE_LOGIN_NAME = "Login",
  //重定向
  REDIRECT_PATH = "/redirect",
  REDIRECT_NAME = "Redirect",
  // 首页
  BASE_HOME = "/dashboard/analysis",
  //首页跳转默认路由
  BASE_HOME_REDIRECT = "/dashboard/analysis",
  // 未找到页面
  NOT_FOUND_PATH = "/404",
  NOT_FOUND_NAME = "404",
  // 页面无效
  INVALID_NAME = "not-found",
  INVALID_PATH = "/not-found",
  // 无权限
  NO_PERMISSION_PATH = "/403",
  NO_PERMISSION_NAME = "403",
  // 服务器错误
  SERVICE_ERROR_PATH = "/500",
  SERVICE_ERROR_NAME = "500",
}
