import type { RouteComponent } from "vue-router";
import { BasicLayout, BlankLayout } from "@/layout";

type Recordable<T = any> = {
  [x: string]: T;
};

type Lazy<T> = () => Promise<T>;

interface ModuleComponent {
  default: RouteComponent;
}

type LayoutComponent = Record<EnumType.LayoutComponentName, Lazy<ModuleComponent>>;

let viewsModules: Record<string, () => Promise<Recordable>> = import.meta.glob(
  "@/views/**/*.{vue,tsx}",
);

/**
 * 获取布局的vue文件(懒加载的方式)
 * @param layoutType - 布局类型
 */
export function getLayoutComponent(layoutType: EnumType.LayoutComponentName) {
  const layoutComponent: LayoutComponent = {
    basic: BasicLayout,
    blank: BlankLayout,
  };
  return layoutComponent[layoutType];
}

/**
 * 获取页面导入的vue文件
 * @param routeKey - 路由key
 */
export const getViewComponent = (routeKey: AuthRoute.RouteKey) => {
  const dynamicComponent = dynamicImport(viewsModules, routeKey);
  if (!dynamicComponent) {
    throw new Error(`路由“${routeKey}”没有对应的组件文件！`);
  }
  return dynamicComponent;
};

const Iframe = () => import("@/views/iframe/index.vue");
const LayoutMap = new Map<string, () => Promise<typeof import("*.vue")>>();

LayoutMap.set("LAYOUT", BasicLayout as any);
LayoutMap.set("IFRAME", Iframe as any);

/**
 * 动态导入
 * */
export const dynamicImport = (
  viewsModules: Record<string, () => Promise<Recordable>>,
  component: string,
) => {
  const componentPath = component.replaceAll("_", "/") + "/index";
  const keys = Object.keys(viewsModules);
  const matchKeys = keys.filter((key) => {
    let k = key.replace("/src/views/", "");
    const lastIndex = k.lastIndexOf(".");
    k = k.substring(0, lastIndex);
    return k === componentPath;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return viewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    console.warn("请不要在同一目录下创建同名的`.vue`文件与`.TSX`文件,这将导致动态引入失败!");
    return;
  }
};
