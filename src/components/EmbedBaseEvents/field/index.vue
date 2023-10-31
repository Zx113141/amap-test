<template>
  <a-table :data-source="dataSource" :columns="fields_columns" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'event'">
        <a-select style="width: 100%" v-model:value="editableData[record.key].event">
          <a-select-option :value="event.value" v-for="event in event_list">{{
            event.label
          }}</a-select-option>
        </a-select>
      </template>
      <template v-else-if="column.dataIndex === 'reactive_embed'">
        <a-select
          style="width: 100%"
          v-model:value="editableData[record.key].reactive_embed"
          @change="handleEmbedChange"
        >
          <a-select-option :value="embed.name" v-for="embed in embed_struct.embed_list">{{
            embed.name
          }}</a-select-option>
        </a-select>
      </template>
      <template v-else-if="column.dataIndex === 'reactive_field'">
        <a-select style="width: 100%" v-model:value="editableData[record.key].reactive_field">
          <a-select-option
            :value="struct.getExtData().id"
            v-for="struct in embed_struct.struct_list"
            >{{ struct.getExtData().name }}</a-select-option
          >
        </a-select>
      </template>
      <template v-else>
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.key)"
        >
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <div class="btn">
    <a-button class="editable-add-btn" style="width: 100%" @click="handleAdd" type="dashed"
      >添加事件</a-button
    >
  </div>
</template>

<script lang="ts" setup>
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  import type { Ref, UnwrapRef } from 'vue';
  import { events_list, fields_columns } from '/@/config/constant/events_list';
  const store = useEditMapWithOut();

  const event_list = reactive(events_list);
  const embed_struct = reactive<any>({
    embed_list: [],
    struct_list: [],
  });

  interface DataItem {
    key: number;
    event: string;
    reactive_embed: string;
    reactive_field: string;
    struct_id: string;
  }

  const dataSource: Ref<DataItem[]> = ref([]);
  const count = computed(() => dataSource.value.length);
  const editableData: UnwrapRef<DataItem[]> = reactive([]);

  const onDelete = (key: number) => {
    dataSource.value = dataSource.value.filter((item) => item.key !== key);
  };
  const handleAdd = () => {
    const newData = {
      key: count.value,
      event: '',
      reactive_embed: '',
      reactive_field: '',
      struct_id: '',
    };
    editableData.push(newData);
    dataSource.value.push(newData);
  };
  const handleEmbedChange = (e) => {
    const embed = embed_struct.embed_list.find((embed) => embed.name === e);
    embed_struct.struct_list = embed.structs;
  };
  watch(
    () => store.service?.embedList,
    (newList) => {
      if (newList && newList.length > 0) {
        embed_struct.embed_list = newList;
      }
    },
    {
      deep: true,
    },
  );
</script>

<style lang="less" scoped>
  .btn {
    margin: 15px 0px;
  }
  .editable-cell {
    position: relative;
    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
      padding-right: 24px;
    }

    .editable-cell-text-wrapper {
      padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
      position: absolute;
      right: 0;
      width: 20px;
      cursor: pointer;
    }

    .editable-cell-icon {
      margin-top: 4px;
      display: none;
    }

    .editable-cell-icon-check {
      line-height: 28px;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
      color: #108ee9;
    }

    .editable-add-btn {
      margin-bottom: 8px;
    }
  }
  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }
</style>
