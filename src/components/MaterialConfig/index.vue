<template>
  <a-collapse :activeKey="['events', 'base']">
    <a-collapse-panel :key="menu.key" :header="menu.name" v-for="menu in menu_items">
      <div class="menu">
        <component :is="edit_map[menu.key]" :comp="comp"></component>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  // import EmbedBasePanel from '../EmbedBasePanel/index.vue';
  // import EmbedBaseEvents from '../EmbedBaseEvents/index.vue';
  const edit_map = {
    base: defineAsyncComponent(() => import('../EmbedBasePanel/index.vue')),
    events: defineAsyncComponent(() => import('../EmbedBaseEvents/index.vue')),
  };
  const editStore = useEditMapWithOut();
  const menu_items = ref([]);
  const props = defineProps({
    item: {
      type: Array,
    },
  });
  const comp = reactive({
    name: 'MapService',
    setOptions: (options: any) => {},
  });
  onMounted(() => {
    comp.setOptions = editStore.setCurrentStruct;
  });
  watch(
    () => editStore.struct.name,
    (newName) => {
      comp.name = newName;
      props.item.forEach((menu) => {
        if (editStore.struct.cate === menu.key) {
          const menuItems = menu.children.find((item) => item.name === newName);
          if (menuItems && menuItems?.menu) {
            menu_items.value = menuItems.menu;
          }
        }
      });
    },

    {
      deep: true,
      immediate: true,
    },
  );
</script>

<style lang="less" scoped></style>
