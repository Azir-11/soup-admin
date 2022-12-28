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
