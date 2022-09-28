<template>
  <n-grid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16">
    <n-grid-item v-for="item in cardData" :key="item.id">
      <gradient-bg class="h-100px" :start-color="item.colors[0]" :end-color="item.colors[1]">
        <h3 class="text-16px">{{ item.title }}</h3>
        <div class="pt-12px flex justify-between text-light">
          <!-- <Icon :icon="item.icon" class="text-32px" /> -->
          <div><n-icon :component="item.icon" size="34" /></div>
          <span class="text-4xl"
            >{{ item.unit }}<n-number-animation :from="1" :to="item.value"
          /></span>
        </div>
      </gradient-bg>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { GradientBg } from "./components";
import {
  CellularOutline,
  LogoYen,
  CloudDownloadOutline,
  CheckmarkDoneCircleOutline,
} from "@vicons/ionicons5";

interface CardData {
  id: string;
  title: string;
  value: number;
  unit: string;
  colors: [string, string];
  icon: any;
}

const cardData: CardData[] = [
  {
    id: "visit",
    title: "访问量",
    value: 1000000,
    unit: "",
    colors: ["#ec4786", "#b955a4"],
    icon: CellularOutline,
  },
  {
    id: "amount",
    title: "成交额",
    value: 234567.89,
    unit: "$",
    colors: ["#865ec0", "#5144b4"],
    icon: LogoYen,
  },
  {
    id: "download",
    title: "下载数",
    value: 666666,
    unit: "",
    colors: ["#56cdf3", "#719de3"],
    icon: CloudDownloadOutline,
  },
  {
    id: "trade",
    title: "成交数",
    value: 999999,
    unit: "",
    colors: ["#fcbc25", "#f68057"],
    icon: CheckmarkDoneCircleOutline,
  },
];
</script>
