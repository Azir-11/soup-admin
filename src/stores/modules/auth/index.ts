import { defineStore } from "pinia";
import { storage } from "@/utils";
import { store } from "@/stores";
import { ACCESS_TOKEN, CURRENT_USER, TABS_ROUTES } from "@/stores/mutation-types";
import { fetchLogin, fetchPermissions } from "@/service";

export interface IUserState {
  id: string;
  token: string;
  userName: string;
  avatar: string;
  permissions: any[];
}
const initUser = () => {
  const user = storage.get(CURRENT_USER);
  if (user) {
    return {
      id: user.id,
      token: user.token,
      userName: user.userName,
      avatar: user.avatar,
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
    setId(id) {
      this.id = id;
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
    setRole(role: string) {
      this.role = role;
    },
    // 登录
    async login(userInfo) {
      try {
        const response: any = await fetchLogin(userInfo.userName, userInfo.password);
        const { data } = response;
        const ex = 7 * 24 * 60 * 60 * 1000;
        storage.set(ACCESS_TOKEN, data.token, ex);
        storage.set(CURRENT_USER, data);
        this.setId(data.id);
        this.setToken(data.token);
        this.setuserName(data.userName);
        this.setRole(data.roles);
        this.setPermissions(JSON.parse(data.permissions));
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
  },
});

// Need to be used outside the setup
export function useAuthStoreWidthOut() {
  return useAuthStore(store);
}
