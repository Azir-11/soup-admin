<template>
  <n-layout :native-scrollbar="false" has-sider>
    <n-layout-sider
      v-if="!mobile"
      bordered
      show-trigger="bar"
      position="static"
      :on-update:collapsed="changeCollapsed"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="systemStore.viewSize.asideCollapsedWidth"
      :width="systemStore.viewSize.asideWidth"
      :native-scrollbar="false"
      class="max-h-screen shadow-xl"
    >
      <AsideMenu v-if="!mobile" />
    </n-layout-sider>
    <n-drawer
      v-model:show="showSideDrawder"
      :placement="'left'"
      close-on-esc
      :native-scrollbar="true"
    >
      <!-- 当点击菜单进行跳转之后隐藏drawer -->
      <AsideMenu @click-menu-item="changeCollapsed" />
    </n-drawer>
    <n-layout class="h-screen">
      <n-layout-header
        position="absolute"
        :style="`height:${systemStore.viewSize.headerHeight}px`"
        class="border-0 border-b border-solid border-gray-200"
      >
        <!-- 点击头部的menu按钮时修改collapesd的值 -->
        <PageHeader @update:collapsed="changeCollapsed" />
      </n-layout-header>
      <n-layout-content
        position="absolute"
        :style="`top:${systemStore.viewSize.headerHeight}px`"
        :class="{ 'bg-gray-100': getDarkTheme === false }"
      >
        <section>
          <div
            class="flex flex-col justify-end shadow-md"
            :style="`height:${systemStore.viewSize.tabsHeight}px;`"
            :class="{ 'bg-white': getDarkTheme === false }"
          >
            <TabsView />
          </div>
          <n-scrollbar>
            <div class="box-border p-4" :style="`height:${mainHeight}px`">
              <MainView />
            </div>
            <n-layout-footer
              :style="`height: ${systemStore.viewSize.footerHeight}px`"
              class="border-0 border-t border-solid border-gray-200"
              :class="{ 'bg-white': getDarkTheme === false }"
              ><PageFooter
            /></n-layout-footer>
          </n-scrollbar>
        </section>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { MainView } from "./components/Main";
import { AsideMenu } from "./components/Menu";
import { PageHeader } from "./components/Header";
import { TabsView } from "./components/Tab";
import { PageFooter } from "./components/Footer";
import { useSystemSetting } from "@/hooks/setting/useSystemSetting";
import { useSystemSettingStore } from "@/stores/modules/systemSetting";

const collapsed = ref<boolean>();
const mobile = ref<boolean>(false);
const showSideDrawder = ref(false);
const mobileWidth = 800;
const { getDarkTheme } = useSystemSetting();
const systemStore = useSystemSettingStore();
const mainHeight = computed(() => {
  return (
    document.body.clientHeight -
    systemStore.viewSize.headerHeight -
    systemStore.viewSize.tabsHeight -
    systemStore.viewSize.footerHeight -
    1
  );
});

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
  // window["$loading"].finish();
});
</script>

<style></style>
