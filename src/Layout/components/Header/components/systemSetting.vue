<template>
  <n-drawer v-model:show="state.showDrawer" :auto-focus="false" :width="state.width">
    <n-drawer-content title="项目配置" closable>
      <section>
        <n-divider> 主题 </n-divider>
        <div class="flex items-center justify-center">
          <n-tooltip placement="bottom">
            <template #trigger>
              <n-switch v-model:value="systemStore.darkTheme" :rail-style="railStyle">
                <template #checked>
                  <n-icon size="14" color="#ffd93b">
                    <SunnySharp />
                  </n-icon>
                </template>
                <template #unchecked>
                  <n-icon size="14" color="#ffd93b">
                    <Moon />
                  </n-icon>
                </template>
              </n-switch>
            </template>
            <span>{{ systemStore.darkTheme ? "深" : "浅" }}色主题</span>
          </n-tooltip>
        </div>

        <n-divider> 系统主题 </n-divider>
        <div class="flex flex-col">
          <div class="grid h-24 grid-cols-9 gap-2">
            <span
              v-for="(item, index) in systemStore.appThemeList"
              :key="index"
              :style="{ 'background-color': item }"
              class="flex h-8 w-8 cursor-pointer items-center justify-center"
              @click="togTheme(item)"
            >
              <n-icon v-if="item === systemStore.appTheme" size="18" color="#fff">
                <Checkmark />
              </n-icon>
            </span>
          </div>
          <n-button secondary size="small"> 更多主题色 </n-button>
        </div>
      </section>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { CSSProperties } from "vue";
import { useSystemSettingStore } from "@/stores/modules/systemSetting";
import { Moon, SunnySharp, Checkmark } from "@vicons/ionicons5";

const state = reactive({
  showDrawer: false,
  width: 300,
  alertText:
    "该功能主要实时预览各种布局效果，更多完整配置在 projectSetting.ts 中设置，建议在生产环境关闭该布局预览功能。",
});

const changeDrawer = (flag: boolean = true) => {
  state.showDrawer = flag;
};
defineExpose({ changeDrawer });

const systemStore = useSystemSettingStore();

// 系统主题按钮的背景色
const railStyle = ({ checked }: { checked: boolean }) => {
  const style: CSSProperties = {};
  if (checked) {
    // 暮云灰
    style.background = "#4f383e";
  } else {
    // 晴蓝
    style.background = "#5698c3";
  }
  return style;
};

/**
 * 修改主题色
 * @param color 颜色值
 */
const togTheme = (color) => {
  systemStore.appTheme = color;
};
</script>
