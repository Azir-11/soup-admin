import { Layout } from "@/router/constant";

// 404 on a page
export const ErrorPageRoute = {
  path: "/:path(.*)*",
  name: "ErrorPage",
  component: Layout,
  meta: {
    title: "ErrorPage",
    hideBreadcrumb: true,
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "ErrorPageSon",
      component: () => import("@/views/exception/404.vue"),
      meta: {
        title: "ErrorPage",
        hideBreadcrumb: true,
      },
    },
  ],
};

export const RedirectRoute = {
  path: "/redirect",
  name: "Redirect",
  component: Layout,
  meta: {
    title: "Redirect",
    hideBreadcrumb: true,
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: "Redirect",
      //   component: () => import("@/views/redirect/index.vue"),
      meta: {
        title: "Redirect",
        hideBreadcrumb: true,
      },
    },
  ],
};
