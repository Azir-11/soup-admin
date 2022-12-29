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
