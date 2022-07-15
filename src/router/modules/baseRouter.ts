import type { RouteRecordRaw } from "vue-router";
import { PageEnum } from "@/enums/pageEnum";
import { Layout } from "@/router/constant";
import { renderIcon } from "@/utils/index";
import { BarChart } from "@vicons/ionicons5";

const BASE_HOME = PageEnum.BASE_HOME;
/**
 * base路由，本文件路由不会展示在menu菜单中
 * 
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
          component: () =>
            import("@/views/index.vue"),
        },
      ],
    },
];

export default routes;
