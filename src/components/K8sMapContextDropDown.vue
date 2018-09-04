<template>
  <div>
  <k8s-map-context-drop-down-item
    v-for="cluster in context.clusters"
    v-bind:key="cluster.cluster"
    v-bind:cluster="cluster">
    {{ cotextPathPretty(context.project, cluster.region, cluster.zone, cluster.cluster) }}
  </k8s-map-context-drop-down-item>
  </div>
</template>

<script>
export default {
  name: 'k8s-map-context-drop-down',
  props: ['context']
  //components: {
  //  'k8s-map-context-drop-down-item': K8sMapContextDropDownItem
  //},
}
</script>

<style>
#context-select {
  margin: 0 !important;
}
</style>
