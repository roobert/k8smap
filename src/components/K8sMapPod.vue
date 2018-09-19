<template>
  <div
    v-show="displayPod()"
    class="pod border"
    @click.capture="$store.commit('panelText', pod)"
  >
    <div v-bind:class="pod.status.phase" class="status"></div>
    <div class="title">{{ pod.metadata.name }}</div>
    <pre class="metadata">{{ pod }}</pre>
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
  },
  methods: {
    displayPod() {
      if ((this.display.pods && this.display.namespaces[this.pod.metadata.namespace]) && ( 
          (this.pod.status.phase == 'Running' && this.display.success == true) || 
            (this.pod.status.phase != 'Running' && this.display.danger == true))
        ) {
        return true
      }

      return false
    }
  }
}
</script>

<style>
/* .metadata { display: block ! important; } */
.status {
  height: 10px;
  width: 10px;
  background: #990000;
  float: left;
  display: block;
  margin-right: 10px;
  margin-top: 5px;
}

.Running {
  height: 10px;
  width: 10px;
  background: #009900;
}

.pod:hover {
  border: 1px solid black ! important;
}
</style>
