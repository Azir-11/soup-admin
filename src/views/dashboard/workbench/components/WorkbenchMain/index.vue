<template>
  <n-grid :item-responsive="true" :x-gap="16" :y-gap="16">
    <n-grid-item span="0:24 640:24 1024:16">
      <n-space :vertical="true" :size="16">
        <n-card
          title="项目主要技术栈"
          :bordered="false"
          size="small"
          class="shadow-sm rounded-16px"
        >
          <template #header-extra>
            <a class="text-primary" href="javascript:;">更多技术栈</a>
          </template>
          <n-grid :item-responsive="true" responsive="screen" cols="m:2 l:3" :x-gap="8" :y-gap="8">
            <n-grid-item v-for="item in technology" :key="item.id">
              <technology-card v-bind="item" />
            </n-grid-item>
          </n-grid>
        </n-card>
        <n-card title="动态" :bordered="false" size="small" class="shadow-sm rounded-16px">
          <template #header-extra>
            <a class="text-primary" href="javascript:;">更多动态</a>
          </template>
          <n-list>
            <n-list-item v-for="item in activity" :key="item.id">
              <template #prefix>
                <n-avatar
                  round
                  bordered
                  :size="48"
                  :src="authStore?.avatar || '/icon/ms-icon-310x310.png'"
                />
              </template>
              <n-thing :title="item.content" :description="item.time" />
            </n-list-item>
          </n-list>
        </n-card>
      </n-space>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:8">
      <n-space :vertical="true" :size="16">
        <n-card title="快捷操作" :bordered="false" size="small" class="shadow-sm rounded-16px">
          <n-grid :item-responsive="true" responsive="screen" cols="m:2 l:3" :x-gap="8" :y-gap="8">
            <n-grid-item v-for="item in shortcuts" :key="item.id">
              <shortcuts-card v-bind="item" />
            </n-grid-item>
          </n-grid>
        </n-card>
        <n-card title="创意" :bordered="false" size="small" class="shadow-sm rounded-16px">
          <!-- <icon-custom-banner class="text-400px text-primary" /> -->
        </n-card>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { ShortcutsCard, TechnologyCard } from "./components";
import { useAuthStore } from "@/stores";

interface Technology {
  id: number;
  name: string;
  description: string;
  author: string;
  site: string;
  icon: string;
  iconColor?: string;
}

const authStore = useAuthStore();

const technology: Technology[] = [
  {
    id: 0,
    name: "Vue",
    description: "一套用于构建用户界面的渐进式框架",
    author: "尤雨溪 - Evan You",
    site: "https://v3.cn.vuejs.org/",
    icon: "vscode-icons:file-type-vue",
  },
  {
    id: 1,
    name: "TypeScript",
    description: "JavaScript类型的超集，它可以编译成纯JavaScript",
    author: "微软 - Microsoft",
    site: "https://www.typescriptlang.org/",
    icon: "vscode-icons:file-type-typescript-official",
  },
  {
    id: 2,
    name: "Vite",
    description: "下一代前端开发与构建工具",
    author: "尤雨溪 - Evan You",
    site: "https://vitejs.cn/",
    icon: "vscode-icons:file-type-vite",
  },
  {
    id: 3,
    name: "NaiveUI",
    description: "一个 Vue 3 组件库",
    author: "图森未来 - TuSimple",
    site: "https://www.naiveui.com/zh-CN/os-theme",
    icon: "mdi:alpha-n-box-outline",
    iconColor: "#5fbc22",
  },
  {
    id: 4,
    name: "UnoCSS",
    description: "下一代实用优先的CSS框架",
    author: "Anthony Fu",
    site: "https://uno.antfu.me/?s=",
    icon: "logos:unocss",
    iconColor: "#48b0f1",
  },
  {
    id: 5,
    name: "Pinia",
    description: "vue状态管理框架,支持vue2、vue3",
    author: "Posva",
    site: "https://pinia.esm.dev/",
    icon: "mdi:fruit-pineapple",
    iconColor: "#fecf48",
  },
];

interface Activity {
  id: number;
  content: string;
  time: string;
}

const activity: Activity[] = [
  {
    id: 3,
    content: "SoupLee 准备为soup-admin 1.0的发布做充分的准备工作！",
    time: "2021-10-3 14:52:00",
  },
  {
    id: 2,
    content: "SoupLee 正在忙于为soup-admin写项目说明文档!",
    time: "2021-10-03 14:27:11",
  },
  {
    id: 1,
    content: "SoupLee 刚才把工作台页面随便写了一些，凑合能看了！",
    time: "2021-9-28 22:35:21",
  },
  {
    id: 0,
    content: "SoupLee 在2022年6月20日创建了开源项目soup-admin!",
    time: "2022-06-20 13:00:00",
  },
];

interface Shortcuts {
  id: number;
  label: string;
  icon: string;
  iconColor: string;
}

const shortcuts: Shortcuts[] = [
  { id: 0, label: "主控台", icon: "mdi:desktop-mac-dashboard", iconColor: "#409eff" },
  { id: 1, label: "系统管理", icon: "ic:outline-settings", iconColor: "#7238d1" },
  { id: 2, label: "权限管理", icon: "mdi:family-tree", iconColor: "#f56c6c" },
  { id: 3, label: "组件", icon: "fluent:app-store-24-filled", iconColor: "#19a2f1" },
  { id: 4, label: "表格", icon: "mdi:table-large", iconColor: "#fab251" },
  { id: 5, label: "图表", icon: "mdi:chart-areaspline", iconColor: "#8aca6b" },
];
</script>
