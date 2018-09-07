<template>
  <div id="k8s-map">
    <div class="container-fluid">
      <div class="row header">
        <div class="col-sm context">
          <b-dropdown
            id="context-picker-drop-down"
            v-bind:text="contextPathPretty(project, region, zone, cluster)"
            class="m-md-2"
          >
            <b-dropdown-item
              v-for="dropdownItem in dropdownItems"
              v-bind:key="dropdownItem.link"
              v-bind:dropdownItem="dropdownItem"
              v-bind:href="dropdownItem.link"
            >
              {{ dropdownItem.pretty }}
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="col-sm logo">
          <b-link href="/">
            <img :src="require('../assets/logo.png')" width="40px">
          </b-link>
        </div>
      </div>
    <section v-if="errored">
      <div class="row header">
        <div class="col-sm context">
          <b-alert show variant="danger">
            <p>Failed to fetch data form Kubernetes API - {{ error.response.status }}</p>
            <pre>{{ error.response.data | pp }}</pre>
          </b-alert>
        </div>
      </div>
    </section>
    <section v-else>
      <section v-if="loading">
        <div class="row">
          <div class="col-sm context">
            <b-alert show variant="primary">Loading..</b-alert>
          </div>
        </div>
      </section>
      <section v-else>
        <div class="row">
          <k8s-map-node
            v-for="node in nodes.data.items"
            v-bind:key="node.uid"
            v-bind:node="node"
            v-bind:pods="pods"
          >
          </k8s-map-node>
        </div>
      </section>
    </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import K8sMapNode from './K8sMapNode.vue'
import K8sMapContextDropDown from './K8sMapContextDropDown.vue'
import K8sMapContextDropDownItem from './K8sMapContextDropDownItem.vue'

import config from '../../conf/config.mjs'

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
    'k8s-map-context-drop-down': K8sMapContextDropDown,
    'k8s-map-context-drop-down-item': K8sMapContextDropDownItem
  },
  methods: {
    contextPathPretty(project, region, zone, cluster) {
      return [project, region, zone, cluster].join(' / ')
    },
    contextPathLink(project, region, zone, cluster) {
      return ['/context', project, region, zone, cluster].join('/')
    },
    contextPath(project, region, zone, cluster) {
      return [project, region, zone, cluster].join('/')
    },
  },
  data () {
    return {
      contexts: config.contexts,
      errored: false,
      error: null,
      loading: true,
      namespaces: null,
      nodes: null,
      pods: null,
      services: null
    }
  },
  computed: {
    contextPathPrettyCurrent () {
      return this.contextPathPretty(this.project, this.region, this.zone, this.cluster)
    },
    contextPathCurrent () {
      return this.contextPath(this.project, this.region, this.zone, this.cluster)
    },
    context () {
      return {
        project: this.project,
        region: this.region,
        zone: this.zone,
        cluster: this.cluster
      }
    },
    dropdownItems () {
      var collection = [];

      for (let context of this.contexts) {
        if (JSON.stringify(this.context) !== JSON.stringify(context)) {
          collection.push(
            {
              pretty: this.contextPathPretty(
                context.project,
                context.region,
                context.zone,
                context.cluster
              ),
              link: this.contextPathLink(
                context.project,
                context.region,
                context.zone,
                context.cluster
              )
            }
          )
        }
      }
      return collection
    }
  },
  watch: {
    '$route'() {
      //  from.params.project = to.params.project
      //  from.params.region = to.params.region
      //  from.params.zone = to.params.zone
      //  from.params.cluster = to.params.cluster
    }
  },
  filters: {
      pp: function(value) {
      return JSON.stringify(value, null, 2);
    }
  },
  mounted () {
    axios.all([
      axios.get('/k8s/' + this.contextPathCurrent + '/api/v1/namespaces'),
      axios.get('/k8s/' + this.contextPathCurrent + '/api/v1/nodes'),
      axios.get('/k8s/' + this.contextPathCurrent + '/api/v1/pods'),
      axios.get('/k8s/' + this.contextPathCurrent + '/api/v1/services'),
    ])
    .then(axios.spread((namespacesResponse, nodesResponse, podsResponse, servicesResponse) => {
      this.namespaces = namespacesResponse,
      this.nodes = nodesResponse,
      this.pods = podsResponse,
      this.services = servicesResponse
    }))
    .catch((error) => { this.errored = true, this.error = error })
    .finally(() => this.loading = false)
    }
}
</script>

<style>
.container-fluid {
  background-color: #ffffff;
}

.header {
  padding-top: 50px;

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
