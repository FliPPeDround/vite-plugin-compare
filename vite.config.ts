/// <reference types="vitest" />
import { defineConfig } from 'vite'
import compare from './dist/vite-plugin-compare.js'


export default defineConfig({
  test: {
    dir: 'test'
  },
  plugins: [
    compare()
  ],
})
