<template>
  <div>
    <div v-show="displayService(service)"
      class="service col-sm border"

      v-for="service in services.data.items"
      v-bind:key="service.uid"
      v-bind:service="service"
      @click.capture="$store.commit('panelText', service)"
    >
      <div class="title">{{ service.metadata.name }}</div>
      <div><pre class="metadata">{{ service }}</pre></div>

    <!--
      <div
        class="states"
        v-for="state in service.status.conditions"
        v-bind:key="state.type"
        v-bind:state="state"
        @click.capture="$store.commit('panelText', state)"
      >
        <div
          :class="[stateGood(state) ? 'Success' : '']"
          class="status"
        >
        </div>
      </div>
      <div>
        {{ service.metadata.name }}
      </div>
      <div
        class="image"
        v-show="display.images"
        v-for="container in service.spec.template.spec.containers"
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

        <pre class="metadata">{{ service }}</pre>
      </div>
      -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'k8s-map-services',
  props: [
    'services',
    'display'
  ],
  methods: {
    displayService(service) {
      // FIXME conditional should be - if contains Available, or if contains non-Available
      if (this.display.services && this.display.namespaces[service.metadata.namespace]) {
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
.service {
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

.service:hover {
  border: 1px solid black ! important;
}

.image:hover {
  border: 1px solid black ! important;
}

.image {
  border: 1px solid lightgrey ! important;
}
</style>
