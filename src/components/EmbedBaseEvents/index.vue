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
          <Field @change="getEmbedOrStruct" :events_list="events_list"></Field>
        </a-collapse-panel>
        <a-collapse-panel :key="'properties'" :header="'属性响应'">
          <Property :data="editData" :events_list="events_list" ref="property"></Property>
        </a-collapse-panel>
      </a-collapse>
    </a-modal>
    <a-form-item>
      <a-button @click="() => (visible = true)">配置响应器</a-button>
    </a-form-item>
    <!-- <struct-list @visible="structEventsHandler"></struct-list> -->
  </div>
</template>

<script lang="ts" setup>
  // import StructList from './struct_list/index.vue';
  import Field, { type DataItem } from './field/index.vue';
  import Property, { type FormArray } from './property/index.vue';
  import { events_list } from '/@/config/constant/events_list';
  const visible = ref(true);
  const activeKey = ref(['field']);
  const property = ref(null);
  let editData = reactive<DataItem[]>([]);

  const getEmbedOrStruct = (data: DataItem[]) => {
    editData = data.filter((item: DataItem) => item.event && item.reactive_embed);
  };

  const handleOk = () => {
    console.log(property);
    // mixinEvents(property.value as FormArray[]);
    visible.value = false;
  };
  const mixinEvents = (formArray: FormArray[]) => {
    const arr = new Map<string, FormArray[]>();
    formArray.forEach((item) => {
      console.log(item);
      if (arr.has(item.event)) {
        const newArr = arr.get(item.event);
        arr.set(item.event, [
          ...newArr,
          {
            ...item,
          },
        ]);
      } else {
        arr.set(item.event, [{ ...item }]);
      }
    });
    console.log(arr);
  };
  // const createTreeData = (data: DataItem[], embed_struct) => {
  //   let treeData = [];
  //   // const { struct_list } = embed_struct;
  //   data.forEach((data: DataItem) => {
  //     const struct_options = data.struct_id.map((struct) => {
  //       return {
  //         label: struct,
  //         value: struct,
  //       };
  //     });
  //     const embed_options = data.reactive_embed.map((embedName) => {
  //       return {
  //         label: embedName,
  //         value: embedName,
  //         options: struct_options,
  //       };
  //     });
  //     let obj = {
  //       label: events_list.find((event) => event.value === data.event)?.label,
  //       value: data.event,
  //       options: embed_options,
  //     };
  //     treeData.push(obj);
  //   });
  //   editData = treeData;
  // };
</script>

<style lang="less"></style>
