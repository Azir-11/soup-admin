<template>
  <n-card>
    <n-calendar
      v-model:value="value"
      #="{ year, month, date }"
      :is-date-disabled="isDateDisabled"
      @update:value="handleUpdateValue"
    >
      {{ year }}-{{ month }}-{{ date }}
    </n-calendar></n-card
  >
</template>

<script setup lang="ts">
import { isYesterday, addDays } from "date-fns/esm";

const message = window["$message"];
const value = ref(addDays(Date.now(), 1).valueOf());
const handleUpdateValue = (
  _: number,
  { year, month, date }: { year: number; month: number; date: number },
) => {
  message.success(`${year}-${month}-${date}`);
};
const isDateDisabled = (timestamp: number) => {
  if (isYesterday(timestamp)) {
    return true;
  }
  return false;
};
</script>
