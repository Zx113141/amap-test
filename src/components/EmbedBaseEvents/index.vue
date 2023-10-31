<template>
  <div>
    <embed-base-panel :comp="comp"></embed-base-panel>
    <struct-list></struct-list>
  </div>
</template>

<script lang="ts" setup>
  import StructList from './struct_list/index.vue';
  import EmbedBasePanel from '../EmbedBasePanel/index.vue';
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  const editStore = useEditMapWithOut();
  const comp = reactive({
    name: 'MapService',
    setOptions: () => {},
    struct: null,
  });
  onMounted(() => {
    comp.setOptions = editStore.setCurrentStruct;
  });
  watch(
    () => editStore.embed.name,
    (newName) => {
      comp.name = newName;
      comp.struct = editStore.embed;
    },

    {
      deep: true,
    },
  );
</script>

<style lang="less" scoped></style>
