export const routeModel: Record<Auth.RoleType, AuthRoute.Route[]> = {
  super: [
    {
      path: "/about",
      name: "about",
      component: "self",
      meta: {
        singleLayout: "basic",
        title: "关于",
        icon: "fluent:book-information-24-regular",
        order: 8,
      },
    },
    {
      path: "/component",
      name: "component",
      component: "basic",
      meta: {
        title: "组件示例",
        icon: "cib:app-store",
        order: 2,
      },
      children: [
        {
          path: "/component/button",
          name: "component_button",
          meta: {
            title: "按钮",
            icon: "mdi:button-cursor",
          },
          component: "self",
        },
        {
          path: "/component/table",
          name: "component_table",
          component: "self",
          meta: {
            title: "表格示例",
            icon: "mdi:table-large",
          },
        },
        {
          path: "/component/card",
          name: "component_card",
          component: "self",
          meta: {
            title: "卡片",
            icon: "mdi:card-outline",
          },
        },
        {
          path: "/component/calendar",
          name: "component_calendar",
          component: "self",
          meta: {
            title: "日历",
            icon: "mdi:calendar-outline",
          },
        },
      ],
    },
    {
      name: "dashboard",
      path: "/dashboard",
      component: "basic",
      children: [
        {
          name: "dashboard_analysis",
          path: "/dashboard/analysis",
          component: "self",
          meta: {
            title: "分析页",
            requiresAuth: true,
            icon: "icon-park-outline:analysis",
          },
        },
        {
          name: "dashboard_workbench",
          path: "/dashboard/workbench",
          component: "self",
          meta: {
            title: "工作台",
            requiresAuth: true,
            icon: "icon-park-outline:workbench",
          },
        },
      ],
      meta: {
        title: "仪表盘",
        icon: "mdi:monitor-dashboard",
        order: 1,
      },
    },
    {
      name: "exception",
      path: "/exception",
      component: "basic",
      children: [
        {
          name: "exception_403",
          path: "/exception/403",
          component: "self",
          meta: {
            title: "异常页403",
            requiresAuth: true,
            icon: "ic:baseline-block",
          },
        },
        {
          name: "exception_404",
          path: "/exception/404",
          component: "self",
          meta: {
            title: "异常页404",
            requiresAuth: true,
            icon: "ic:baseline-web-asset-off",
          },
        },
        {
          name: "exception_500",
          path: "/exception/500",
          component: "self",
          meta: {
            title: "异常页500",
            requiresAuth: true,
            icon: "ic:baseline-wifi-off",
          },
        },
      ],
      meta: {
        title: "异常页",
        icon: "ant-design:exception-outlined",
        order: 7,
      },
    },
    {
      name: "multi-menu",
      path: "/multi-menu",
      component: "basic",
      meta: {
        title: "多级菜单",
        icon: "mdi:menu",
      },
      children: [
        {
          name: "multi-menu_first",
          path: "/multi-menu/first",
          component: "multi",
          meta: {
            title: "一级菜单",
            icon: "mdi:menu",
          },
          children: [
            {
              name: "multi-menu_first_second",
              path: "/multi-menu/first/second",
              component: "self",
              meta: {
                title: "二级菜单",
                requiresAuth: true,
                icon: "mdi:menu",
              },
            },
            {
              name: "multi-menu_first_second-new",
              path: "/multi-menu/first/second-new",
              component: "multi",
              meta: {
                title: "二级菜单(有子菜单)",
                icon: "mdi:menu",
              },
              children: [
                {
                  name: "multi-menu_first_second-new_third",
                  path: "/multi-menu/first/second-new/third",
                  component: "self",
                  meta: {
                    title: "三级菜单",
                    requiresAuth: true,
                    icon: "mdi:menu",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
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
    },
    {
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
    },
  ],
  admin: [
    {
      path: "/about",
      name: "about",
      component: "self",
      meta: {
        singleLayout: "basic",
        title: "关于",
        icon: "fluent:book-information-24-regular",
        order: 8,
      },
    },
    {
      path: "/component",
      name: "component",
      component: "basic",
      meta: {
        title: "组件示例",
        icon: "cib:app-store",
        order: 2,
      },
      children: [
        {
          path: "/component/button",
          name: "component_button",
          meta: {
            title: "按钮",
            icon: "mdi:button-cursor",
          },
          component: "self",
        },
        {
          path: "/component/table",
          name: "component_table",
          component: "self",
          meta: {
            title: "表格示例",
            icon: "mdi:table-large",
          },
        },
        {
          path: "/component/card",
          name: "component_card",
          component: "self",
          meta: {
            title: "卡片",
            icon: "mdi:card-outline",
          },
        },
        {
          path: "/component/calendar",
          name: "component_calendar",
          component: "self",
          meta: {
            title: "日历",
            icon: "mdi:calendar-outline",
          },
        },
      ],
    },
    {
      name: "dashboard",
      path: "/dashboard",
      component: "basic",
      children: [
        {
          name: "dashboard_analysis",
          path: "/dashboard/analysis",
          component: "self",
          meta: {
            title: "分析页",
            requiresAuth: true,
            icon: "icon-park-outline:analysis",
          },
        },
        {
          name: "dashboard_workbench",
          path: "/dashboard/workbench",
          component: "self",
          meta: {
            title: "工作台",
            requiresAuth: true,
            icon: "icon-park-outline:workbench",
          },
        },
      ],
      meta: {
        title: "仪表盘",
        icon: "mdi:monitor-dashboard",
        order: 1,
      },
    },
    {
      name: "exception",
      path: "/exception",
      component: "basic",
      children: [
        {
          name: "exception_403",
          path: "/exception/403",
          component: "self",
          meta: {
            title: "异常页403",
            requiresAuth: true,
            icon: "ic:baseline-block",
          },
        },
        {
          name: "exception_404",
          path: "/exception/404",
          component: "self",
          meta: {
            title: "异常页404",
            requiresAuth: true,
            icon: "ic:baseline-web-asset-off",
          },
        },
        {
          name: "exception_500",
          path: "/exception/500",
          component: "self",
          meta: {
            title: "异常页500",
            requiresAuth: true,
            icon: "ic:baseline-wifi-off",
          },
        },
      ],
      meta: {
        title: "异常页",
        icon: "ant-design:exception-outlined",
        order: 7,
      },
    },
    {
      name: "multi-menu",
      path: "/multi-menu",
      component: "basic",
      meta: {
        title: "多级菜单",
        icon: "mdi:menu",
      },
      children: [
        {
          name: "multi-menu_first",
          path: "/multi-menu/first",
          component: "multi",
          meta: {
            title: "一级菜单",
            icon: "mdi:menu",
          },
          children: [
            {
              name: "multi-menu_first_second",
              path: "/multi-menu/first/second",
              component: "self",
              meta: {
                title: "二级菜单",
                requiresAuth: true,
                icon: "mdi:menu",
              },
            },
            {
              name: "multi-menu_first_second-new",
              path: "/multi-menu/first/second-new",
              component: "multi",
              meta: {
                title: "二级菜单(有子菜单)",
                icon: "mdi:menu",
              },
              children: [
                {
                  name: "multi-menu_first_second-new_third",
                  path: "/multi-menu/first/second-new/third",
                  component: "self",
                  meta: {
                    title: "三级菜单",
                    requiresAuth: true,
                    icon: "mdi:menu",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
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
    },
    {
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
    },
  ],
  user: [
    {
      path: "/about",
      name: "about",
      component: "self",
      meta: {
        singleLayout: "basic",
        title: "关于",
        icon: "fluent:book-information-24-regular",
        order: 8,
      },
    },
    {
      path: "/component",
      name: "component",
      component: "basic",
      meta: {
        title: "组件示例",
        icon: "cib:app-store",
        order: 2,
      },
      children: [
        {
          path: "/component/button",
          name: "component_button",
          meta: {
            title: "按钮",
            icon: "mdi:button-cursor",
          },
          component: "self",
        },
        {
          path: "/component/table",
          name: "component_table",
          component: "self",
          meta: {
            title: "表格示例",
            icon: "mdi:table-large",
          },
        },
        {
          path: "/component/card",
          name: "component_card",
          component: "self",
          meta: {
            title: "卡片",
            icon: "mdi:card-outline",
          },
        },
        {
          path: "/component/calendar",
          name: "component_calendar",
          component: "self",
          meta: {
            title: "日历",
            icon: "mdi:calendar-outline",
          },
        },
      ],
    },
    {
      name: "dashboard",
      path: "/dashboard",
      component: "basic",
      children: [
        {
          name: "dashboard_analysis",
          path: "/dashboard/analysis",
          component: "self",
          meta: {
            title: "分析页",
            requiresAuth: true,
            icon: "icon-park-outline:analysis",
          },
        },
        {
          name: "dashboard_workbench",
          path: "/dashboard/workbench",
          component: "self",
          meta: {
            title: "工作台",
            requiresAuth: true,
            icon: "icon-park-outline:workbench",
          },
        },
      ],
      meta: {
        title: "仪表盘",
        icon: "mdi:monitor-dashboard",
        order: 1,
      },
    },
    {
      name: "exception",
      path: "/exception",
      component: "basic",
      children: [
        {
          name: "exception_403",
          path: "/exception/403",
          component: "self",
          meta: {
            title: "异常页403",
            requiresAuth: true,
            icon: "ic:baseline-block",
          },
        },
        {
          name: "exception_404",
          path: "/exception/404",
          component: "self",
          meta: {
            title: "异常页404",
            requiresAuth: true,
            icon: "ic:baseline-web-asset-off",
          },
        },
        {
          name: "exception_500",
          path: "/exception/500",
          component: "self",
          meta: {
            title: "异常页500",
            requiresAuth: true,
            icon: "ic:baseline-wifi-off",
          },
        },
      ],
      meta: {
        title: "异常页",
        icon: "ant-design:exception-outlined",
        order: 7,
      },
    },
    {
      name: "multi-menu",
      path: "/multi-menu",
      component: "basic",
      meta: {
        title: "多级菜单",
        icon: "mdi:menu",
      },
      children: [
        {
          name: "multi-menu_first",
          path: "/multi-menu/first",
          component: "multi",
          meta: {
            title: "一级菜单",
            icon: "mdi:menu",
          },
          children: [
            {
              name: "multi-menu_first_second",
              path: "/multi-menu/first/second",
              component: "self",
              meta: {
                title: "二级菜单",
                requiresAuth: true,
                icon: "mdi:menu",
              },
            },
            {
              name: "multi-menu_first_second-new",
              path: "/multi-menu/first/second-new",
              component: "multi",
              meta: {
                title: "二级菜单(有子菜单)",
                icon: "mdi:menu",
              },
              children: [
                {
                  name: "multi-menu_first_second-new_third",
                  path: "/multi-menu/first/second-new/third",
                  component: "self",
                  meta: {
                    title: "三级菜单",
                    requiresAuth: true,
                    icon: "mdi:menu",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
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
    },
    {
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
    },
  ],
};
