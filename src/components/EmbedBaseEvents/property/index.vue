<template>
  <div class="property-container">
    <div class="property">
      <!-- event -->
      <div class="property-list">
        <a-menu id="event'" v-model:selectedKeys="selectedKeys.eventsSelectedKeys" mode="inline">
          <a-menu-item
            @click="() => handleEventsClick(item)"
            :key="item.key"
            v-for="item in data"
            >{{ events_list.find((eve) => eve.value == item.event)?.label || item }}</a-menu-item
          >
        </a-menu>
      </div>

      <div class="property-list" v-for="list in menu_list">
        <a-menu
          :id="list.label"
          v-model:selectedKeys="selectedKeys[list.selectedKeys]"
          mode="inline"
          @click="(e) => handleClick(e, list.label)"
        >
          <a-menu-item :key="item.value" v-for="item in list.list">{{ item.label }}</a-menu-item>
        </a-menu>
      </div>
      <div class="property-list" style="flex: 2">
        <component :is="comp" :ref="setItemRef"> </component>
      </div>
      <!-- <div class="step">
        <a-steps direction="vertical">
          <a-step v-for="step in steps" :title="step.label" description=" " :key="step.value" />
        </a-steps>
      </div> -->
      <div class="btn">
        <a-button style="height: 100%" type="primary" @click="saveCurrentEvents">保存</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType, reactive, ref } from 'vue';
  import { DataItem } from '../field/index.vue';
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  import EmbedService from '/@/service/embedService';

  const store = useEditMapWithOut();
  const props = defineProps({
    data: {
      type: Object as PropType<DataItem[]>,
      default: () => [],
    },
    events_list: {
      type: Object as PropType<
        {
          label: string;
          value: string;
        }[]
      >,
      default: () => [],
    },
  });

  interface List {
    list: {
      label: string;
      value: string;
    }[];
    label: string;
    selectedKeys: string;
  }
  let panelCompRefs = ref<any[]>([]);
  const setItemRef = (el) => {
    if (el) {
      panelCompRefs.value.push(el);
    }
  };
  const selectedKeys = reactive<{
    eventsSelectedKeys: number[];
    embedSelectedKeys: string[];
    lifecycleSelectedKeys: string[];
    structsSelectedKeys: string[];
  }>({
    eventsSelectedKeys: [],
    embedSelectedKeys: [],
    lifecycleSelectedKeys: [],
    structsSelectedKeys: [],
  });

  const menu_list = reactive<List[]>([
    {
      list: [],
      label: 'embed',
      selectedKeys: 'embedSelectedKeys',
    },

    {
      list: [],
      label: 'struct',
      selectedKeys: 'structsSelectedKeys',
    },
    {
      list: [],
      label: 'lifecycle',
      selectedKeys: 'lifecycleSelectedKeys',
    },
  ]);

  const comp = ref<any>(null);
  // const steps = ref<Item[]>([]);
  const arrayForm = reactive<
    {
      key: number;
      event: string;
      embed: string;
      struct: string;
      lifecycle: string;
      options: string;
    }[]
  >([]);
  // const propertySelectedKeys = ref<string[]>([]);

  const handleClick = (e, id) => {
    if (id === 'embed') {
      // console.log(e, id);
      const item = props.data.find(
        (data: DataItem) => data.key === selectedKeys.eventsSelectedKeys[0],
      ) as DataItem;

      menu_list[1].list = item.struct_id.map((struct: any) => {
        return {
          label: struct.label,
          value: struct.key,
        };
      });
      menu_list[2].list = [
        {
          label: '创建',
          value: 'create',
        },
      ];
    }
    if (id === 'struct') {
      menu_list[2].list = [
        {
          label: '更新',
          value: 'update',
        },
        {
          label: '销毁',
          value: 'destroy',
        },
      ];
    }
    if (id === 'lifecycle') {
      if (e.key != 'destroy') {
        const service = store.service as EmbedService;
        service.initStructPanel(selectedKeys.embedSelectedKeys[0]);
        comp.value = service.panelVNode;
      }
    }
  };
  const handleEventsClick = (item) => {
    menu_list[0].list = item.reactive_embed;
    menu_list[1].list = [];
    menu_list[2].list = [];

    comp.value = null;
    // menu_list[1].list = []
  };
  const saveCurrentEvents = () => {
    const { embedSelectedKeys, eventsSelectedKeys, structsSelectedKeys, lifecycleSelectedKeys } =
      selectedKeys;
    const options = panelCompRefs.value
      .filter((item) => !item.nodeType)
      .find((item) => item.context === embedSelectedKeys[0]);

    const item = props.data.find(
      (data: DataItem) => data.key === selectedKeys.eventsSelectedKeys[0],
    ) as DataItem;
    arrayForm.push({
      key: eventsSelectedKeys[0],
      event: item.event,
      embed: embedSelectedKeys[0],
      struct: structsSelectedKeys[0],
      lifecycle: lifecycleSelectedKeys[0],
      options,
    });
  };
  defineExpose(arrayForm);
</script>

<style lang="less" scoped>
  .property-container {
    .property {
      display: flex;
    }
    .property-list {
      overflow-x: hidden;
      overflow-y: auto;
      height: 240px;
    }
    .property-list:nth-last-child(3) {
      margin-right: 8px;
      padding-right: 8px;
      border-right: 1px solid #eee;
    }
    .btn {
      margin: 10px;
    }
    .step {
      padding: 10px 5px;
    }
  }
</style>
