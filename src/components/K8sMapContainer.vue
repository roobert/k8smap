<template>
  <div class="container border">
    <div class="title">{{ container.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'k8s-map-container',
  props: ['container']
}
</script>
