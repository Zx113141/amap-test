<template>
  <div class="property-container">
    <div class="property">
      <!-- event -->
      <div class="property-list">
        <a-menu id="event'" v-model:selectedKeys="selectedKeys.eventsSelectedKeys" mode="inline">
          <a-menu-item @click="() => handleEventsClick(item)" :key="item" v-for="item in data">{{
            events_list.find((eve) => eve.value == item.event)?.label || item
          }}</a-menu-item>
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
      <div class="property-list">
        <component :is=""></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { DataItem } from '../field/index.vue';

  defineProps({
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

  const selectedKeys = reactive<{
    eventsSelectedKeys: string[];
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

  // const propertySelectedKeys = ref<string[]>([]);

  const handleClick = (e, id) => {
    if (id === 'lifecycle') return;
    if (id === 'embed') {
      // console.log(e, id);
      menu_list[1].list = selectedKeys.eventsSelectedKeys[0].struct_id.filter(
        (struct) => struct.option.parent === e.key,
      );
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
    }
  };
  const handleEventsClick = (item) => {
    menu_list[0].list = item.reactive_embed;
    menu_list[1].list = [];
    menu_list[2].list = [];
    // menu_list[1].list = []
  };
  defineExpose(selectedKeys);
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
    // .property {
    //   display: flex;

    //   .property-list {
    //     padding: 0;
    //     .property-info {
    //       padding: 8px 10px;
    //       font-size: 16px;

    //       list-style: none;
    //     }
    //   }

    //   .active {
    //     color: #1890ff;
    //   }
    // }
  }
</style>
