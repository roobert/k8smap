<template>
  <b-dropdown id="context-select" v-bind:text="currentContext" class="m-md-2">
    <k8s-context-drop-down-item
      v-for="context in contexts"
      v-bind:key="context.index"
      v-bind:context="context"
    >
    </k8s-context-drop-down-item>
  </b-dropdown>
</template>

<script>
import K8sMapContextDropDownItem from './K8sMapContextDropDownItem.vue'

export default {
  name: 'k8s-map-context-drop-down',
  props: ['contexts', 'currentContext'],
  components: {
    'k8s-map-context-drop-down-item': K8sMapContextDropDownItem
  }
}
</script>

<style>
#context-select {
  margin: 0 !important;
}
</style>
