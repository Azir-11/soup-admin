import { unref, nextTick } from "vue";
import { defineStore } from "pinia";
import { router } from "@/router";
import { ACCESS_TOKEN, CURRENT_USER_INFO, TABS_ROUTES } from "@/stores/mutation-types";
import { fetchLogin, fetchUserInfo } from "@/service";
import { useRouterPush } from "@/composables";
import { storage } from "@/utils";
import { useTabStore } from "../tab";
import { useRouteStore } from "../router";
import { getToken, getUserInfo, clearAuthStorage } from "./helpers";

interface AuthState {
  /** 用户信息 */
  userInfo: Auth.UserInfo;
  /** 用户token */
  token: string;
  /** 登录的加载状态 */
  loginLoading: boolean;
}

export const useAuthStore = defineStore("auth-store", {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false,
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token);
    },
  },
  actions: {
    /** 重置auth状态 */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false);
      const { resetTabStore } = useTabStore();
      const { resetRouteStore } = useRouteStore();
      const route = unref(router.currentRoute);

      clearAuthStorage();
      this.$reset();

      if (route.meta.requiresAuth) {
        toLogin();
      }

      nextTick(() => {
        resetTabStore();
        resetRouteStore();
      });
    },
    /**
     * 处理登录后成功或失败的逻辑
     * @param backendToken - 返回的token
     */
    async handleActionAfterLogin(backendToken: string) {
      const route = useRouteStore();
      const { toLoginRedirect } = useRouterPush(false);

      const loginSuccess = await this.loginByToken(backendToken);

      if (loginSuccess) {
        await route.initAuthRoute();

        // 跳转登录后的地址
        toLoginRedirect();

        // 登录成功弹出欢迎提示
        if (route.isInitAuthRoute) {
          window["$notification"]?.success({
            title: "登录成功!",
            content: `欢迎回来，${this.userInfo.userName}!`,
            duration: 3000,
          });
        }

        return;
      }

      // 不成功则重置状态
      this.resetAuthStore();
    },
    /**
     * 根据token进行登录
     * @param backendToken - 返回的token
     */
    async loginByToken(backendToken: string) {
      let successFlag = false;

      // 先把token存储到缓存中(后面接口的请求头需要token)
      storage.set(ACCESS_TOKEN, backendToken);

      // 获取用户信息
      const { data } = await fetchUserInfo();
      if (data) {
        // 成功后把用户信息存储到缓存中
        storage.set(CURRENT_USER_INFO, data);

        // 更新状态
        this.userInfo = data;
        this.token = backendToken;

        successFlag = true;
      }

      return successFlag;
    },
    /**
     * 登录
     * @param userName - 用户名
     * @param password - 密码
     */
    async login(userName: string, password: string) {
      const { data } = await fetchLogin(userName, password);
      if (data) {
        storage.set(ACCESS_TOKEN, data);
        await this.handleActionAfterLogin(data);
      }
    },
    /**
     * 更换用户权限(切换账号)
     * @param userRole
     */
    async updateUserRole(userRole: Auth.RoleType) {
      const { resetRouteStore, initAuthRoute } = useRouteStore();

      const accounts: Record<Auth.RoleType, { userName: string; password: string }> = {
        super: {
          userName: "Soup_super",
          password: "super",
        },
        admin: {
          userName: "Soup_Admin",
          password: "admin123",
        },
        user: {
          userName: "Soup_User",
          password: "user114514",
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
