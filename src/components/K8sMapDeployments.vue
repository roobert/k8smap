<template>
  <div>
    <div v-show="displayDeployment(deployment)"
      class="deployment col-sm border"

      v-for="deployment in deployments.data.items"
      v-bind:key="deployment.uid"
      v-bind:deployment="deployment"
      @click.capture="$store.commit('panelText', deployment)"
    >

      <div
        class="states"
        v-for="state in deployment.status.conditions"
        v-bind:key="state.type"
        v-bind:state="state"
        @click.capture="$store.commit('panelText', state)"
      >
        <div
          :class="state.type"
          class="status"
        >
        </div>
      </div>
      <div>
        {{ deployment.metadata.name }}
      </div>
      <div
        class="image"
        v-show="display.images"
        v-for="container in deployment.spec.template.spec.containers"
        v-bind:key="container.name"
        v-bind:container="container"
        @click.capture="$store.commit('panelText', container)"
      >
        <div class="row">
          <div class="name col">
            {{ container.image | name }}
          </div>
          <div class="version col-3">
            {{ container.image | version }}
          </div>
        </div>

        <pre class="metadata">{{ deployment }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'k8s-map-deployments',
  props: [
    'deployments',
    'display'
  ],
  methods: {
    displayDeployment(deployment) {
      // FIXME conditional should be - if contains Available, or if contains non-Available
      if (
        (this.display.deployments && this.display.namespaces[deployment.metadata.namespace]) &&
          ( 
            // if more than one statuses then 
            (deployment.status.conditions.some( e => { return e.type === 'Available' }) && this.display.success == true) ||
            (deployment.status.conditions.some( e => { return e.type !== 'Available' }) && this.display.danger == true)
          )
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
.deployment {
  padding: 10px;
  margin-top: 10px;
  background: #e6f2ff;
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

.Available {
  height: 10px;
  width: 10px;
  background: #009900 ! important;
}

.version {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis ! important;
}

.deployment:hover {
  border: 1px solid black ! important;
}

.image:hover {
  border: 1px solid black ! important;
}

.image {
  border: 1px solid lightgrey ! important;
}
</style>
