<template>
  <n-spin :show="loading">
    <div class="frame">
      <iframe ref="frameRef" :src="frameSrc" class="frame-iframe"></iframe>
    </div>
  </n-spin>
</template>
<script lang="ts" setup>
import { ref, unref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";

const currentRoute = useRoute();
const loading = ref(false);
const frameRef = ref<HTMLFrameElement | null>(null);
const frameSrc = ref<string>("");

if (unref(currentRoute.meta)?.frameSrc) {
  frameSrc.value = unref(currentRoute.meta)?.frameSrc as string;
}

const hideLoading = () => {
  loading.value = false;
};

const init = () => {
  nextTick(() => {
    const iframe = unref(frameRef);
    if (!iframe) return;
    const _frame = iframe as any;
    if (_frame.attachEvent) {
      _frame.attachEvent("onload", () => {
        hideLoading();
      });
    } else {
      iframe.onload = () => {
        hideLoading();
      };
    }
  });
};

onMounted(() => {
  loading.value = true;
  init();
});
</script>

<style scoped>
.frame {
  width: 100%;
  height: 100vh;
}
.frame iframe {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 0;
  box-sizing: border-box;
}
</style>
