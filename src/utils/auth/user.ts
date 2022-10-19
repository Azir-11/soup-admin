import { storage } from "@/utils";
import { ACCESS_TOKEN, CURRENT_USER } from "@/stores/mutation-types";

/** 设置token */
export function setToken(token: string) {
  storage.set(ACCESS_TOKEN, token);
}

/** 获取token */
export function getToken() {
  return storage.get(ACCESS_TOKEN);
}

/** 去除token */
export function removeToken() {
  storage.remove(ACCESS_TOKEN);
}

/** 获取用户信息 */
export function getUserInfo() {
  const userInfo = storage.get(CURRENT_USER);
  return userInfo;
}

/** 设置用户信息 */
export function setUserInfo(userInfo) {
  storage.set(CURRENT_USER, userInfo);
}

/** 去除用户信息 */
export function removeUserInfo() {
  storage.remove(CURRENT_USER);
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
  removeToken();
  removeUserInfo();
}
