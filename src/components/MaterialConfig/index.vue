<template>
  <a-collapse v-model:active-key="activeKey">
    <a-collapse-panel :key="'base'" :header="'基础配置'">
      <div class="menu">
        <Transition>
          <KeepAlive>
            <component :is="comp.comp" :ref="setItemRef"> </component>
          </KeepAlive>
        </Transition>

        <embed-base-events></embed-base-events>
        <a-button @click="() => handleSave()">保存</a-button>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
  import { useEditMapWithOut } from '/@/store/modules/editMap';

  import EmbedBaseEvents from '../EmbedBaseEvents/index.vue';
  const editStore = useEditMapWithOut();

  const activeKey = ref(['events', 'base']);
  let panelCompRefs = ref<any[]>([]);
  const setItemRef = (el) => {
    if (el) {
      panelCompRefs.value.push(el);
    }
  };

  const comp = reactive<any>({
    name: '',
    comp: null,
    setOptions: () => {},
  });

  onMounted(() => {
    comp.setOptions = editStore.setCurrentStruct;
  });

  const handleSave = async () => {
    const value = panelCompRefs.value
      .filter((item) => !item.nodeType)
      .find((item) => item.value.context === comp.name);
    comp.setOptions(value.value);
  };

  watch(
    [() => editStore.service?.panelVNode, () => editStore.embed.name],
    async ([newComp, name]) => {
      comp.comp = newComp;
      comp.name = name;
      // console.log(newName);
    },

    {
      deep: true,
    },
  );
</script>

<style lang="less" scoped>
  .menu :deep(.ant-form-item) {
    border-bottom: 1px solid #ddd;
    margin: 10px;
  }
</style>
