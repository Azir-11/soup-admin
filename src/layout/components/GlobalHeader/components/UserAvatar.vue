<template>
  <hover-container class="h-full">
    <n-dropdown :options="options" @select="handleDropdown">
      <div class="flex items-center justify-center w-[150px] h-full">
        <icon-local-avatar class="text-32px" />
        <span class="pl-8px text-16px">{{ auth.userName }}</span>
      </div>
    </n-dropdown>
  </hover-container>
</template>

<script lang="ts" setup>
import type { DropdownOption } from "naive-ui";
import { useAuthStore } from "@/stores";
import { useIconRender } from "@/composables";

const dialog = window["$dialog"];
const auth = useAuthStore();
const { iconRender } = useIconRender();

const options: DropdownOption[] = [
  {
    label: "用户中心",
    key: "user-center",
    icon: iconRender({ icon: "carbon:user-avatar" }),
  },
  {
    type: "divider",
    key: "divider",
  },
  {
    label: "退出登录",
    key: "logout",
    icon: iconRender({ icon: "carbon:logout" }),
  },
];

type DropdownKey = "user-center" | "logout";

function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  if (key === "logout") {
    dialog?.info({
      title: "提示",
      content: "您确定要退出登录吗？",
      positiveText: "确定",
      negativeText: "取消",
      onPositiveClick: () => {
        auth.logout();
      },
    });
  }
}
</script>
