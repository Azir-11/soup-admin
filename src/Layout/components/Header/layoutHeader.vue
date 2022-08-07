<template>
  <div class="w-full h-full flex justify-between items-center">
    <div class="flex items-center">
      <n-button-group>
        <n-button text color="#1f2225" class="pl-4" @click="changeCollapsed">
          <n-icon :size="size">
            <MenuOutline />
          </n-icon>
        </n-button>
        <n-button text color="#1f2225" class="pl-4" style="font-size: 20px">
          <n-icon>
            <ReloadOutline />
          </n-icon>
        </n-button>
      </n-button-group>
    </div>
    <div class="pr-10 flex items-center gap-6">
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <div class="flex items-center cursor-pointer">
          <n-avatar round bordered :size="size + 8" :src="user.imagePath || '/favicon.ico'" />
        </div>
      </n-dropdown>
      <n-icon :size="size">
        <SettingsOutline />
      </n-icon>
    </div>
  </div>
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
import { renderIcon } from "@/utils/index";
import { storage } from "@/utils/storage";
import { CURRENT_USER } from "@/stores/mutation-types";
import { useRouter } from "vue-router";
import { PageEnum } from "@/enums/pageEnum";
import { ref } from "vue";
const emit = defineEmits(["update:collapsed"]);

const BASE_HOME = PageEnum.BASE_HOME;

const message = window["$message"];

const router = useRouter();

const size = ref(24);

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
