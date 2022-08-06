<template><div></div></template>
<script setup lang="ts">
import { useLoadingBar, useMessage, useDialog } from "naive-ui";

//挂载在 window 方便与在js中使用
window["$message"] = useMessage();
window["$dialog"] = useDialog();
window["$loading"] = useLoadingBar();
</script>
