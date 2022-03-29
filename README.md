# vite-plugin-compare

Markdown for Vite


- A syntactic sugar
  - `1 < 2 < 3` to `1 < 2 $$ 2 < 3`
  - `a === 1 || 2 ` to `a === 1 || a ===2`


Install

```bash
npm i vite-plugin-md -D # yarn add vite-plugin-md -D
```


then add the following to `vite.config.js`

```ts
import Vue from '@vitejs/plugin-vue'
import compare from 'vite-plugin-compare'

export default {
  plugins: [
    Vue(),
    compare(),
  ],
}
```