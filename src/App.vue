<template>
  <div id="app">
    <K8sMap />
  </div>
</template>

<script>
import K8sMap from './components/K8sMap.vue'

export default {
  name: 'app',
  components: {
    K8sMap
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
