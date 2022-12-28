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

const dashboard: AuthRoute.Route = {
  name: "dashboard",
  path: "/dashboard",
  component: "basic",
  children: [
    {
      name: "dashboard_analysis",
      path: "/dashboard/analysis",
      component: "self",
      meta: {
        title: "分析页",
        requiresAuth: true,
        icon: "icon-park-outline:analysis",
      },
    },
    {
      name: "dashboard_workbench",
      path: "/dashboard/workbench",
      component: "self",
      meta: {
        title: "工作台",
        requiresAuth: true,
        icon: "icon-park-outline:workbench",
      },
    },
  ],
  meta: {
    title: "仪表盘",
    icon: "mdi:monitor-dashboard",
    order: 1,
  },
};

export default dashboard;
