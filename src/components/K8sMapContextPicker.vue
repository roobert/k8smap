<template>
  <div id="k8s-map-context-picker" class="container-fluid">
    <div class="row">
      <div class="col">
        <!--div class="mx-auto w-75 p-3 text-center">
          <b-table striped hover @row-clicked="myRowClickHandler" :items="contextItems"></b-table>
        </div-->
        <div class="mx-auto w-75 p-3 text-center">
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
              v-bind:key="context.name"
            >
              <tr>
                <td>
                  {{ context.project }}
                </td>
                <td>
                  {{ context.region }}
                </td>
                <td>
                  {{ context.zone }}
                </td>
                <td>
                  {{ context.cluster }}
                </td>
                <td>
                  <!-- FIXME: onClick? -->
                  <a v-bind:href="projectPathLink(context.project, context.region, context.zone, context.cluster)">
                    <button>Map</button>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { default as config } from '../../conf/config'

export default {
  name: 'k8s-map-context-picker',
  data () {
    return {
      contexts: config.contexts
    }
  },
  methods: {
    contextPathPretty(project, region, zone, cluster) {
      return [project, region, zone, cluster].join(' / ')
    },
    projectPathPretty(project, region, zone, cluster) {
      return [project, region, zone, cluster].join(' / ')
    },
    projectPathLink(project, region, zone, cluster) {
      return ['/context', project, region, zone, cluster].join('/')
    }
  },
  computed: {
    contextPathPrettyCurrent () {
      return this.contextPathPretty(this.project, this.region, this.zone, this.cluster)
    },
    contextItems () {
      var collection = [];
      for (let context of this.contexts) {
        if (JSON.stringify(this.context) !== JSON.stringify(context)) {
          collection.push(context)
        }
      }
      return collection;
    }
  }
}
</script>

<style>
</style>
