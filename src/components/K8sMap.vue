<template>
  <div id="k8s-map">
    <section v-if="errored">
      <p>failure fetching data from kubernetes API</p>
    </section>
    <section v-else>
      <div v-if="loading">Loading..</div>
      <div v-else>
        <div class="container-fluid">
          <div class="row header">
            <div class="col-sm context">
              <!-- FIXME: add tokens to nginx config for each project -->
              <!-- FIXME: load list of projects from file or something? -->
              <!-- FIXME: loop through list if not match current contextPath.. -->
              <!-- FIXME: selecting a new context should change url, so these should be href.. -->
              <b-dropdown id="context-select" v-bind:text="contextPath" class="m-md-2">
                <b-dropdown-item>...</b-dropdown-item>
              </b-dropdown>
            </div>

            <k8s-context-drop-down v-bind:context="context"></k8s-context-drop-down-item>

            <div class="col-sm logo">
              <img src="../assets/logo.png" width="40px">
            </div>
          </div>
          <!-- one row per cluster? -->
          <div class="row">
            <k8s-map-node
              v-for="node in nodes.data.items"
              v-bind:key="node.uid"
              v-bind:node="node"
              v-bind:pods="pods"
            >
            </k8s-map-node>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import K8sMapNode from './K8sMapNode.vue'

export default {
  name: 'k8s-map',
  components: {
    'k8s-map-node': K8sMapNode
  },
  data () {
    return {
      // FIXME - url should define initial project, otherwise show panel to select project
      project: 'bw-test0',
      region: 'europe-west1',
      zone: 'b',
      cluster: 'cluster0',
      errored: false,
      loading: true,
      namespaces: null,
      nodes: null,
      pods: null,
      services: null
    }
  },
  computed: {
    contextPath: function() {
      return this.project + '/' + this.region + '/' + this.zone + '/' + this.cluster
    }
  },
  mounted () {
    axios.all([
      axios.get('/k8s/' + this.contextPath + '/api/v1/namespaces'),
      axios.get('/k8s/' + this.contextPath + '/api/v1/nodes'),
      axios.get('/k8s/' + this.contextPath + '/api/v1/pods'),
      axios.get('/k8s/' + this.contextPath + '/api/v1/services'),
    ])
    .then(axios.spread((namespacesResponse, nodesResponse, podsResponse, servicesResponse) => {
      this.namespaces = namespacesResponse,
      this.nodes = nodesResponse,
      this.pods = podsResponse,
      this.services = servicesResponse
    }))
    .catch(() => { this.errored = true })
    .finally(() => this.loading = false)
    }
}
</script>

<style>
.container-fluid {
  background-color: #ffffff;
}

.header {
  padding-top: 10px;

}

.header .logo {
  text-align: right;
}

.header .context {
  text-align: left;
}

.node {
  background-color: #e6f2ff;
  margin: 10px;
  padding: 10px;
}

.node.head {
  font-weight: bold;
}

.pod {
  color: #0080ff;
  background-color: #b3d9ff;
  margin: 10px;
  padding: 10px;
}

.container {
  background-color: white;
  color: #333333;
  margin-top: 10px;
}
</style>
