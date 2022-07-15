/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [],
  //移除生产环境下没有使用到的样式声明
  purge: {
    enable: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
   }
  
};
