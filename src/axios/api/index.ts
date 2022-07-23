// 定义具体的对接接口
import http from "@/axios";
import type { Result, Login } from "@/axios/api/types";
import baseURL from "../http/requset";

/**
 * 登录接口,因为返回可能存在密码错误，所以不指定具体类型
 */
export const login = (username: string, password: string): Promise<Result<Login>> => {
  const res = http.reqPost<Result<Login>>(baseURL + `user/common/login`, {
    userName: username,
    password: password,
  });
  return res.then((res) => res.data);
};
