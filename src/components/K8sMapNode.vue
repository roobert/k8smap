<template>
  <div v-show="display.nodes" class="node col-sm border">
    <div class="head">
      <div class="gke-nodepool">
        <a @click="$emit('updatePanel', node)" href="#">
        {{ node.metadata.labels['cloud.google.com/gke-nodepool'] }}
        </a>
      </div>
      <div class="zone">{{ node.metadata.labels['failure-domain.beta.kubernetes.io/zone'] }}</div>
      <div class="hostname">{{ node.metadata.name }}</div>
      <div class="metadata"><pre>{{ node }}</pre></div>
    </div>

    <k8s-map-pod
      v-for="pod in nodePods"
      v-bind:key="pod.uid"
      v-bind:pod="pod"
      v-bind:display="display"
    >
    </k8s-map-pod>
  </div>
</template>

<script>
import K8sMapPod from './K8sMapPod.vue'

export default {
  name: 'k8s-map-node',
  props: [
    'node',
    'pods',
    'display'
  ],
  components: {
    K8sMapPod
  },
  computed: {
    nodePods () {
      return this.pods.data.items.filter(pod => pod.spec.nodeName === this.node.metadata.name)
    }
  }
}
</script>

<style>
.node {
  max-width: auto;
  overflow: scroll;
}

.metadata {
  display: none;
}
</style>
