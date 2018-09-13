<template>
  <div v-show="(display.pods && display.namespaces[pod.metadata.namespace])" class="pod border">
    <div class="title">{{ pod.metadata.name }}</div>
    <k8s-map-container
      v-for="container in pod.spec.containers"
      v-bind:key="container.name"
      v-bind:container="container"
      v-bind:display="display"
    >
    </k8s-map-container>
  </div>
</template>

<script>
import K8sMapContainer from './K8sMapContainer.vue'

export default {
  name: 'k8s-map-pod',
  props: [
    'pod',
    'display'
  ],
  components: {
    K8sMapContainer
  }
}
</script>
