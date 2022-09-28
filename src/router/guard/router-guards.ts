import type { Router } from "vue-router";
import { isNavigationFailure } from "vue-router";
import { createPermissionGuard } from "./permissions";

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    //开启loading
    const Loading = window["$loading"] || null;
    Loading && Loading.start();
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next);
  });

  /**
   * 后置路由守卫
   */
  router.afterEach((to, _from, failure) => {
    //设置页面的标题
    document.title = (to?.meta?.title as string) || document.title;

    // 导航故障
    if (isNavigationFailure(failure)) {
      console.log("failed navigation", failure);
    }

    //loading完成
    const Loading = (window as any).$loading || null;
    Loading && Loading.finish();
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}
