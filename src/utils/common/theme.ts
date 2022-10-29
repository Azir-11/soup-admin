import { storage } from "@/utils";
import { THEME_COLOR } from "@/stores/mutation-types";

/**
 * 缓存主题颜色
 * @param color
 */
export function setThemeColor(color: string) {
  storage.set(THEME_COLOR, color);
}

/**
 * 获取缓存的主题颜色
 */
export function getThemeColor() {
  return storage.get(THEME_COLOR);
}
