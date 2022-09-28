import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "@/stores";
import { setupAssets } from "./plugins";

async function setupApp() {
  // import assets: js、css
  setupAssets();

  const app = createApp(App);

  // 安装pinia
  setupStore(app);

  // 安装路由
  await setupRouter(app);

  // mount app
  app.mount("#app");
}

setupApp();
