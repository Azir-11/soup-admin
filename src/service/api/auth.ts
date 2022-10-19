import { mockRequest } from "../request";
import { Login } from "./types";

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export const fetchLogin = (userName: string, password: string) => {
  return mockRequest.post<Login>("/user/login", { userName, password });
};

/**
 * 获取权限
 * @param userName - 用户名
 * @param password - 密码
 */
export const fetchPermissions = () => {
  return mockRequest.get<string>("user/getPermissions");
};
