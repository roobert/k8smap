<template>
  <div id="k8s-map-context-picker">
    <k8s-map-context
      v-for="context in contexts"
      v-bind:context="context"
      v-bind:key="context.project"
    >
    </k8s-map-context>
  </div>
</template>

<script>
import { contexts as k8sContexts } from '../../config'
import K8sMapContext from './K8sMapContext'

export default {
  name: 'k8s-map-context-picker',
  components: {
    'k8s-map-context': K8sMapContext
  },
  data () {
    return {
      contexts: k8sContexts
    }
  }
}
</script>

<style>
</style>
