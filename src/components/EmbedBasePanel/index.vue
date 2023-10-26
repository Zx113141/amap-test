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
    Rectangle: defineAsyncComponent(() => import('../Panel-Components/rectangle.vue')),
  };
</script>

<style lang="less" scoped></style>
