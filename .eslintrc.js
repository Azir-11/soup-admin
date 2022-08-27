module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    // 此条内容开启会导致 全局定义的 ts 类型报  no-undef 错误，因为
    // https://cn.eslint.org/docs/rules/
    "eslint:recommended",
    // "plugin:@typescript-eslint/recommended", // typescript-eslint推荐规则,
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
    // 'no-undef': 'off',
    // 禁止 function 出现重名参数
    // "no-dupe-args": "warring",
    semi: [1],
    camelcase: 0,
    // 屏蔽文件名必须为驼峰
    "vue/multi-word-component-names": 0,
    // 允许ts的any
    "@typescript-eslint/no-explicit-any": [0],
    // 允许出现未使用的变量
    "no-unused-vars": 0,
    // "@typescript-eslint/no-explicit-any": "off",
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "@typescript-eslint/ban-types": "off",
    // "@typescript-eslint/no-unused-vars": "off",
    // "vue/html-indent": [
    //   "error",
    //   4,
    //   {
    //     attribute: 1,
    //     baseIndent: 1,
    //     closeBracket: 0,
    //     alignAttributesVertically: true,
    //     ignores: [],
    //   },
    // ],
    // "vue/max-attributes-per-line": ["off"],
    // // 强制使用驼峰命名
    // "vue/component-name-in-template-casing": [
    //   "error",
    //   "PascalCase",
    //   {
    //     registeredComponentsOnly: false,
    //     ignores: [],
    //   },
    // ],
  },
};
