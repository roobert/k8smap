<template>
  <div class="node col-sm border">
    <div class="head">
      <div class="gke-nodepool">{{ node.metadata.labels['cloud.google.com/gke-nodepool'] }}</div>
      <div class="zone">{{ node.metadata.labels['failure-domain.beta.kubernetes.io/zone'] }}</div>
      <div class="hostname">{{ node.metadata.name }}</div>
    </div>

    <k8s-map-pod
      v-for="pod in pods.data.items"
      v-bind:key="pod.uid"
      v-bind:pod="pod"
    >
    </k8s-map-pod>
  </div>
</template>

<script>
import K8sMapPod from './K8sMapPod.vue'

export default {
  name: 'k8s-map-node',
  props: ['node', 'pods'],
  components: {
    K8sMapPod
  }
}
</script>
