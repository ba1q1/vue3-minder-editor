import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from 'rollup-plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'vue3-minder-editor',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `vue3-minder-editor.${format}.js`,
    },
    rollupOptions: {
      plugins: [vue()],
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
