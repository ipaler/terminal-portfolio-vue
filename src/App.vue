<template>
  <div class="app-container">
    <Terminal />
  </div>
</template>

<script>
import Terminal from './components/Terminal.vue'

export default {
  name: 'App',
  components: {
    Terminal
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Code', monospace;
}

body {
  background-color: #282a36;
}

.app-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #282a36;
}
</style>