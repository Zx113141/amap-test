<template>
  <a-collapse v-model:active-key="activeKey">
    <a-collapse-panel :key="'base'" :header="'基础配置'">
      <div class="menu">
        <Transition>
          <KeepAlive>
            <component :is="comp.comp" :ref="setItemRef" :options="comp.options"> </component>
          </KeepAlive>
        </Transition>

        <embed-base-events></embed-base-events>
        <!-- <a-button @click="() => handleSave()">保存</a-button> -->
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

  const comp = ref<any>({
    comp: null,
    options: {},
  });

  const handleSave = async () => {
    // console.log(panelCompRefs.value);
    // const value = panelCompRefs.value
    //   .filter((item) => !item.nodeType)
    //   .find((item) => item.context === comp.options.context);
    // editStore.service?.cfgForEmbedAndStruct(value);
  };

  watch(
    [() => editStore.service?.panelVNode, () => editStore.service?.options],

    ([newComp, options]) => {
      if (options) {
        comp.value.options = options.value || options;
      }
      comp.value.comp = newComp;
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
