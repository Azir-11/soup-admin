import { defineStore } from "pinia";
import { darkTheme } from "naive-ui";
import {
  clearThemeSettings,
  getNaiveThemeOverrides,
  initThemeSettings,
  setThemeSettings,
} from "./helpers";

export const useThemeStore = defineStore("theme-store", {
  state: () => initThemeSettings(),
  getters: {
    /** naiveUI的主题配置 */
    naiveThemeOverrides(state) {
      const overrides = getNaiveThemeOverrides({ primary: state.themeColor, ...state.otherColor });
      return overrides;
    },
    /** naive-ui暗黑主题 */
    naiveTheme(state) {
      return state.darkMode ? darkTheme : undefined;
    },
    /** 页面动画模式 */
    pageAnimateMode(state) {
      return state.page.animate ? state.page.animateMode : undefined;
    },
  },
  actions: {
    /** 重置theme状态 */
    resetThemeStore() {
      clearThemeSettings();
      this.$reset();
    },
    /** 缓存主题配置 */
    cacheThemeSettings() {
      const isProd = import.meta.env.PROD;
      if (isProd) {
        setThemeSettings(this.$state);
      }
    },
    /** 设置暗黑模式 */
    setDarkMode(darkMode: boolean) {
      this.darkMode = darkMode;
    },
    /** 设置自动跟随系统主题 */
    setFollowSystemTheme(visible: boolean) {
      this.followSystemTheme = visible;
    },
    /** 自动跟随系统主题 */
    setAutoFollowSystemMode(darkMode: boolean) {
      if (this.followSystemTheme) {
        this.darkMode = darkMode;
      }
    },
    /** 切换/关闭 暗黑模式 */
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
    /** 设置布局最小宽度 */
    setLayoutMinWidth(minWidth: number) {
      this.layout.minWidth = minWidth;
    },
    /** 设置布局模式 */
    setLayoutMode(mode) {
      this.layout.mode = mode;
    },
    /** 设置侧边栏反转色 */
    setSiderInverted(isInverted: boolean) {
      this.sider.inverted = isInverted;
    },
    /** 设置头部反转色 */
    setHeaderInverted(isInverted: boolean) {
      this.header.inverted = isInverted;
    },
    /** 设置系统主题颜色 */
    setThemeColor(themeColor: string) {
      this.themeColor = themeColor;
    },
    /** 设置头部高度 */
    setHeaderHeight(height: number | null) {
      if (height) {
        this.header.height = height;
      }
    },
    /** 设置头部面包屑可见 */
    setHeaderCrumbVisible(visible: boolean) {
      this.header.crumb.visible = visible;
    },
    /** 设置头部面包屑图标可见 */
    setHeaderCrumbIconVisible(visible: boolean) {
      this.header.crumb.showIcon = visible;
    },
    /** 设置多页签可见 */
    setTabVisible(visible: boolean) {
      this.tab.visible = visible;
    },
    /** 设置多页签高度 */
    setTabHeight(height: number | null) {
      if (height) {
        this.tab.height = height;
      }
    },
    /** 设置多页签缓存 */
    setTabIsCache(isCache: boolean) {
      this.tab.isCache = isCache;
    },
    /** 侧边栏宽度 */
    setSiderWidth(width: number | null) {
      if (width) {
        this.sider.width = width;
      }
    },
    /** 侧边栏折叠时的宽度 */
    setSiderCollapsedWidth(width: number) {
      this.sider.collapsedWidth = width;
    },
    /** vertical-mix模式下侧边栏宽度 */
    setMixSiderWidth(width: number | null) {
      if (width) {
        this.sider.mixWidth = width;
      }
    },
    /** vertical-mix模式下侧边栏折叠时的宽度 */
    setMixSiderCollapsedWidth(width: number) {
      this.sider.mixCollapsedWidth = width;
    },
    /** vertical-mix模式下侧边栏展示子菜单的宽度 */
    setMixSiderChildMenuWidth(width: number) {
      this.sider.mixChildMenuWidth = width;
    },
    /** 设置水平模式的菜单的位置 */
    setHorizontalMenuPosition(position) {
      this.menu.horizontalPosition = position;
    },
    /** 设置底部是否固定 */
    setFooterIsFixed(isFixed: boolean) {
      this.footer.fixed = isFixed;
    },
    /** 设置底部高度 */
    setFooterHeight(height: number) {
      this.footer.height = height;
    },
    /** 设置切换页面时是否过渡动画 */
    setPageIsAnimate(animate: boolean) {
      this.page.animate = animate;
    },
    /** 设置页面过渡动画类型 */
    setPageAnimateMode(mode) {
      this.page.animateMode = mode;
    },
  },
});
