import { h } from "vue";
import type { Component } from "vue";
import { NIcon } from "naive-ui";
import { useIconRender } from "@/composables";

/**
 * render 图标
 * */
export const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

type GlobalMenuOption = import("naive-ui").MenuOption & {
  key: string;
  label: string;
  routeName: string;
  routePath: string;
  icon?: () => import("vue").VNodeChild;
  children?: GlobalMenuOption[] | undefined;
};

/**
 * 将权限路由转换成菜单
 * @param routes - 路由
 */
export const transformAuthRouteToMenu = (routes: AuthRoute.Route[]): GlobalMenuOption[] => {
  const globalMenu: GlobalMenuOption[] = [];
  routes.forEach((route) => {
    const { name, path, meta } = route;
    const routeName = name as string;
    let menuChildren: GlobalMenuOption[] | undefined;
    if (route.children) {
      menuChildren = transformAuthRouteToMenu(route.children);
    }
    const menuItem: GlobalMenuOption = addPartialProps({
      menu: {
        key: routeName,
        label: meta.title,
        routeName,
        routePath: path,
      },
      icon: meta.icon,
      localIcon: meta.localIcon,
      children: menuChildren,
    });

    if (!hideInMenu(route)) {
      globalMenu.push(menuItem);
    }
  });

  return globalMenu;
};

/**
 * 获取当前路由所在菜单数据的paths
 * @param activeKey - 当前路由的key
 * @param menus - 菜单数据
 */
export const getActiveKeyPathsOfMenus = (activeKey: string, menus: GlobalMenuOption[]) => {
  const keys = menus.map((menu) => getActiveKeyPathsOfMenu(activeKey, menu)).flat(1);
  return keys;
};

const getActiveKeyPathsOfMenu = (activeKey: string, menu: GlobalMenuOption) => {
  const keys: string[] = [];
  if (activeKey.includes(menu.routeName)) {
    keys.push(menu.routeName);
  }
  if (menu.children) {
    keys.push(
      ...menu.children
        .map((item) => getActiveKeyPathsOfMenu(activeKey, item as GlobalMenuOption))
        .flat(1),
    );
  }
  return keys;
};

/** 路由不转换菜单 */
const hideInMenu = (route: AuthRoute.Route) => {
  return Boolean(route.meta.hide);
};

/** 给菜单添加可选属性 */
const addPartialProps = (config: {
  menu: GlobalMenuOption;
  icon?: string;
  localIcon?: string;
  children?: GlobalMenuOption[];
}) => {
  const { iconRender } = useIconRender();

  const item = { ...config.menu };

  const { icon, localIcon, children } = config;

  if (localIcon) {
    Object.assign(item, { icon: iconRender({ localIcon }) });
  }

  if (icon) {
    Object.assign(item, { icon: iconRender({ icon }) });
  }

  if (children) {
    Object.assign(item, { children });
  }
  return item;
};
