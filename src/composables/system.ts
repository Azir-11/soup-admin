import { useAuthStore } from "@/stores";
import { isArray, isString } from "@/utils";

interface AppInfo {
  /** 项目名称 */
  name: string;
  /** 项目标题 */
  title: string;
  /** 项目描述 */
  desc: string;
}

/** 项目信息 */
export const useAppInfo = (): AppInfo => {
  const { VITE_APP_NAME: name, VITE_APP_TITLE: title, VITE_APP_DESC: desc } = import.meta.env;

  return {
    name,
    title,
    desc,
  };
};

/** 权限判断 */
export const usePermission = () => {
  const auth = useAuthStore();

  const hasPermission = (permission: Auth.RoleType | Auth.RoleType[]) => {
    const { userRole } = auth.userInfo;

    let has = userRole === "super";
    if (!has) {
      if (isArray(permission)) {
        has = (permission as Auth.RoleType[]).includes(userRole);
      }
      if (isString(permission)) {
        has = (permission as Auth.RoleType) === userRole;
      }
    }
    return has;
  };

  return {
    hasPermission,
  };
};
