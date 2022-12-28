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

const result: AuthRoute.Route = {
  path: "/result",
  name: "result",
  component: "basic",
  meta: {
    title: "结果页面",
    icon: "ant-design:check-circle-outlined",
    order: 4,
  },
  children: [
    {
      path: "/result/success",
      name: "result_success",
      component: "self",
      meta: {
        title: "成功页",
        icon: "ant-design:check-circle-outlined",
        tabsHidden: true,
        hideBreadcrumb: true,
      },
    },
    {
      path: "/result/fail",
      name: "result_fail",
      component: "self",
      meta: {
        title: "失败页",
        icon: "ant-design:close-circle-outlined",
        tabsHidden: true,
        hideBreadcrumb: true,
      },
    },
    {
      path: "/result/info",
      name: "result_info",
      component: "self",
      meta: {
        title: "信息页",
        icon: "ant-design:exclamation-circle-outlined",
        tabsHidden: true,
        hideBreadcrumb: true,
      },
    },
  ],
};

export default result;
