<template>
  <div>
    <n-card title="表格" class="h-full shadow-sm rounded-16px">
      <n-space :vertical="true">
        <n-space>
          <n-button @click="getDataSource">有数据</n-button>
          <n-button @click="getEmptyDataSource">空数据</n-button>
        </n-space>
        <n-data-table :columns="columns" :data="dataSource" :flex-height="true" class="h-480px" />
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { DataTableColumn } from "naive-ui";

interface DataSource {
  name: string;
  age: number;
  address: string;
}

const Loading = window["$loading"];

/**
 * 获取指定整数范围内的随机整数
 * @param start - 开始范围
 * @param end - 结束范围
 */
const getRandomInteger = (end: number, start = 0) => {
  const range = end - start;
  const random = Math.floor(Math.random() * range + start);
  return random;
};

const columns: DataTableColumn[] = [
  {
    title: "Name",
    key: "name",
    align: "center",
  },
  {
    title: "Age",
    key: "age",
  },
  {
    title: "Address",
    key: "address",
  },
];

const dataSource = ref<DataSource[]>([]);

function createDataSource(): DataSource[] {
  return Array(100)
    .fill(1)
    .map((_item, index) => {
      return {
        name: `Name${index}`,
        age: getRandomInteger(30, 20),
        address: "中国",
      };
    });
}

function getDataSource() {
  Loading && Loading.start();
  setTimeout(() => {
    dataSource.value = createDataSource();
    Loading && Loading.finish();
    // setEmpty(!dataSource.value.length);
  }, 1000);
}

function getEmptyDataSource() {
  Loading && Loading.start();
  setTimeout(() => {
    dataSource.value = [];
    Loading && Loading.finish();
    // setEmpty(!dataSource.value.length);
  }, 1000);
}

onMounted(() => {
  getDataSource();
});
</script>
