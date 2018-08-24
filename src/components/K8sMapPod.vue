<template>
  <div class="pod border">
    <div class="title">{{ pod.metadata.name }}</div>
    <k8s-map-container
      v-for="container in pod.spec.containers"
      v-bind:key="container.name"
      v-bind:container="container"
    >
    </k8s-map-container>
  </div>
</template>

<script>
import K8sMapContainer from './K8sMapContainer.vue'

export default {
  name: 'k8s-map-pod',
  props: ['pod'],
  components: {
    K8sMapContainer
  }
}
</script>
