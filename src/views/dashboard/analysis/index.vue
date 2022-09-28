<template>
  <n-space :vertical="true" :size="16">
    <top-chart />
    <data-card />
    <bottom-part />
  </n-space>
</template>

<script setup>
import { BottomPart, DataCard, TopChart } from "./components";
</script>
