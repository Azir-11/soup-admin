<template>
  <n-card :bordered="false" class="proCard">
    <div class="result-box">
      <n-result
        status="success"
        title="操作成功"
        description="提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，灰色区域可以显示一些补充的信息。"
      >
        <div class="result-box-extra">
          <p>已提交申请，等待财务部门审核。</p>
        </div>
        <template #footer>
          <div class="mb-4 flex justify-center">
            <n-space align="center">
              <n-button type="info" @click="goHome">回到首页</n-button>
              <n-button>查看详情</n-button>
              <n-button>打印</n-button>
            </n-space>
          </div>
        </template>
      </n-result>
    </div>
  </n-card>
</template>
<script lang="ts" setup>
import { useThemeVars } from "naive-ui";

const router = useRouter();
const themeVars = useThemeVars();

const getTableHeaderColor = computed(() => {
  return themeVars.value.tableHeaderColor;
});

const goHome = () => {
  router.push("/");
};
</script>
<style scoped>
.result-box {
  width: 72%;
  margin: 0 auto;
  text-align: center;
  padding-top: 5px;
}
.result-box .extra {
  padding: 24px 40px;
  text-align: left;
  background: v-bind(getTableHeaderColor);
  border-radius: 4px;
}
</style>
