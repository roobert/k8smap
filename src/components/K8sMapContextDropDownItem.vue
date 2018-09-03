<template>
  <b-dropdown-item v-bind:text="contextPath"></b-dropdown-item>
</template>

<script>
export default {
  name: 'k8s-map-context-drop-down',
  props: ['context']
}
</script>

<style>
#context-select {
  margin: 0 !important;
}
</style>
