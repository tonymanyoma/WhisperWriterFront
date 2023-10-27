<template>
  <div id="app">
    <recordAudio/>
  </div>
</template>

<script>

import recordAudio from './whisper/components/recordAudio.vue'
export default {
  name: 'App',
  components: {
    recordAudio
  },

  methods: {
      callback (data) {
        console.debug(data)
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
