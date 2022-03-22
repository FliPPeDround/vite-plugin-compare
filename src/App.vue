<script setup>
import {ref} from 'vue'
import jsthen from './utiles/index'

const foo = ref('')
const bar = ref('')
const a = 100
const b = ref(5)
if (6 > b.value > 4 > 1) {
  bar.value = '6 > b > 4'
} else {
  bar.value = 'bar 判断出错' 
} 
if (1 < a < b.value) {
  foo.value = '1 < a < 3'
} else {
  foo.value = 'foo 判断出错' 
}

console.log(jsthen());

const changeB = () => {
  console.log(123)
  b.value = 10
}
</script>

<template>
  <button @click="changeB" v-if="1 < b < 10 <= 10 ? true : false">click me</button>
  <p>{{foo}}</p>
  <p>{{bar}}</p>
</template>

<style>

</style>
