<template>
  <div>
    <RouterView v-slot="{ Component }" class="p-1.5">
      <transition :name="getIsPageAnimate ? getPageAnimateType : 'null'" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { useSystemSetting } from "@/hooks/setting/useSystemSetting";

const { getIsPageAnimate, getPageAnimateType } = useSystemSetting();
</script>

<style lang="less" scoped>
@import "@/styles/index.less";
</style>
