<template>
  <div class="reactive">
    <!-- <embed-base-panel :comp="comp"></embed-base-panel> -->
    <a-modal
      v-model:visible="visible"
      title="配置响应器"
      @ok="handleOk"
      wrapClassName="reactive"
      width="1000px"
    >
      <a-collapse v-model:active-key="activeKey">
        <a-collapse-panel :key="'field'" :header="'依赖字段'">
          <Field></Field>
        </a-collapse-panel>
        <a-collapse-panel :key="'properties'" :header="'属性响应'">
          <div class="menu"> </div>
        </a-collapse-panel>
        <a-collapse-panel :key="'life_circle'" :header="'构件生命周期'">
          <div class="menu"> </div>
        </a-collapse-panel>
      </a-collapse>
    </a-modal>
    <struct-list @visible="structEventsHandler"></struct-list>
  </div>
</template>

<script lang="ts" setup>
  import StructList from './struct_list/index.vue';
  import Field from './field/index.vue';
  const visible = ref(true);
  const activeKey = ref(['field']);
  // const showModal = () => {
  //   visible.value = true;
  // };

  const handleOk = (e: MouseEvent) => {
    console.log(e);
    visible.value = false;
  };

  const structEventsHandler = (value, struct) => {
    console.log(value, struct);
    visible.value = value;
  };
  // import EmbedBasePanel from '../EmbedBasePanel/index.vue';
  // import { useEditMapWithOut } from '/@/store/modules/editMap';
  // const editStore = useEditMapWithOut();
  // const comp = reactive({
  //   name: 'MapService',
  //   setOptions: () => {},
  //   struct: null,
  // });
  // onMounted(() => {
  //   comp.setOptions = editStore.setCurrentStruct;
  // });
  // watch(
  //   () => editStore.embed.name,
  //   (newName) => {
  //     comp.name = newName;
  //     comp.struct = editStore.embed;
  //   },

  //   {
  //     deep: true,
  //   },
  // );
</script>

<style lang="less"></style>
