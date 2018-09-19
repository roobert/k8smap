<template>
  <div
    v-show="display.containers"
    class="container border"
    @click="$store.commit('panelText', container)"
  >
    <div class="title">{{ container.name }}</div>
    <div class="metadata"><pre>{{ container }}</pre></div>
  </div>
</template>

<script>
export default {
  name: 'k8s-map-container',
  props: [
    'container',
    'display'
  ]
}
</script>

<style scoped>
.metadata {
}
</style>
