import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import unplugin from "./unplugin";
import AutoImport from "unplugin-auto-import/vite";
import Unocss from "unocss/vite";
import eslintPlugin from "vite-plugin-eslint";
import { viteMockServe } from "vite-plugin-mock";

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  const plugins = [
    vue(),
    ...unplugin(viteEnv),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
    }),
    AutoImport({
      // targets to transform
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],

      // global imports to register
      imports: [
        // 插件预设支持导入的api
        "vue",
        "pinia",
        "vue-router",
        // 自定义导入的api
      ],

      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true, //设置为true
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: "./auto-imports.d.ts",
    }),
    viteMockServe({
      mockPath: "./mock",
      supportTs: true,
    }),
    Unocss(),
  ];

  return plugins;
}
