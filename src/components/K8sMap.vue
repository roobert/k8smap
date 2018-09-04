<template>
  <div id="k8s-map">
    <section v-if="errored">
      <p>failure fetching data from kubernetes API</p>
      {{ contextPath }}
    </section>
    <section v-else>
      <div v-if="loading">Loading..</div>
      <div v-else>
        <div class="container-fluid">
          <div class="row header">
            <div class="col-sm context">
              <b-dropdown v-bind:text="currentContext" >
                <k8s-map-context-drop-down
                  v-for="context in contexts"
                  v-bind:key="context.index"
                  v-bind:context="context"
                  v-bind:currentContext="contextPath"
                >
                </k8s-map-context-drop-down>
              </b-dropdown>
            </div>


            <div class="col-sm logo">
              <a href="/">
                <img src="../assets/logo.png" width="40px">
              </a>
            </div>
          </div>
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
import { contexts as k8sContexts } from '../../conf/config'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import K8sMapNode from './K8sMapNode.vue'
import K8sMapContextDropDown from './K8sMapContextDropDown.vue'

export default {
  name: 'k8s-map',
  props: [
    'project',
    'region',
    'zone',
    'cluster'
  ],
  components: {
    'k8s-map-node': K8sMapNode,
    'k8s-map-context-drop-down': K8sMapContextDropDown
  },
  data () {
    return {
      contexts: k8sContexts,
      errored: false,
      loading: true,
      namespaces: null,
      nodes: null,
      pods: null,
      services: null
    }
  },
 /* created () {
    console.log(this.$route);
  },
  methods: {
  },
  */
  computed: {
    contextPath: function() {
      return this.project + '/' + this.region + '/' + this.zone + '/' + this.cluster
    }
  },
  watch: {
    '$route'() {
      // FIXME: does this watcher update props on route change, or do we need to manually update the properties?
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
