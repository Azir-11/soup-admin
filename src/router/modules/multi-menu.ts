/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 * @param meta.hidden 隐藏这个菜单项
 * @param meta.tabsHidden 在标签页中不显示该路由
 * */

const multiMenu: AuthRoute.Route = {
  name: "multi-menu",
  path: "/multi-menu",
  component: "basic",
  meta: {
    title: "多级菜单",
    icon: "mdi:menu",
  },
  children: [
    {
      name: "multi-menu_first",
      path: "/multi-menu/first",
      component: "multi",
      meta: {
        title: "一级菜单",
        icon: "mdi:menu",
      },
      children: [
        {
          name: "multi-menu_first_second",
          path: "/multi-menu/first/second",
          component: "self",
          meta: {
            title: "二级菜单",
            requiresAuth: true,
            icon: "mdi:menu",
          },
        },
        {
          name: "multi-menu_first_second-new",
          path: "/multi-menu/first/second-new",
          component: "multi",
          meta: {
            title: "二级菜单(有子菜单)",
            icon: "mdi:menu",
          },
          children: [
            {
              name: "multi-menu_first_second-new_third",
              path: "/multi-menu/first/second-new/third",
              component: "self",
              meta: {
                title: "三级菜单",
                requiresAuth: true,
                icon: "mdi:menu",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default multiMenu;
