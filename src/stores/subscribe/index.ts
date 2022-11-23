import subscribeThemeStore from "./theme";
import subscribeAppStore from "./app";

/** 订阅状态 */
export const subscribeStore = () => {
  subscribeThemeStore();
  subscribeAppStore();
};
