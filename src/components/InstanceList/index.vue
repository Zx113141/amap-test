<template>
  <div class="struct-list">
    <a-tabs v-model:activeKey="activeKey" :tab-position="'left'" animated size="small">
      <a-tab-pane key="record" tab="历史">
        <ul v-if="activeKey === 'record'">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </a-tab-pane>
      <a-tab-pane key="struct_list" tab="全局">
        <a-tree
          :show-line="true"
          :tree-data="embedList"
          @select="onSelect"
          v-if="activeKey == 'struct_list'"
        >
          <template #icon><carry-out-outlined /></template>
          <template #title="{ dataRef }">
            <template v-if="dataRef.key === '0-0-0-1'">
              <div>multiple line title</div>
              <div>multiple line title</div>
            </template>
            <template v-else>{{ dataRef.title }}</template>
          </template>
          <template #switcherIcon="{ switcherCls }"
            ><down-outlined :class="switcherCls"
          /></template>
        </a-tree>
      </a-tab-pane>
      <a-tab-pane key="to-do" tab="Tab 3"
        ><span v-if="activeKey == 'struct_list'"> // todo </span></a-tab-pane
      >
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  const activeKey = ref('record');
  import { useEditMap } from '/@/store/modules/editMap';
  import { Embed } from '/@/service/embedService';
  import { CarryOutOutlined } from '@ant-design/icons-vue';
  import type { TreeProps } from 'ant-design-vue';
  const store = useEditMap();
  const embedList = ref<TreeProps['treeData']>([]);

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    const id = info.selectedNodes[0].id;
    if (id) {
      store.selectStructById({
        name: info.name,
        id,
      });
    }
  };

  watch(
    () => store.service?.embedList,
    (newVal) => {
      if (newVal && newVal.length > 0) {
        embedList.value = newVal.map((embed: Embed, index: number) => {
          return {
            title: embed.name,
            key: '0' + index,
            children: embed.structs
              ? embed.structs.map((struct, i) => {
                  return {
                    title:
                      embed.name + '-' + struct.getExtData().id.substring(10).replace('==', ''),
                    key: '0' + index + (i + 1),
                    id: struct.getExtData().id,
                    name: embed.name,
                  };
                })
              : [],
          };
        });
      }
    },
    {
      deep: true,
      immediate: true,
    },
  );
</script>

<style lang="less">
  .struct-list {
    padding: 4px;
    .ant-tabs-left > .ant-tabs-nav .ant-tabs-tab,
    .ant-tabs-right > .ant-tabs-nav .ant-tabs-tab,
    .ant-tabs-left > div > .ant-tabs-nav .ant-tabs-tab,
    .ant-tabs-right > div > .ant-tabs-nav .ant-tabs-tab {
      padding: 4px;
    }
    overflow: auto;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        padding: 10px;
      }
      li:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 1.95px 1.95px 2.6px;
      }
    }
  }
</style>
