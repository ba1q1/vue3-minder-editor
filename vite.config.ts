import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { vitePluginForArco } from '@arco-plugins/vite-vue';

import replace from '@rollup/plugin-replace';
import { visualizer } from 'rollup-plugin-visualizer';

export default () =>
  defineConfig({
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [
      vue(),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],
      }),
      vitePluginForArco({}),
      Components({
        resolvers: [ArcoResolver()],
      }),

      replace({
        preventAssignment: true,
        // 将__VUE_I18N_FULL_INSTALL__替换为true
        __VUE_I18N_FULL_INSTALL__: true,
        // 将__VUE_I18N_LEGACY_API__替换为false
        __VUE_I18N_LEGACY_API__: false,
        // 将__VUE_I18N_PROD_DEVTOOLS__替换为false
        __VUE_I18N_PROD_DEVTOOLS__: false,
      }),
      // 这里通过--mode analyze配置为分析模式，使用visualizer插件分析方法，输出report.html分析报告
      process.env.NODE_ENV === 'analyze' ? visualizer({ open: true, brotliSize: true, filename: 'report.html' }) : null,
    ],
    optimizeDeps: {
      include: ['vue', '@vueuse/core'],
    },
    build: {
      lib: {
        entry: 'src/main.ts',
        name: 'vue3-minder-editor',
        formats: ['es', 'umd', 'cjs'],
        fileName: (format) => `vue3-minder-editor.${format}.js`,
      },
      rollupOptions: {
        external: ['vue', /@arco-design/],
      },
    },
  });
