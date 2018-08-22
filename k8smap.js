/*

   TODO

     * foldable 'details' pane
     * new window 'details' pane
     * colour scheme
     * layout
     * dockerize
     * detect project / cluster
     * multiple node pools?
     * nodes and pod names - strip/hide uids
     * related pods - colour code a dot (based on metadata?)
     * display
       * services
         * load balancers
     * clicking on stuff takes you to k8s ui / logs, etc?


*/
Vue.component('k8smap-node', {
    props: ['node', 'pods'],
    template: `
      <div class="node col-sm border">
        <div class="head">
          <div class="gke-nodepool">{{ node.metadata.labels['cloud.google.com/gke-nodepool'] }}</div>
          <div class="zone">{{ node.metadata.labels['failure-domain.beta.kubernetes.io/zone'] }}</div>
          <div class="hostname">{{ node.metadata.name }}</div>
        </div>

        <k8smap-pod
          v-for="pod in pods.data.items"
          v-bind:key="pod.uid"
          v-bind:pod="pod"
        >
        </k8smap-pod>
      </div>
    `
})

Vue.component('k8smap-pod', {
    props: ['pod'],
    template: `
      <div class="pod border">
        <div class="title">{{ pod.metadata.name }}</div>
        <k8smap-container
          v-for="container in pod.spec.containers"
          v-bind:key="container.name"
          v-bind:container="container"
        >
        </k8smap-container>
      </div>
    `
})

Vue.component('k8smap-container', {
  props: ['container'],
  template: `
    <div class="container border">
      <div class="title">{{ container.name }}</div>
    </div>
  `
})

var vm = new Vue({
  el: '#k8smap',
  data () {
    return {
      errored: false,
      loading: true,
      namespaces: null,
      nodes: null,
      pods: null,
      services: null
    }
  },
  mounted () {
    axios.all([
      axios.get('/k8s/bw-test0/europe-west1/b/cluster0/api/v1/namespaces'),
      axios.get('/k8s/bw-test0/europe-west1/b/cluster0/api/v1/nodes'),
      axios.get('/k8s/bw-test0/europe-west1/b/cluster0/api/v1/pods'),
      axios.get('/k8s/bw-test0/europe-west1/b/cluster0/api/v1/services')
    ])
    .then(axios.spread((namespacesResponse, nodesResponse, podsResponse, servicesResponse) => {
      this.namespaces = namespacesResponse,
      this.nodes = nodesResponse,
      this.pods = podsResponse,
      this.services = servicesResponse
    }))
    .catch(error => {
      console.log(error)
      this.errored = true
    })
    .finally(() => this.loading = false)
    }
})
