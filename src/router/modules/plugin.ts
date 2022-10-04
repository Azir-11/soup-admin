import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/routes/constant";
import { renderIcon } from "@/utils/index";
import { OpenOutline, PieChartSharp, CopyOutline } from "@vicons/ionicons5";

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
const routes: Array<RouteRecordRaw> = [
  {
    path: "/plugin",
    name: "plugin",
    redirect: "/plugin/ECharts",
    component: Layout,
    meta: {
      title: "插件",
      icon: renderIcon(OpenOutline),
    },
    children: [
      {
        path: "ECharts",
        name: "component_ECharts",
        component: () => import("@/views/plugin/charts/Echarts/index.vue"),
        meta: {
          title: "ECharts",
          icon: renderIcon(PieChartSharp),
        },
      },
      {
        name: "plugin_copy",
        path: "copy",
        meta: {
          title: "剪贴板",
          icon: renderIcon(CopyOutline),
        },
        component: () => import("@/views/plugin/copy/index.vue"),
      },
    ],
  },
];

export default routes;
