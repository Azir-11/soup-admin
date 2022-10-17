<template>
  <aside class="shadow-xl">
    <section>
      <n-space vertical>
        <n-layout v-if="!mobile" has-sider>
          <n-layout-sider
            bordered
            show-trigger="bar"
            position="static"
            :collapsed="collapsed"
            collapse-mode="width"
            :collapsed-width="menuCollapsedWidth"
            :width="menuWidth"
          >
            <Menu
          /></n-layout-sider>
        </n-layout>
        <n-drawer
          v-else
          v-model:show="thisShowSideDrawder"
          :placement="'left'"
          close-on-esc
          :native-scrollbar="true"
          :on-mask-click="handleUpdateValue"
        >
          <Menu @click-menu-item="handleUpdateValue"
        /></n-drawer>
      </n-space>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { Menu } from "./components";

const props = defineProps({
  mobile: {
    type: Boolean,
    default: false,
  },
  menuWidth: {
    type: Number,
    default: 200,
  },
  menuCollapsedWidth: {
    type: Number,
    default: 64,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  showSideDrawder: {
    type: Boolean,
    default: false,
  },
});
const thisShowSideDrawder = ref(false);

const emit = defineEmits(["update:collapsed"]);

watch(
  () => props.showSideDrawder,
  () => {
    thisShowSideDrawder.value = props.showSideDrawder;
  },
);

// 点击菜单
const handleUpdateValue = () => {
  emit("update:collapsed");
};
</script>

<style scoped>
.n-menu {
  width: 100%;
}
</style>
