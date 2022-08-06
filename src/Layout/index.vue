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
      :collapsed-width="64"
      :width="200"
      :native-scrollbar="false"
      style="max-height: 100vh"
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
    <n-layout style="height: 100vh">
      <n-layout-header position="absolute" style="height: 64px">
        <!-- 点击头部的menu按钮时修改collapesd的值 -->
        <PageHeader @update:collapsed="changeCollapsed" />
      </n-layout-header>
      <n-layout-content
        position="absolute"
        style="top: 64px; background-color: rgba(246, 249, 248, 1)"
        class="h-auto"
      >
        <div style="max-height: 100%">
          <div class="bg-white">
            <TabsView />
          </div>
          <n-scrollbar>
            <div class="p-4 mt-1 box-border" style="min-height: calc(100vh - 159px)">
              <MainView id="MainView" />
            </div>
            <n-layout-footer style="border-top: #efeff5 1px solid" class="bg-white"
              ><PageFooter
            /></n-layout-footer>
          </n-scrollbar>
        </div>
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
import { ref, onMounted } from "vue";

const collapsed = ref<boolean>();
const mobile = ref<boolean>(false);
const showSideDrawder = ref(false);
const mobileWidth = 800;

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
    console.log("当前是移动端");
    mobile.value = true;
  } else {
    console.log("当前是PC端");
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
