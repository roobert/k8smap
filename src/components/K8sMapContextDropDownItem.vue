<template>
  <div class="dropdown-item">
    {{ cotextPathPretty(context.project, cluster.region, cluster.zone, cluster.cluster) }}
  </div>

  <!--div>
    <div class="dropdown-item"
      v-for="cluster in context.clusters"
      v-bind:key="cluster.cluster"
      v-bind:cluster="cluster">
      test
      {{ cotextPathPretty(context.project, cluster.region, cluster.zone, cluster.cluster) }}
    </div>
  </div -->
</template>

<script>
  //    v-bind:href="cotextPathLink(context.project, cluster.region, cluster.zone, cluster.cluster)"
export default {
  name: 'k8s-map-context-drop-down',
  props: ['context'],
  methods: {
    cotextPathPretty(project, region, zone, cluster) {
      return [project, region, zone, cluster].join(' / ')
    },
    cotextPathLink(project, region, zone, cluster) {
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
