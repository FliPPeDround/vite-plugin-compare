import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pluginThen from './plugins/vite-plugins-then.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), pluginThen()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
