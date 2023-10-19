<template>
  <Transition>
    <KeepAlive>
      <component :is="PanelCompMap[comp.name]" :setOptions="comp.setOptions"> </component>
    </KeepAlive>
  </Transition>
</template>

<script setup lang="ts">
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  const PanelCompMap = {
    Marker: defineAsyncComponent(() => import('../Panel-Components/marker.vue')),
    Polygon: defineAsyncComponent(() => import('../Panel-Components/polygon.vue')),
  };
  const editStore = useEditMapWithOut();
  const comp = reactive({
    name: 'map',
    setOptions: (options: any) => {},
  });
  onMounted(() => {
    comp.setOptions = editStore.setCurrentStruct;
  });
  watch(
    () => editStore.struct.name,
    () => {
      comp.name = editStore.struct.name;
    },

    {
      deep: true,
      immediate: true,
    },
  );
</script>

<style lang="less" scoped></style>
