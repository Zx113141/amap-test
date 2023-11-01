<template>
  <a-collapse v-model:active-key="activeKey">
    <a-collapse-panel :key="'base'" :header="'基础配置'">
      <div class="menu">
        <Transition>
          <KeepAlive>
            <component
              :is="PanelCompMap[comp.name]"
              :setOptions="comp.setOptions"
              :ref="setItemRef"
            >
            </component>
          </KeepAlive>
        </Transition>
        <!-- <embed-base-panel :comp="comp" ></embed-base-panel> -->
        <embed-base-events :comp="comp"></embed-base-events>
        <a-button @click="() => handleSave()">保存</a-button>
      </div>
    </a-collapse-panel>
    <!-- <a-collapse-panel :key="'events'" :header="'事件处理'">
      <div class="menu">
       
      </div>
    </a-collapse-panel> -->
  </a-collapse>
</template>

<script setup lang="ts">
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  // import EmbedBasePanel from '../EmbedBasePanel/index.vue';
  import EmbedBaseEvents from '../EmbedBaseEvents/index.vue';
  let panelCompRefs = ref<any[]>([]);
  const activeKey = ref(['events', 'base']);
  const editStore = useEditMapWithOut();
  const setItemRef = (el) => {
    if (el) {
      panelCompRefs.value.push(el);
    }
  };
  const PanelCompMap = {
    Marker: defineAsyncComponent(() => import('../Panel-Components/marker.vue')),
    Polygon: defineAsyncComponent(() => import('../Panel-Components/polygon.vue')),
    MapService: defineAsyncComponent(() => import('../Panel-Components/map.vue')),
    Rectangle: defineAsyncComponent(() => import('../Panel-Components/rectangle.vue')),
    Circle: defineAsyncComponent(() => import('../Panel-Components/circle.vue')),
  };
  const comp = reactive<any>({
    name: 'MapService',
    setOptions: () => {},
    struct: null,
  });

  onMounted(() => {
    comp.setOptions = editStore.setCurrentStruct;
  });

  const handleSave = () => {
    const value = panelCompRefs.value.find(
      (compRef) => compRef.value && compRef.value.context === comp.name,
    );
    comp.setOptions(value.value);
  };

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

<style lang="less" scoped>
  .menu :deep(.ant-form-item) {
    border-bottom: 1px solid #ddd;
    margin: 10px;
  }
</style>
