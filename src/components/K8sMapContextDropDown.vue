<template>
  <b-dropdown id="context-select" v-bind:text="contextPath" class="m-md-2">
    <k8s-context-drop-down-item
      v-for="context in env.contexts"
      v-bind:key="context.index"
      v-bind:context="context"
    >
  </b-dropdown>
</template>

<script>
export default {
  name: 'k8s-map-context-drop-down',
  props: ['contexts']
}
</script>

<style>
#context-select {
  margin: 0 !important;
}
</style>
