<template>
  <div
    v-show="display.containers"
    class="container border"
    @click.capture="$store.commit('panelText', container)"
  >
    <div
      v-for="status in containerStatuses(container.name)"
      v-bind:key="status.name"
      v-bind:status="status"
      @click.capture="$store.commit('panelText', status)"
      class="status border"
      :class="[status.ready ? 'success' : 'failure']"
    >
    </div>
    <div class="title">{{ container.name }}</div>
    <div class="metadata"><pre>{{ container }}</pre></div>
  </div>
</template>

<script>
export default {
  name: 'k8s-map-container',
  props: [
    'container',
    'display',
    'statuses'
  ],
  methods: {
    containerStatuses (containerName) {
      return this.statuses.filter(status => status.name === containerName)
    }
  }
}
</script>

<style>
.container:hover {
  border: 1px solid black ! important;
}

.container {
  padding-top: 3px ! important;
}

.success {
  background-color: green ! important;
}
</style>
