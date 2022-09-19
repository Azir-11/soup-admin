import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import "./assets/css/taiwind.css";
import { setupStore } from "@/stores";

async function setupApp() {
  const app = createApp(App);

  // 安装pinia
  setupStore(app);

  // 安装路由
  await setupRouter(app);

  // mount app
  app.mount("#app");
}

setupApp();
