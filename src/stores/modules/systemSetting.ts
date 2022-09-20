import { store } from "@/stores";
import projectSetting from "@/settings/systemSetting";
import type {
  LHeaderSetting,
  LMenuSetting,
  LMultiTabsSetting,
  LCrumbsSetting,
} from "../../types/layout";

const {
  darkTheme,
  appTheme,
  appThemeList,
  navMode,
  navTheme,
  MobileModel,
  headerSetting,
  menuSetting,
  multiTabsSetting,
  crumbsSetting,
  permissionMode,
  isPageAnimate,
  pageAnimateType,
} = projectSetting;

interface ProjectSettingState {
  darkTheme: boolean; //深色主题
  appTheme: string; //系统主题色
  appThemeList; //系统内置主题色列表
  navMode: string; //导航模式
  navTheme: string; //导航风格
  headerSetting: LHeaderSetting; //顶部设置
  menuSetting: LMenuSetting; //多标签
  multiTabsSetting: LMultiTabsSetting; //多标签
  crumbsSetting: LCrumbsSetting; //面包屑
  permissionMode: string; //权限模式
  isPageAnimate: boolean; //是否开启路由动画
  pageAnimateType: string; //路由动画类型
  MobileModel: boolean; // 是否处于移动端模式
}

export const useSystemSettingStore = defineStore({
  id: "app-system-setting",
  state: (): ProjectSettingState => ({
    darkTheme,
    appTheme,
    appThemeList,
    navMode,
    navTheme,
    MobileModel,
    headerSetting,
    menuSetting,
    multiTabsSetting,
    crumbsSetting,
    permissionMode,
    isPageAnimate,
    pageAnimateType,
  }),
  getters: {
    getNavMode(): string {
      return this.navMode;
    },
    getNavTheme(): string {
      return this.navTheme;
    },
    getMobileModel(): boolean {
      return this.MobileModel;
    },
    getHeaderSetting(): object {
      return this.headerSetting;
    },
    getMenuSetting(): object {
      return this.menuSetting;
    },
    getMultiTabsSetting(): object {
      return this.multiTabsSetting;
    },
    getCrumbsSetting(): object {
      return this.multiTabsSetting;
    },
    getPermissionMode(): string {
      return this.permissionMode;
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate;
    },
    getPageAnimateType(): string {
      return this.pageAnimateType;
    },
  },
  actions: {
    setNavTheme(value: string): void {
      this.navTheme = value;
    },
    setMobileModel(value: boolean): void {
      this.MobileModel = value;
    },
  },
});

// Need to be used outside the setup
export function useSystemSettingStoreWithOut() {
  return useSystemSettingStore(store);
}
