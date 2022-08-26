import { computed } from "vue";
import { useSystemSettingStore } from "@/stores/modules/systemSetting";

export function useSystemSetting() {
  const systemStore = useSystemSettingStore();

  const getDarkTheme = computed(() => systemStore.darkTheme);

  const getAppTheme = computed(() => systemStore.appTheme);

  const getAppThemeList = computed(() => systemStore.appThemeList);

  const getNavMode = computed(() => systemStore.navMode);

  const getNavTheme = computed(() => systemStore.navTheme);

  const getHeaderSetting = computed(() => systemStore.headerSetting);

  const getMultiTabsSetting = computed(() => systemStore.multiTabsSetting);

  const getMenuSetting = computed(() => systemStore.menuSetting);

  const getCrumbsSetting = computed(() => systemStore.crumbsSetting);

  const getPermissionMode = computed(() => systemStore.permissionMode);

  const getIsPageAnimate = computed(() => systemStore.isPageAnimate);

  const getPageAnimateType = computed(() => systemStore.pageAnimateType);

  return {
    getDarkTheme,
    getAppTheme,
    getAppThemeList,
    getNavMode,
    getNavTheme,
    getHeaderSetting,
    getMultiTabsSetting,
    getMenuSetting,
    getCrumbsSetting,
    getPermissionMode,
    getIsPageAnimate,
    getPageAnimateType,
  };
}
