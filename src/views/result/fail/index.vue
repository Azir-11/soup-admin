<template>
  <n-card :bordered="false" class="proCard">
    <div class="result-box">
      <n-result status="error" title="操作失败" description="请核对并修改以下信息后，再重新提交。">
        <div class="result-box-extra">
          <p>您提交的内容有如下错误：</p>
          <p class="mt-3">
            <n-space align="center">
              <n-icon size="20" color="#f0a020">
                <InformationCircleOutline />
              </n-icon>
              <span>认证照片不够清晰</span>
              <n-button type="info" text>立即修改</n-button>
            </n-space>
          </p>
          <p class="mt-3">
            <n-space>
              <n-icon size="20" color="#f0a020">
                <InformationCircleOutline />
              </n-icon>
              <span>备注包含敏感字符，并且不能包含政治相关</span>
              <n-button type="info" text>立即修改</n-button>
            </n-space>
          </p>
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
import { InformationCircleOutline } from "@vicons/ionicons5";

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
