import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  exclude: ['node_modules', '.git', '.husky', '.vscode', 'dist', 'public', 'build', 'mock', './stats.html'],
  presets: [presetUno({ dark: 'class' })],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
  },
  theme: {
  }
});
