import type { RouteRecordRaw } from "vue-router";
import { PageEnum } from "@/enums/pageEnum";
import { Layout } from "@/router/constant";
import { renderIcon } from "@/utils/index";
import { BarChart } from "@vicons/ionicons5";

const BASE_HOME = PageEnum.BASE_HOME;

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
 * */

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/",
    name: "Root",
    redirect: BASE_HOME,
    meta: {
      title: "Root",
    },
  },
  {
    path: "/Home",
    name: "Home",
    component: Layout,
    meta: {
      sort: 1,
      title: "首页",
      icon: renderIcon(BarChart),
      permissions: ["index"],
    },
    children: [
      {
        path: "index",
        name: `index`,
        meta: {
          title: "首页",
        },
        component: () => import("@/views/index.vue"),
      },
    ],
  },
];

export default routes;
