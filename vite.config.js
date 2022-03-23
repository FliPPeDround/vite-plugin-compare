import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compare from './plugins/vite-plugin-compare.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), compare()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
