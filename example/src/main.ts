import { createApp } from 'vue'
import App from './App.vue'

//@ts-ignore
if (1 < 3 < 3) {
  console.log(1);
}

const a = 3
//@ts-ignore
if (a === 1||3||2){
  console.log(1);
}

const b = a == 1 ? 'qq': 'ww'

createApp(App).mount('#app')
