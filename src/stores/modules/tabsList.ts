import { RouteLocationNormalized } from "vue-router";
import { PageEnum } from "@/enum/pageEnum";

// 不需要出现在标签页中的路由名称
export const tagsWhitelist = [
  PageEnum.BASE_LOGIN_NAME,
  PageEnum.REDIRECT_NAME,
  PageEnum.NOT_FOUND_NAME,
  PageEnum.INVALID_NAME,
  PageEnum.NO_PERMISSION_NAME,
  PageEnum.SERVICE_ERROR_NAME,
];

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  path: string;
  name: string;
  hash: string;
  meta: object;
  params: object;
  query: object;
};

export type ITabsViewState = {
  tabsList: RouteItem[]; // 标签页
};

//保留固定路由
function retainAffixRoute(list: any[]) {
  return list.filter((item) => item?.meta?.affix ?? false);
}

export const useTabsViewStore = defineStore({
  id: "app-tabs-view",
  state: (): ITabsViewState => ({
    tabsList: [],
  }),
  getters: {},
  actions: {
    initTabs(routes) {
      // 初始化标签页
      this.tabsList = routes;
    },
    addTabs(route): boolean {
      // 添加标签页
      if (tagsWhitelist.includes(route.name)) return false;
      const isExists = this.tabsList.some((item) => item.fullPath == route.fullPath);
      if (!isExists) {
        this.tabsList.push(route);
      }
      return true;
    },
    /**
     * 关闭选中标签页的左侧标签页，不包含本身及激活的页面
     * @param path 右键菜单的触发页的路径
     * @param activePath 当前活跃页的路径
     */
    closeLeftTabs(path, activePath) {
      const index = this.tabsList.findIndex((item) => item.fullPath == path);
      this.tabsList = this.tabsList.filter(
        (item, i) => i >= index || item.fullPath == activePath || (item?.meta?.affix ?? false),
      );
    },
    closeRightTabs(path, activePath) {
      // 关闭右侧
      const index = this.tabsList.findIndex((item) => item.fullPath == path);
      this.tabsList = this.tabsList.filter(
        (item, i) => i <= index || item.fullPath == activePath || (item?.meta?.affix ?? false),
      );
    },
    closeOtherTabs(path, activePath) {
      // 关闭其他
      this.tabsList = this.tabsList.filter(
        (item) =>
          item.fullPath == path || item.fullPath == activePath || (item?.meta?.affix ?? false),
      );
    },
    closeCurrentTab(route) {
      // 关闭当前页
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList.splice(index, 1);
    },
    closeAllTabs() {
      // 关闭全部
      console.log(retainAffixRoute(this.tabsList));
      this.tabsList = retainAffixRoute(this.tabsList);
    },
  },
});
