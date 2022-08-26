import type { Router } from "vue-router";
import { isNavigationFailure } from "vue-router";
import { storage } from "@/utils/storage";
import { ACCESS_TOKEN } from "@/stores/mutation-types";
import { PageEnum } from "@/enums/pageEnum";
import { useAsyncRouteStoreWidthOut } from "@/stores/modules/asyncRoute";
import { useSystemSettingStore } from "@/stores/modules/systemSetting";

type Recordable<T = any> = {
  [x: string]: T;
};

const BASE_HOME = PageEnum.BASE_HOME;
const LOGIN_PATH = PageEnum.BASE_LOGIN;

//白名单，名单内路径允许通过
const whitePathList = [LOGIN_PATH];

export function createRouterGuards(router: Router) {
  const asyncRouteStore = useAsyncRouteStoreWidthOut();
  const systemStore = useSystemSettingStore();

  router.beforeEach((to, _from, next) => {
    //开启loading
    const Loading = window["$loading"] || null;
    Loading && Loading.start();

    // 如果前往login页，但token存在，则跳转到首页;此处判断应该是token是否过期，待完善
    if (to.path == LOGIN_PATH && storage.get(ACCESS_TOKEN)) {
      next({ path: BASE_HOME });
      return;
    }

    //允许白名单通行
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }

    // 没有检测到token的情况下重定向至login
    if (!storage.get(ACCESS_TOKEN)) {
      // 如果该页面允许访问并且不是login页则放行，因为login页需要配置重定向路径
      if (to.meta?.ignoreAuth && to.path !== LOGIN_PATH) {
        next();
        return;
      }
      // 重定向
      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }

      next(redirectData);
      return;
    }

    // 将路由转化为菜单
    asyncRouteStore.generateRoutes("userInfo");

    next();
    // loading完成
    Loading && Loading.finish();
  });

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
