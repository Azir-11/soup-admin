/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const component: AuthRoute.Route = {
  path: "/component",
  name: "component",
  component: "basic",
  meta: {
    title: "组件示例",
    icon: "cib:app-store",
    order: 2,
  },
  children: [
    {
      path: "/component/button",
      name: "component_button",
      meta: {
        title: "按钮",
        icon: "mdi:button-cursor",
      },
      component: "self",
    },
    {
      path: "/component/table",
      name: "component_table",
      component: "self",
      meta: {
        title: "表格示例",
        icon: "mdi:table-large",
      },
    },
    {
      path: "/component/card",
      name: "component_card",
      component: "self",
      meta: {
        title: "卡片",
        icon: "mdi:card-outline",
      },
    },
    {
      path: "/component/calendar",
      name: "component_calendar",
      component: "self",
      meta: {
        title: "日历",
        icon: "mdi:calendar-outline",
      },
    },
  ],
};

export default component;
