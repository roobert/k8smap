<template>
  <div id="k8s-map-context-picker" class="container-fluid">
    <div class="row">
      <div class="col-sm">
        <table class="table table-hover">
          <thead>
            <th scope="col">project</th>
            <th scope="col">region</th>
            <th scope="col">zone</th>
            <th scope="col">cluster</th>
            <th scope="col"></th>
          </thead>
          <tbody
            v-for="context in contexts"
            v-bind:context="context"
            v-bind:key="context.project"
          >
            <tr
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
              <td>
                <!-- FIXME: onClick? -->
                <a v-bind:href="projectPathLink(context.project, cluster.region, cluster.zone, cluster.cluster)">
                  <button>Map</button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { contexts as k8sContexts } from '../../conf/config'

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
