<template>
  <header class="shadow-sm">
    <div class="flex h-full w-full items-center justify-between">
      <div class="flex h-full">
        <div class="flex items-center">
          <div class="hoverBtn" @click="changeCollapsed">
            <n-icon :size="size">
              <MenuOutline />
            </n-icon>
          </div>
          <div class="hoverBtn">
            <n-icon :size="size">
              <ReloadOutline />
            </n-icon>
          </div>
        </div>
        <!-- 面包屑 -->
        <div v-if="theme.header.crumb.visible" class="ml-4 flex items-center"><breadcrumb /></div>
      </div>
      <div class="flex h-full items-center pr-10">
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
          <div class="hoverBtn">
            <n-avatar
              round
              bordered
              :size="size + 8"
              :src="user.imagePath || '/icon/ms-icon-310x310.png'"
            />
          </div>
        </n-dropdown>
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="hoverBtn" @click="openSetting">
              <n-icon :size="size">
                <SettingsOutline />
              </n-icon></div></template
          ><span>项目配置</span></n-tooltip
        >
      </div>
    </div>
    <settingDrawer />
  </header>
</template>

<script setup lang="ts">
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  MenuOutline,
  ReloadOutline,
  FlameOutline,
  SettingsOutline,
} from "@vicons/ionicons5";
import { renderIcon } from "@/utils/router/index";
import { storage } from "@/utils/storage/storage";
import { CURRENT_USER } from "@/stores/mutation-types";
import { useThemeStore, useAppStore } from "@/stores";
import { useAuthStore } from "@/stores";
import settingDrawer from "./components/themeSetting/index.vue";
import breadcrumb from "./components/breadcrumb/index.vue";

const emit = defineEmits(["update:collapsed"]);

const app = useAppStore();
const message = window["$message"];
const router = useRouter();
const userStore = useAuthStore();
const theme = useThemeStore();

// 图表大小
const size = ref(18);

const changeCollapsed = () => {
  if (app.isMobile) {
    app.setSiderCollapse(false);
    app.setMenuDrawerVisible(true);
  } else {
    app.toggleSiderCollapse();
  }
  emit("update:collapsed");
};

const user = storage.get(CURRENT_USER);

const options = [
  {
    label: `${user.userName}`,
    key: "userName",
    icon: renderIcon(FlameOutline),
  },
  {
    label: "用户资料",
    key: "profile",
    icon: renderIcon(UserIcon),
  },
  {
    label: "编辑用户资料",
    key: "editProfile",
    icon: renderIcon(EditIcon),
  },
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
];

const handleSelect = (key: string | number) => {
  if (key === "logout") {
    window["$dialog"].warning({
      title: "警告",
      content: "确定退出吗？",
      positiveText: "确定",
      negativeText: "再想想",
      onPositiveClick: () => {
        userStore.logout().then(() => {
          message.success("已退出");
        });
      },
      onNegativeClick: () => {
        return;
      },
    });
  } else if (key == "editProfile" || key == "profile") {
    router.push({ path: `/setting/account` });
  }
};

const openSetting = () => {
  app.openSettingDrawer();
};
</script>
