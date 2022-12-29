import { storage } from "@/utils";
import { ACCESS_TOKEN, CURRENT_USER_INFO, TABS_ROUTES } from "@/stores/mutation-types";

/** 获取token */
export function getToken() {
  return storage.get("token") || "";
}

/** 获取用户信息 */
export function getUserInfo() {
  const emptyInfo: Auth.UserInfo = {
    userId: "",
    userName: "",
    userAvatar: "",
    userRole: "user",
    userPermissions: [],
  };
  const userInfo: Auth.UserInfo = storage.get(CURRENT_USER_INFO) || emptyInfo;

  return userInfo;
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
  storage.remove(ACCESS_TOKEN);
  storage.remove(CURRENT_USER_INFO);
}
