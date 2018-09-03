<template>
  <b-dropdown-item v-bind:href="projectPathLink(context.project, cluster.region, cluster.zone, cluster.cluster)" v-bind:text="projectPathPretty(context.project, cluster.region, cluster.zone, cluster.cluster)">
  </b-dropdown-item>
</template>

<script>
export default {
  name: 'k8s-map-context-drop-down',
  props: ['context'],
  methods: {
    projectPathPretty(project, region, zone, cluster) {
      return [project, region, zone, cluster].join(' / ')
    },
    projectPathLink(project, region, zone, cluster) {
      return ['/context', project, region, zone, cluster].join('/')
    }
  }
}
</script>

<style>
#context-select {
  margin: 0 !important;
}
</style>
