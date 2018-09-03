<template>
  <ul>
    <li
      v-for="cluster in context.clusters"
      v-bind:key="cluster.cluster"
    >
      <a v-bind:href="projectPathLink(context.project, cluster.region, cluster.zone, cluster.cluster)">
        {{ projectPathPretty(context.project, cluster.region, cluster.zone, cluster.cluster) }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'k8s-map-context',
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
