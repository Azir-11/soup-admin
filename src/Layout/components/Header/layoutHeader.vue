<template>
  <div class="w-full h-full flex justify-between items-center">
    <div class="flex h-full">
      <div class="flex items-center">
        <n-button quaternary color="#1f2225" class="h-full pl-4" @click="changeCollapsed">
          <n-icon :size="size">
            <MenuOutline />
          </n-icon>
        </n-button>
        <n-button quaternary color="#1f2225" class="h-full pl-4" style="font-size: 20px">
          <n-icon>
            <ReloadOutline />
          </n-icon>
        </n-button>
      </div>
      <!-- 面包屑 -->
      <div class="ml-4 flex items-center">
        <n-breadcrumb>
          <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
            <n-breadcrumb-item>
              <n-dropdown
                v-if="routeItem.children.length"
                :options="routeItem.children"
                @select="dropdownSelect"
              >
                <span class="link-text">
                  {{ routeItem.meta.title }}
                </span>
              </n-dropdown>
              <span v-else class="link-text">
                {{ routeItem.meta.title }}
              </span>
            </n-breadcrumb-item>
          </template>
        </n-breadcrumb>
      </div>
    </div>
    <div class="h-full pr-10 flex items-center">
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-button quaternary class="h-full">
          <div class="flex items-center cursor-pointer">
            <n-avatar round bordered :size="size + 8" :src="user.imagePath || '/favicon.ico'" />
          </div>
        </n-button>
      </n-dropdown>
      <n-button quaternary class="h-full">
        <n-icon :size="size">
          <SettingsOutline />
        </n-icon>
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  MenuOutline,
  ReloadOutline,
  FlameOutline,
  SettingsOutline,
} from "@vicons/ionicons5";
import { renderIcon } from "@/utils/index";
import { storage } from "@/utils/storage";
import { CURRENT_USER } from "@/stores/mutation-types";
import { useRoute, useRouter } from "vue-router";
import { PageEnum } from "@/enums/pageEnum";
const emit = defineEmits(["update:collapsed"]);

const BASE_HOME = PageEnum.BASE_HOME;

const message = window["$message"];

const router = useRouter();
const route = useRoute();

/**
 * 面包屑导航
 */
const generator: any = (routerMap) => {
  return routerMap.map((item) => {
    const currentMenu = {
      ...item,
      label: item.meta.title,
      key: item.name,
      disabled: item.path === "/",
    };
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentMenu.children = generator(item.children, currentMenu);
    }
    return currentMenu;
  });
};

const breadcrumbList = computed(() => {
  return generator(route.matched);
});
const dropdownSelect = (key) => {
  router.push({ name: key });
};

// 图表大小
const size = ref(18);

const changeCollapsed = () => {
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
        message.success("已退出");
        storage.clear();
        router.replace(`?redirect=${BASE_HOME}`);
      },
      onNegativeClick: () => {
        return;
      },
    });
  } else if (key == "editProfile" || key == "profile") {
    router.push({ path: `/setting/account` });
  }
};
</script>
