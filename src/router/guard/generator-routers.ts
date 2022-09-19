import { Layout } from "@/router/constant";
import { getPermissions } from "@/axios/api";
// import type { AppRouteRecordRaw } from "@/router/types";

const Iframe = () => import("@/views/iframe/index.vue");
const LayoutMap = new Map<string, () => Promise<typeof import("*.vue")>>();

LayoutMap.set("LAYOUT", Layout);
LayoutMap.set("IFRAME", Iframe);

/**
 * 动态生成菜单，注释部分是正常用法，没注释那块是模拟请求
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    getPermissions()
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
