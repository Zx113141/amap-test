<template>
  <Transition>
    <KeepAlive>
      <component :is="PanelCompMap[options.type]" :options="{ ...options }"> </component>
    </KeepAlive>
  </Transition>
</template>

<script setup lang="ts">
  import { useEditMapWithOut } from '/@/store/modules/editMap';

  const PanelCompMap = {
    marker: defineAsyncComponent(() => import('../Panel-Components/marker.vue')),
    polygon: defineAsyncComponent(() => import('../Panel-Components/polygon.vue')),
  };
  const store = useEditMapWithOut();
  const options = ref({});
  watch(
    store,
    (newval) => {
      options.value = newval.options || {
        type: 'map',
      };
    },
    {
      deep: true,
      immediate: true,
    },
  );
</script>

<style lang="less" scoped></style>
