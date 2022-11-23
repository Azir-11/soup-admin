import { useTabStore, useThemeStore } from "@/stores";

/** 全局事件 */
export const useGlobalEvents = () => {
  const theme = useThemeStore();
  const tab = useTabStore();

  /** 页面离开时缓存数据 */
  window.addEventListener("beforeunload", () => {
    theme.cacheThemeSettings();
    tab.cacheTabRoutes();
  });
};
