<template>
  <div id="k8s-map-context-picker" class="container-fluid">
    <div class="row header">
      <div class="col-sm logo">
        <b-link to="/">
          <img :src="require('../assets/logo.png')" width="40px">
        </b-link>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div id="context-picker">
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
                <td class="map-button">
                  <!-- FIXME: onClick? -->
                  <b-button
                    v-bind:to="projectPathLink(context.project, context.region, context.zone, context.cluster)"
                    variant="primary"
                    size="sm"
                  >
                  Map
                  </b-button>
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

import { default as config } from '../../conf/config.mjs'

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
body {
  background: #eee ! important
}

#context-picker {
  padding-top: 20px;
}

.map-button {
  text-align: right;
}
</style>
