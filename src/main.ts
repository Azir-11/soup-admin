import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "@/stores";
import { setupAssets } from "./plugins";
import { setupDirectives } from "./directives";

const setupApp = async () => {
  // import assets: js、css
  setupAssets();

  const app = createApp(App);

  // 安装pinia
  setupStore(app);

  // 注入自定义指令
  setupDirectives(app);

  // 安装路由
  await setupRouter(app);

  // mount app
  app.mount("#app");
};

setupApp();
