<template>
  <div id="k8s-map">
    <div class="container-fluid">
      <!-- FIXME - only available in `input` (or similar) context? -->
      <div v-on:keydown.esc="$store.commit('panelClose')"></div>
      <vue-slideout-panel
        id="panel"
        v-bind:value="$store.getters.panel.display"
        v-bind:widths="['80%']"
        v-on:close="$store.commit('panelClose')"
      >
      <!-- FIXME: update plugin to allow dynamically changing of tree depth -->
      <!-- button class='btn btn-sm' @click="$store.commit('panelTreeDepth', 99)">Expand Tree</button -->
        <vue-json-tree :data="$store.getters.panel.text" :level="$store.getters.panel.treeDepth">
        </vue-json-tree>
      </vue-slideout-panel>
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
            <pre>{{ error.response.data }}</pre>
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
        <div class="filters row">
          <div class="col">
            <b-button-group size="sm" class="button-group">
              <b-button v-on:click="display.success = false; display.danger = false">-</b-button>
              <b-button v-on:click="display.success = true; display.danger = true">+</b-button>
            </b-button-group>
            <b-button size="sm" variant="success" :pressed="!display.success" class="ok" v-on:click="toggleDisplay('success')">ok</b-button>
            <b-button size="sm" variant="danger" :pressed="!display.danger" class="failure" v-on:click="toggleDisplay('danger')">failure</b-button>
          </div>
          <div class="col-2 title">
            resource state
          </div>
        </div>
        <div class="filters row">
          <div class="namespaces col">
            <b-button-group size="sm" class="button-group">
              <b-button v-on:click="allNamespaces(false)">-</b-button>
              <b-button v-on:click="allNamespaces(true)">+</b-button>
            </b-button-group>
            <b-button
              size="sm"
              variant="primary"
              v-for="namespace in namespaces.data.items"
              v-bind:key="namespace.metadata.name"
              v-bind:namespace="namespace"
              v-on:click="toggleDisplayNamespace(namespace.metadata.name)"
              :pressed="!display.namespaces[namespace.metadata.name]"
            >
              {{ namespace.metadata.name }}
            </b-button>
          </div>
          <div class="col-2 title">
            namespaces
          </div>
        </div>
        <div class="filters row">
          <div class="col">
            <b-button-group size="sm" class="button-group">
              <b-button v-on:click="display.ingresses = false">-</b-button>
              <b-button v-on:click="display.ingresses = true">+</b-button>
            </b-button-group>
            <b-button size="sm" variant="primary" :pressed="!display.ingresses"   v-on:click="toggleDisplay('ingresses')">ingresses</b-button>
          </div>
          <div class="col-2 title">
            resource filters
          </div>
        </div>
        <div class="filters row">
          <div class="col">
            <b-button-group size="sm" class="button-group">
              <b-button v-on:click="display.services = false">-</b-button>
              <b-button v-on:click="display.services = true">+</b-button>
            </b-button-group>
            <b-button size="sm" variant="primary" :pressed="!display.services"    v-on:click="toggleDisplay('services')">services</b-button>
          </div>
          <div class="col-2 title">
          </div>
        </div>
        <div class="filters row">
          <div class="col">
            <b-button-group size="sm" class="button-group">
              <b-button v-on:click="display.deployments = false; display.images = false">-</b-button>
              <b-button v-on:click="display.deployments = true; display.images = true">+</b-button>
            </b-button-group>
            <b-button size="sm" variant="primary" :pressed="!display.deployments" v-on:click="toggleDisplay('deployments')">deployments</b-button>
            <b-button size="sm" variant="primary" :pressed="!display.images" v-on:click="toggleDisplay('images')">images</b-button>
          </div>
          <div class="col-2 title">
          </div>
        </div>
        <div class="filters row">
          <div class="col">
            <b-button-group size="sm" class="button-group">
              <b-button v-on:click="display.nodes = false; display.pods = false; display.containers = false">-</b-button>
              <b-button v-on:click="display.nodes = true; display.pods = true; display.containers = true">+</b-button>
            </b-button-group>
            <b-button size="sm" variant="primary" :pressed="!display.nodes"       v-on:click="toggleDisplay('nodes')">nodes</b-button>
            <b-button size="sm" variant="primary" :pressed="!display.pods"        v-on:click="toggleDisplay('pods')">pods</b-button>
            <b-button size="sm" variant="primary" :pressed="!display.containers"  v-on:click="toggleDisplay('containers')">containers</b-button>
          </div>
          <div class="col-2 title">
          </div>
        </div>
        <div class="row">
          <div class="col">
            <k8s-map-ingresses
              v-bind:ingresses="ingresses"
              v-bind:display="display"
            >
            </k8s-map-ingresses>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <k8s-map-services
              v-bind:services="services"
              v-bind:display="display"
            >
            </k8s-map-services>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <k8s-map-deployments
              v-bind:deployments="deployments"
              v-bind:display="display"
            >
            </k8s-map-deployments>
          </div>
        </div>
        <div class="row">
          <k8s-map-node
            v-for="node in nodes.data.items"
            v-bind:key="node.uid"
            v-bind:node="node"
            v-bind:pods="pods"
            v-bind:display="display"
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

import VueJsonTree from 'vue-json-tree'
import VueSlideoutPanel from 'vue-slideout-panel'

import K8sMapIngresses from './K8sMapIngresses.vue'
import K8sMapServices from './K8sMapServices.vue'
import K8sMapDeployments from './K8sMapDeployments.vue'
import K8sMapNode from './K8sMapNode.vue'
import K8sMapContextDropDown from './K8sMapContextDropDown.vue'
import K8sMapContextDropDownItem from './K8sMapContextDropDownItem.vue'

export default {
  name: 'k8s-map',
  props: [
    'project',
    'region',
    'zone',
    'cluster'
  ],
  components: {
    'vue-json-tree': VueJsonTree,
    'vue-slideout-panel': VueSlideoutPanel,
    'k8s-map-ingresses': K8sMapIngresses,
    'k8s-map-services': K8sMapServices,
    'k8s-map-deployments': K8sMapDeployments,
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
    toggleDisplay(type) {
      this.display[type] = !this.display[type]
    },
    toggleDisplayNamespace: function(namespace) {
      this.display.namespaces[namespace] = !this.display.namespaces[namespace]
    },
    allNamespaces (display) {
      for (var namespace in this.display.namespaces) {
        this.display.namespaces[namespace] = display
      }
    }
  },
  data () {
    return {
      contexts: [],
      errored: false,
      error: null,
      loading: true,
      namespaces: null,
      nodes: null,
      pods: null,
      services: null,
      ingresses: null,
      deployments: null,
      display: {
        success: true,
        danger: true,
        ingresses: true,
        services: true,
        deployments: true,
        images: true,
        nodes: true,
        pods: true,
        containers: true,
        namespaces: {}
      }
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
    },
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
      axios.get('/config.vue.json'),
      axios.get('/k8s/' + this.contextPathCurrent + '/apis/apps/v1/deployments '),
      axios.get('/k8s/' + this.contextPathCurrent + '/api/v1/namespaces'),
      axios.get('/k8s/' + this.contextPathCurrent + '/apis/extensions/v1beta1/ingresses'),
      axios.get('/k8s/' + this.contextPathCurrent + '/api/v1/nodes'),
      axios.get('/k8s/' + this.contextPathCurrent + '/api/v1/pods'),
      axios.get('/k8s/' + this.contextPathCurrent + '/api/v1/services'),
    ])
    .then(axios.spread(
      (
        configResponse,
        deploymentsResponse,
        namespacesResponse,
        ingressesResponse,
        nodesResponse,
        podsResponse,
        servicesResponse
      ) => {
        this.contexts = configResponse.data.contexts,
        this.deployments = deploymentsResponse,
        this.ingresses = ingressesResponse,
        this.nodes = nodesResponse,
        this.pods = podsResponse,
        this.services = servicesResponse,
        this.namespaces = namespacesResponse

        for (let namespace of namespacesResponse.data.items) {
          if (!this.display.namespaces.hasOwnProperty(namespace.metadata.name)) {
            this.$set(this.display.namespaces, namespace.metadata.name, true)
          }
        }
      }
    ))
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error)
      this.errored = true, this.error = error
    })
    .finally(
        () => this.loading = false
      )
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

.filters {
  background: #eee;
  padding-top: 10px;
  padding-bottom: 10px;
}

.filters button {
  margin-left: 10px;
  margin-top: 10px;
}

.button-group button {
  margin-right: 0px ! important;
}

.filters .title {
  text-align: right;
}
</style>
