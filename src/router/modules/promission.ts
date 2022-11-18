import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/routes/constant";
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
    path: "/result1",
    name: "Result1",
    redirect: "/result1/success1",
    component: Layout,
    meta: {
      title: "权限页面",
      icon: "grommet-icons:user-admin",
      permission: ["test"],
      sort: 4,
    },
    children: [
      {
        path: "success1",
        name: "result-success1",
        meta: {
          title: "超级管理员可见",
          icon: "grommet-icons:user-admin",
        },
        component: () => import("@/views/result/success.vue"),
      },
      {
        path: "fail1",
        name: "result-fail1",
        meta: {
          title: "管理员可见",
          icon: "clarity:administrator-line",
        },
        component: () => import("@/views/result/fail.vue"),
      },
      {
        path: "info1",
        name: "result-info1",
        meta: {
          title: "用户可见",
          icon: "carbon:user-admin",
        },
        component: () => import("@/views/result/info.vue"),
      },
    ],
  },
];

export default routes;
