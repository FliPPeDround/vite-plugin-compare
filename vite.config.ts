/// <reference types="vitest" />
import { defineConfig } from 'vite'
import compare from './src'


export default defineConfig({
  test: {
    dir: 'test'
  },
  plugins: [
    compare()
  ],
})
