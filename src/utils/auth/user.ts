import { storage } from "@/utils";
import { ACCESS_TOKEN, CURRENT_USER_INFO } from "@/stores/mutation-types";

/** 设置token */
export const setToken = (token: string) => {
  storage.set(ACCESS_TOKEN, token);
};

/** 获取token */
export const getToken = () => {
  return storage.get(ACCESS_TOKEN);
};

/** 去除token */
export const removeToken = () => {
  storage.remove(ACCESS_TOKEN);
};

/** 获取用户信息 */
export const getUserInfo = () => {
  const userInfo = storage.get(CURRENT_USER_INFO);
  return userInfo;
};

/** 设置用户信息 */
export const setUserInfo = (userInfo) => {
  storage.set(CURRENT_USER_INFO, userInfo);
};

/** 去除用户信息 */
export const removeUserInfo = () => {
  storage.remove(CURRENT_USER_INFO);
};

/** 去除用户相关缓存 */
export const clearAuthStorage = () => {
  removeToken();
  removeUserInfo();
};
