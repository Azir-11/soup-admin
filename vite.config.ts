import { fileURLToPath, URL } from "url";

import { defineConfig, loadEnv } from "vite";
import dayjs from "dayjs";
import { setupVitePlugins } from "./build";

/** 项目构建时间 */
const PROJECT_BUILD_TIME = dayjs().format("YYYY-MM-DD HH:mm:ss");

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ImportMetaEnv;

  return {
    plugins: setupVitePlugins(viteEnv),
    define: {
      PROJECT_BUILD_TIME: JSON.stringify(PROJECT_BUILD_TIME),
    },
    server: {
      host: "0.0.0.0",
      port: 5200,
      // 启动之后自动打开页面
      open: true,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
