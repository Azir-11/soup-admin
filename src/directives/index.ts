import type { App } from "vue";
import setupPermissionDirective from "./permission";

/** 安装自定义的vue指令 */
export function setupDirectives(app: App) {
  setupPermissionDirective(app);
}
