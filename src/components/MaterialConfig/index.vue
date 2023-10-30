<template>
  <a-collapse v-model:active-key="activeKey">
    <a-collapse-panel :key="'base'" :header="'基础配置'">
      <div class="menu">
        <embed-base-panel :comp="comp"></embed-base-panel>
      </div>
    </a-collapse-panel>
    <a-collapse-panel :key="'events'" :header="'事件处理'">
      <div class="menu">
        <embed-base-events :comp="comp"></embed-base-events>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  import EmbedBasePanel from '../EmbedBasePanel/index.vue';
  import EmbedBaseEvents from '../EmbedBaseEvents/index.vue';
  const activeKey = ref(['events', 'base']);
  // const edit_map = {
  //   base: defineAsyncComponent(() => import('../EmbedBasePanel/index.vue')),
  //   events: defineAsyncComponent(() => import('../EmbedBaseEvents/index.vue')),
  // };
  const editStore = useEditMapWithOut();
  // const menu_items = ref([]);
  // const props = defineProps({
  //   item: {
  //     type: Array,
  //   },
  // });
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
      immediate: true,
    },
  );
</script>

<style lang="less" scoped></style>
