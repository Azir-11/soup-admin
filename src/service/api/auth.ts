import { mockRequest } from "../request";
import { Login, Route } from "./types";

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export const fetchLogin = (userName: string, password: string) => {
  return mockRequest.post<Login>("/user/login", { userName, password });
};

/** 获取用户信息 */
export function fetchUserInfo() {
  return mockRequest.get<Auth.UserInfo>("/getUserInfo");
}

/**
 * 获取权限
 * @param userName - 用户名
 * @param password - 密码
 */
export const fetchPermissions = () => {
  return mockRequest.get<string>("user/getPermissions");
};

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(userId: string) {
  return mockRequest.post<Route>("/getUserRoutes", { userId });
}
