<template>
  <footer class="h-20 py-2 flex flex-col justify-center">
    <a v-for="(item, index) in data" :key="index" class="block text-center"> {{ item }} </a>
  </footer>
</template>

<script setup lang="ts">
import { ProjectEnum } from "@/enums/projectEnums";

const data = [ProjectEnum.COPYRIGHT_INFORMATION, ProjectEnum.RECORD_INFORMATION];
</script>
