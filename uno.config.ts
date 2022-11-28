import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  exclude: [
    "node_modules",
    ".git",
    ".husky",
    ".vscode",
    "dist",
    "public",
    "build",
    "mock",
    "./stats.html",
  ],
  presets: [presetUno({ dark: "class" })],
  shortcuts: {
    "wh-full": "w-full h-full",
    "wh-screen": "w-screen h-screen",
    "flex-center": "flex justify-center items-center",
    "flex-x-center": "flex justify-center",
    "flex-y-center": "flex items-center",
    "flex-1-hidden": "flex-1 overflow-hidden",
    globalComponents: "fixed transition-all",
  },
  theme: {},
});
