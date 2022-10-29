import subscribeThemeStore from "./theme";
import subscribeAppStore from "./app";

/** 订阅状态 */
export function subscribeStore() {
  subscribeThemeStore();
  subscribeAppStore();
}
