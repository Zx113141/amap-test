<template>
  <Transition>
    <KeepAlive>
      <component
        :is="PanelCompMap[comp.name]"
        :options="{ ...comp.options }"
        :setOptions="comp.setOptions"
      >
      </component>
    </KeepAlive>
  </Transition>
</template>

<script setup lang="ts">
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  const PanelCompMap = {
    marker: defineAsyncComponent(() => import('../Panel-Components/marker.vue')),
    polygon: defineAsyncComponent(() => import('../Panel-Components/polygon.vue')),
  };
  const editStore = useEditMapWithOut();
  const comp = reactive({
    name: 'map',
    options: {},
    setOptions: null,
  });

  onMounted(() => {
    comp.setOptions = editStore.setOptions;
  });
  watch(
    () => editStore.material.name,
    () => {
      comp.name = editStore.material.name;
      comp.options = editStore.material.options;
    },

    {
      deep: true,
      immediate: true,
    },
  );
</script>

<style lang="less" scoped></style>
