import { store } from '/@/store'; import { store } from '/@/store';
<template>
  <a-collapse v-model:activeKey="activeKey" @change="changeActivekey">
    <a-collapse-panel key="1" header="This is panel header 1">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="This is panel header 2">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="This is panel header 3">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  const store = useEditMapWithOut();
  const menuKeys = ref([])
  watch(
    store,
    (newval) => {
      menuKeys.value = Object.keys(newval.materialOptions).map((item) => {
        return {
          key:item,
          
        }
      })
    },
    {
      deep: true,
      immediate: true,
    },
  );
</script>

<style lang="less" scoped></style>
