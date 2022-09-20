import { defineStore } from "pinia";
import { storage, createStorage } from "@/utils/storage";
import { store } from "@/stores";
import { ACCESS_TOKEN, CURRENT_USER, TABS_ROUTES } from "@/stores/mutation-types";
import { ResultEnum } from "@/enums/httpEnums";
import { login as Login, getPermissions } from "@/axios/api";

// const Storage = createStorage({ storage: localStorage });

export interface IUserState {
  id: string;
  token: string;
  userName: string;
  role: string;
  permissions: any[];
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): IUserState => ({
    id: storage.get(CURRENT_USER)?.id,
    token: storage.get(CURRENT_USER)?.token,
    userName: storage.get(CURRENT_USER)?.userName,
    role: storage.get(CURRENT_USER)?.role,
    permissions: JSON.parse(storage.get(CURRENT_USER)?.permissions || `[]`),
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
        const response = await Login(userInfo.userName, userInfo.password);
        const { status, data } = response;
        if (status === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000;
          storage.set(ACCESS_TOKEN, data.token, ex);
          storage.set(CURRENT_USER, data);
          this.setId(data.id);
          this.setToken(data.token);
          this.setuserName(data.userName);
          this.setRole(data.roles);
          this.setPermissions(JSON.parse(data.permissions));
          return Promise.resolve(data);
        }
        return Promise.reject(response);
      } catch (e) {
        console.log("e", e);
        return Promise.reject(e);
      }
    },

    // 获取用户信息
    GetPermissions() {
      const that = this;
      return new Promise((resolve, reject) => {
        getPermissions()
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

    initUser() {
      const user = storage.get(CURRENT_USER);
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
