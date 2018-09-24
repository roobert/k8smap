<template>
  <div>
    <div v-show="displayIngress(ingress)"
      class="ingress row border"

      v-for="ingress in ingresses.data.items"
      v-bind:key="ingress.metadata.uid"
      v-bind:ingress="ingress"
      @click.capture="$store.commit('panelText', ingress)"
    >
      <div class="col">
        <div class="title">{{ ingress.metadata.name }}</div>
        <div class="metadata"><pre>{{ ingress }}</pre></div>
      </div>

      <div class="col-2 addresses">
        <div
          v-for="address in ingress.status.loadBalancer.ingress"
          v-bind:key="address.ip"
          v-bind:address="address"
        >
          <code>{{ address.ip }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'k8s-map-ingresses',
  props: [
    'ingresses',
    'display'
  ],
  methods: {
    displayIngress(ingress) {
      // FIXME conditional should be - if contains Available, or if contains non-Available
      if (
        (this.display.ingresses && this.display.namespaces[ingress.metadata.namespace])
      ) {
        return true
      }

      return false
    },
    stateGood(state) {
      if (
           (state.type == 'Available' && state.status == 'True') ||
           (state.type == 'Progressing' && state.reason == 'NewReplicaSetAvailable' && state.status == 'True')
      ) {
         return true
      }
      return false
    }
  },
  filters: {
    name (string) {
      return string.split(":")[0]
    },
    version (string) {
      return string.split(":")[1]
    }
  }
}
</script>

<style>
.ingress {
  padding: 10px 0px;
  margin-top: 10px;
  margin-left: 0px;
  margin-right: 0px;
  background: #e6f2ff;
}

.addresses {
  text-align: right ! important;
}

.image {
  background: white;
  margin: 10px;
  padding: 5px 10px;
}

.version {
  text-align: right;
}

.status {
  height: 10px;
  width: 10px;
  background: #990000;
  float: left;
  display: block;
  margin-right: 10px;
  margin-top: 5px;
}

.status:hover {
  border: 1px solid black ! important;
}

.Success {
  height: 10px;
  width: 10px;
  background: #009900 ! important;
}

.version {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis ! important;
}

.ingress:hover {
  border: 1px solid black ! important;
}

.image:hover {
  border: 1px solid black ! important;
}

.image {
  border: 1px solid lightgrey ! important;
}

</style>
