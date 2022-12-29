const plugin: AuthRoute.Route = {
  path: "/plugin",
  name: "plugin",
  component: "basic",
  meta: {
    title: "插件",
    icon: "clarity:plugin-line",
  },
  children: [
    {
      path: "/plugin/echarts",
      name: "plugin_echarts",
      component: "self",
      meta: {
        title: "ECharts",
        icon: "simple-icons:apacheecharts",
      },
    },
    {
      path: "/plugin/copy",
      name: "plugin_copy",
      meta: {
        title: "剪贴板",
        icon: "mdi:clipboard-outline",
      },
      component: "self",
    },
    {
      name: "plugin_icon",
      path: "/plugin/icon",
      component: "self",
      meta: {
        title: "图标",
        requiresAuth: true,
        localIcon: "custom-icon",
      },
    },
  ],
};

export default plugin;
