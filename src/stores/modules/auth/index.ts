import { defineStore } from "pinia";
import { storage } from "@/utils";
import { store } from "@/stores";
import { ACCESS_TOKEN, CURRENT_USER, TABS_ROUTES } from "@/stores/mutation-types";
import { fetchLogin, fetchPermissions } from "@/service";
import { Login } from "@/service/api/types";
import { useRouteStore } from "../router";

export interface IUserState {
  userId: string;
  token: string;
  userName: string;
  avatar: string;
  userRole: Auth.RoleType;
  permissions: any[];
}

const initUser = (user: Login = null) => {
  if (user === null) {
    user = storage.get(CURRENT_USER);
  }
  if (user) {
    return {
      userId: user.userId,
      token: user.token,
      userName: user.userName,
      avatar: user.avatar,
      userRole: user.userRole,
      permissions: JSON.parse(user.permissions),
    };
  }
};

export const useAuthStore = defineStore({
  id: "app-auth",
  state: (): IUserState => ({
    ...initUser(),
  }),
  getters: {
    getId() {
      return this.id;
    },
    getToken(): string {
      return this.token;
    },
    getNickname(): string {
      return this.userName;
    },
    getPermissions(): Array<string> {
      return this.permissions;
    },
  },
  actions: {
    setId(userId) {
      this.userId = userId;
    },
    setToken(token: string) {
      this.token = token;
    },
    setuserName(userName: string) {
      this.userName = userName;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setRole(userRole: string) {
      this.userRole = userRole;
    },
    // 登录
    async login(userInfo) {
      try {
        const response: any = await fetchLogin(userInfo.userName, userInfo.password);
        const { data } = response;
        const ex = 7 * 24 * 60 * 60 * 1000;
        storage.set(ACCESS_TOKEN, data.token, ex);
        storage.set(CURRENT_USER, data);
        initUser(data);
        return Promise.resolve(data);
      } catch (e) {
        console.log("e", e);
        return Promise.reject(e);
      }
    },

    // 获取用户信息
    GetPermissions() {
      const that = this;
      return new Promise((resolve, reject) => {
        fetchPermissions()
          .then((res) => {
            const permissionsList = res.data;
            if (permissionsList && permissionsList.length) {
              that.setPermissions(permissionsList);
            } else {
              reject(new Error("getInfo: permissionsList must be a non-null array !"));
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    async logout() {
      this.setPermissions([]);
      storage.remove(CURRENT_USER);
      storage.remove(ACCESS_TOKEN);
      storage.remove(TABS_ROUTES);
      location.reload();
      return Promise.resolve("");
    },
    /**
     * 更换用户权限(切换账号)
     * @param userRole
     */
    async updateUserRole(userRole: Auth.RoleType) {
      const { resetRouteStore, initAuthRoute } = useRouteStore();

      const accounts: Record<Auth.RoleType, { userName: string; password: string }> = {
        super: {
          userName: "Super",
          password: "super123",
        },
        admin: {
          userName: "Admin",
          password: "admin123",
        },
        user: {
          userName: "User01",
          password: "user01123",
        },
      };
      const { userName, password } = accounts[userRole];
      const { data } = await fetchLogin(userName, password);
      if (data) {
        await this.loginByToken(data);
        resetRouteStore();
        initAuthRoute();
      }
    },
  },
});

// Need to be used outside the setup
export const useAuthStoreWidthOut = () => {
  return useAuthStore(store);
};
