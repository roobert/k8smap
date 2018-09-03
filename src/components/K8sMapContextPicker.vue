<template>
  <div id="k8s-map-context-picker">
    <table class="table">
      <thead>
        <th scope="col">project</th>
        <th scope="col">region</th>
        <th scope="col">zone</th>
        <th scope="col">cluster</th>
      </thead>
      <tbody
        v-for="context in contexts"
        v-bind:context="context"
        v-bind:key="context.project"
      >
        <tr
          class="clickable-row"
          data-href="projectPathLink(context.project, cluster.region, cluster.zone, cluster.cluster)"
          v-for="cluster in context.clusters"
          v-bind:key="cluster.cluster"
        >
          <td>
            {{ context.project }}
          </td>
          <td>
            {{ cluster.region }}
          </td>
          <td>
            {{ cluster.zone }}
          </td>
          <td>
            {{ cluster.cluster }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { contexts as k8sContexts } from '../../config'

export default {
  name: 'k8s-map-context-picker',
  data () {
    return {
      contexts: k8sContexts
    }
  },
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
</style>
