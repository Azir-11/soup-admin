<template>
  <section class="flex flex-col wh-full">
    <GlobalHeader
      class="z-1001 globalComponents w-full left-0 top-0"
      :class="activeTheme"
      :style="`padding-left:${activemenuWidth}px`"
      @update:collapsed="changeCollapsed"
    />
    <GlobalTabs
      class="z-1002 globalComponents w-full left-0"
      :class="activeTheme"
      :style="`height:${tabsHeight}px;padding-left:${activemenuWidth}px;top:${headerHeight}px`"
    />
    <GlobalMenu
      class="z-1003 globalComponents h-screen left-0 top-0"
      :class="activeTheme"
      :mobile="mobile"
      :menu-width="menuWidth"
      :show-side-drawder="showSideDrawder"
      :menu-collapsed-width="menuCollapsedWidth"
      :collapsed="collapsed"
      @update:collapsed="changeCollapsed"
    />
    <GlobalMain
      class="z-999 w-full flex-grow"
      :class="getDarkTheme ? 'bg-[#101014]' : 'bg-gray-100'"
      :style="`padding-left:${activemenuWidth}px;padding-top:${headerHeight + tabsHeight}px`"
    />
    <GlobalFooter
      class="z-1004 w-screen bottom-0 bg-white"
      :style="`padding-left:${activemenuWidth}px;`"
    />
  </section>
</template>

<script setup lang="ts">
import { GlobalHeader } from "./components/Header";
import { GlobalTabs } from "./components/Tab";
import { GlobalMain } from "./components/Main";
import { GlobalMenu } from "./components/Menu";
import { GlobalFooter } from "./components/Footer";
import { useSystemSetting } from "@/hooks/setting/useSystemSetting";

const mobileWidth = 800;
const { getDarkTheme } = useSystemSetting();

// 是否为移动端
const mobile = ref<boolean>(false);
// 是否显示抽屉菜单
const showSideDrawder = ref(false);
// 头部菜单的高度
const headerHeight = ref(64);
// tab栏高度
const tabsHeight = ref(46);
// 菜单展开时的宽度
const menuWidth = ref(200);
// 菜单收缩宽度
const menuCollapsedWidth = ref(64);
// 菜单展开状态
const collapsed = ref(false);
// 当前菜单宽度
const activemenuWidth = computed(() => {
  if (mobile.value) {
    return 0;
  }
  return collapsed.value ? menuCollapsedWidth.value : menuWidth.value;
});
// 获取当前应该活跃的背景色(黑/白)
const activeTheme = computed(() => (getDarkTheme.value ? "bg-[#18181c]" : "bg-white"));

/**
 * 如果当前是PC端，则伸缩侧边导航
 * 如果当前是移动端，则显隐drawer
 */
const changeCollapsed = () => {
  if (mobile.value && collapsed.value) {
    showSideDrawder.value = !showSideDrawder.value;
  } else {
    collapsed.value = !collapsed.value;
  }
};

//判断是否触发移动端模式
const checkMobileMode = () => {
  if (document.body.clientWidth <= mobileWidth) {
    // console.log("当前是移动端");
    mobile.value = true;
  } else {
    // console.log("当前是PC端");
    // 如果从移动端切换到PC端，则将drawer隐藏
    if (mobile.value) {
      showSideDrawder.value = false;
    }
    mobile.value = false;
  }
};

const watchWidth = () => {
  const Width = document.body.clientWidth;
  if (Width <= 950) {
    collapsed.value = true;
  } else collapsed.value = false;
  checkMobileMode();
};

onMounted(() => {
  checkMobileMode();
  watchWidth();
  window.addEventListener("resize", watchWidth);
});
</script>

<style></style>
