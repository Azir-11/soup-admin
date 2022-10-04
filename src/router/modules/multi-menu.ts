import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/routes/constant";
import { MenuOutline } from "@vicons/ionicons5";
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
    name: "multi-menu",
    path: "/multi-menu",
    component: Layout,
    meta: {
      title: "多级菜单",
      icon: renderIcon(MenuOutline),
    },
    children: [
      {
        name: "multi-menu_first",
        path: "first",
        redirect: "",
        meta: {
          title: "一级菜单",
          icon: renderIcon(MenuOutline),
        },
        children: [
          {
            name: "multi-menu_first_second",
            path: "second",
            component: () => import("@/views/multi-menu/first/second/index.vue"),
            meta: {
              title: "二级菜单",
              icon: renderIcon(MenuOutline),
            },
          },
          {
            name: "multi-menu_first_second-new",
            path: "second-new",
            meta: {
              title: "二级菜单(有子菜单)",
              icon: renderIcon(MenuOutline),
            },
            children: [
              {
                name: "multi-menu_first_second-new_third_1",
                path: "third_1",
                component: () => import("@/views/multi-menu/first/second-new/third/index.vue"),
                meta: {
                  title: "三级菜单",
                  icon: renderIcon(MenuOutline),
                },
              },
              {
                name: "multi-menu_first_second-new_third_2",
                path: "third_2",
                component: () => import("@/views/multi-menu/first/second-new/third/index.vue"),
                meta: {
                  title: "三级菜单",
                  icon: renderIcon(MenuOutline),
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
