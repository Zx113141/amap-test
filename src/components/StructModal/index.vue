<template>
  <a-tree :show-line="true" :tree-data="embedList" @select="onSelect">
    <template #icon><carry-out-outlined /></template>
    <template #title="{ dataRef }">
      <template v-if="dataRef.key === '0-0-0-1'">
        <div>multiple line title</div>
        <div>multiple line title</div>
      </template>
      <template v-else>{{ dataRef.title }}</template>
    </template>
    <template #switcherIcon="{ switcherCls }"><down-outlined :class="switcherCls" /></template>
  </a-tree>
</template>

<script lang="ts" setup>
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

<style lang="less" scoped></style>
