/** @type {import('tailwindcss').Config} */
module.exports = {
  // 3.0中已经内置，无需再次声明
  // mode: "jit",
  //移除生产环境下没有使用到的样式声明
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
