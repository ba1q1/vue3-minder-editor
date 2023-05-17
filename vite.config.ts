import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import replace from '@rollup/plugin-replace';

export default defineConfig({
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

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],
    }),

    Icons({
      autoInstall: true,
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
      external: ['vue', /^element-plus/],
    },
  },
});
