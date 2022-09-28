import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/routes/constant";
import { GridOutline, BarcodeOutline, CafeOutline } from "@vicons/ionicons5";
import { renderIcon } from "@/utils/index";

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

const routes: Array<RouteRecordRaw> = [
  {
    name: "dashboard",
    path: "/dashboard",
    component: Layout,
    meta: {
      title: "仪表盘",
      order: 1,
      icon: renderIcon(GridOutline),
    },
    children: [
      {
        name: "dashboard_analysis",
        path: "/dashboard/analysis",
        component: () => import("@/views/dashboard/analysis/index.vue"),
        meta: {
          title: "分析页",
          requiresAuth: true,
          icon: renderIcon(BarcodeOutline),
        },
      },
      {
        name: "dashboard_workbench",
        path: "/dashboard/workbench",
        component: () => import("@/views/dashboard/workbench/index.vue"),
        meta: {
          title: "工作台",
          requiresAuth: true,
          icon: renderIcon(CafeOutline),
          permissions: ["super", "admin"],
        },
      },
    ],
  },
];

export default routes;
