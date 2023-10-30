<template>
  <div class="struct-list">
    <div class="icon-list">
      <div :class="['icon', activeKey === comp.key ? 'active' : '']" v-for="comp in components">
        <component
          :is="comp.component"
          :key="comp.key"
          @click="() => onTabChange(comp.key)"
          style="font-size: 22px"
        />
      </div>
    </div>
    <div class="tab-content">
      <div class="tabs">
        <div class="tab-title"> </div>
        <div v-if="activeKey == 'app_store'">
          <slot name="app_store"></slot>
        </div>
        <div v-else-if="activeKey == 'struct_list'"> <slot name="struct_list"></slot></div>
        <div v-else> history_list </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { BarsOutlined, ApartmentOutlined, AppstoreOutlined } from '@ant-design/icons-vue';

  const activeKey = ref('app_store');

  const onTabChange = (key: string) => {
    if (key === activeKey.value) return;
    activeKey.value = key;
  };
  const components = [
    {
      component: AppstoreOutlined,
      key: 'app_store',
    },
    {
      component: ApartmentOutlined,
      key: 'struct_list',
    },
    {
      component: BarsOutlined,
      key: 'history_list',
    },
  ];
</script>

<style lang="less">
  .struct-list {
    display: flex;
    align-items: flex-start;
    .icon-list {
      .icon {
        padding: 10px;
      }
    }
    .active {
      border-left: 3px solid #1890ff;
    }
  }
</style>
