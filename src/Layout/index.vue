<template>
  <n-layout has-sider>
    <n-layout-sider
      v-if="!mobile"
      bordered
      show-trigger="bar"
      position="static"
      :on-update:collapsed="changeCollapsed"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="systemStore.menuSetting.minMenuWidth"
      :width="systemStore.menuSetting.menuWidth"
      class="max-h-screen shadow-xl"
    >
      <AsideMenu v-if="!mobile" :collapsed="collapsed" />
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
        :style="`height:${systemStore.headerSetting.headerHeight}px`"
        class="border-0 border-b border-solid border-gray-200"
      >
        <!-- 点击头部的menu按钮时修改collapesd的值 -->
        <PageHeader @update:collapsed="changeCollapsed" />
      </n-layout-header>
      <n-layout-content
        position="absolute"
        :style="`top:${systemStore.headerSetting.headerHeight}px`"
        :class="{ 'bg-gray-100': getDarkTheme === false }"
      >
        <n-scrollbar>
          <section>
            <div
              class="flex flex-col justify-end shadow-md"
              :class="{ 'bg-white': getDarkTheme === false }"
            >
              <TabsView />
            </div>
            <div class="box-border h-full p-4">
              <MainView />
            </div>
          </section>
        </n-scrollbar>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { MainView } from "./components/Main";
import { AsideMenu } from "./components/Menu";
import { PageHeader } from "./components/Header";
import { TabsView } from "./components/Tab";
import { useSystemSetting } from "@/hooks/setting/useSystemSetting";
import { useSystemSettingStore } from "@/stores/modules/systemSetting";

const collapsed = ref<boolean>();
const mobile = ref<boolean>(false);
const showSideDrawder = ref(false);
const mobileWidth = 800;
const { getDarkTheme } = useSystemSetting();
const systemStore = useSystemSettingStore();

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
