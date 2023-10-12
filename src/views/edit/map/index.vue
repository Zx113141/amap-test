<template>
  <geo-map :mode="MAP_MODE.EDIT" :auto-fullscreen="true"> </geo-map>
</template>

<script setup lang="ts">
  import GeoMap from '/@/components/Map/index.vue';
  import { MAP_MODE } from '/@/components/Map/map';
</script>
