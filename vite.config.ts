import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import compare from './dist/vite-plugin-compare.es.js'
import compare from './package/vite-plugin-compare'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), compare()],
  build: {
    target: 'esnext',
    minify: 'terser',
    lib: {
      entry: 'package/vite-plugin-compare.ts',
      formats: ['es', 'cjs'],
      name: 'vite-plugin-compare'
    }
  }
})
