// 定义具体的对接接口
import http from "@/axios";
import type { Result, Login } from "@/axios/api/types";

/**
 * 登录
 */
export const login = (username: string, password: string): Promise<Result<Login>> => {
  const res = http.reqPost<Result<Login>>(`user/login`, {
    userName: username,
    password: password,
  });
  return res.then((res) => res.data);
};

/**
 * 注册接口
 */
export const register = (username: string, password: string): Promise<Result<Login>> => {
  const res = http.reqPost<Result<Login>>(`user/register`, {
    username: username,
    password: password,
  });
  return res.then((res) => res.data);
};

/**
 * 获取用户权限
 */
export const getPermissions = () => {
  const res = http.reqGet<Result<string>>(`user/getPermissions`);
  return res.then((res) => res.data);
};
