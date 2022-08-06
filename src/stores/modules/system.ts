import { toRaw, unref } from "vue";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { store } from "@/stores";
import { asyncRoutes } from "@/router/index";

// export interface ISystemConfigState {
//   menus: RouteRecordRaw[];
//   routers: any[];
//   addRouters: any[];
//   keepAliveComponents: string[];
//   isDynamicAddedRoute: boolean;
// }

// const config = {
//   // 主题
//   theme: "light",
//   // 底部栏的位置，false则悬浮，true则固定在底部
//   footerColumn: false,
//   // 头部高度
//   headerHeight: 64,
//   // 标签页高度
//   tabsHeight: 64,
//   // 侧边栏展开宽度
//   asideMenuExpandWid: 320,
//   routerViewSwitchAnimation: "",
// };

export const useSystemConfig = defineStore({
  id: "app-system-config",
  state: () => ({
    magneticSuctionFooter: false,
  }),
  getters: {},
  actions: {},
});

// 需要在setup周期外使用
export function useAsyncSystemConfig() {
  return useSystemConfig(store);
}
