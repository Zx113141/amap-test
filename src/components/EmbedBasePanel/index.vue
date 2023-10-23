<template>
  <Transition>
    <KeepAlive>
      <component :is="PanelCompMap[comp.name]" :setOptions="comp.setOptions"> </component>
    </KeepAlive>
  </Transition>
</template>

<script setup lang="ts">
  const props = defineProps({
    comp: {
      name: {
        default: 'MapService',
      },
      setOptions: {
        default: () => () => {},
      },
    },
  });
  const PanelCompMap = {
    Marker: defineAsyncComponent(() => import('../Panel-Components/marker.vue')),
    Polygon: defineAsyncComponent(() => import('../Panel-Components/polygon.vue')),
    MapService: defineAsyncComponent(() => import('../Panel-Components/map.vue')),
  };
</script>

<style lang="less" scoped></style>
