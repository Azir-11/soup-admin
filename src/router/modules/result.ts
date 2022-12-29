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
