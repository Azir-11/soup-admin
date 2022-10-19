module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "prettier",
    "plugin:prettier/recommended",
    "./.eslintrc-auto-import.json",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    'no-undef': 'off',
    semi: [1],
    camelcase: 0,
    // 屏蔽文件名必须为驼峰
    "vue/multi-word-component-names": 0,
    // 允许ts的any
    "@typescript-eslint/no-explicit-any": [0],
    // 允许出现未使用的变量
    "no-unused-vars": 0,
  },
};
