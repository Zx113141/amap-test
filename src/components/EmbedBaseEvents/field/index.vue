<template>
  <div style="padding: 10px">
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
            style="width: 150px"
            v-model:value="editableData[record.key].reactive_embed"
            @change="handleEmbedChange"
            :token-separators="[',']"
            :labelInValue="true"
            mode="tags"
            :options="
              embed_struct.embed_list.map((embed) => ({
                value: embed.name,
                label: embed.name,
              }))
            "
          >
            <!-- <a-select-option :value="" v-for="embed in " :label="embed.name"></a-select-option> -->
          </a-select>
        </template>
        <template v-else-if="column.dataIndex === 'struct_id'">
          <a-select
            style="width: 150px"
            v-model:value="editableData[record.key].struct_id"
            :token-separators="[',']"
            mode="tags"
            :labelInValue="true"
            :options="
              embed_struct.struct_list.map((struct) => ({
                label: struct.label,

                options: struct.options.map((stru) => ({
                  value: stru.getExtData().id,
                  label: stru.getExtData().name,
                  parent: struct.label,
                })),
              }))
            "
          >
          </a-select>
        </template>
        <!-- <template v-else-if="column.dataIndex === 'create'">
          <a-switch
            v-model:checked="editableData[record.key].create"
            @change="() => (editableData[record.key].destroy = !editableData[record.key].create)"
          >
          </a-switch>
        </template>
        <template v-else-if="column.dataIndex === 'destroy'">
          <a-switch
            v-model:checked="editableData[record.key].destroy"
            @change="() => (editableData[record.key].create = !editableData[record.key].destroy)"
          >
          </a-switch>
        </template> -->
        <template v-else>
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="onDelete(record.key)"
          >
            <a>删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <div class="btn">
      <a-button class="editable-add-btn" style="width: 100%" @click="handleAdd" type="dashed"
        >添加事件</a-button
      >
    </div>
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
  const emits = defineEmits(['change']);
  export interface DataItem {
    key: number;
    event: string;
    reactive_embed: string[];
    struct_id: string[];
    // create: boolean;
    // destroy: boolean;
  }
  // const createDisabled = computed(() => (editor) => {
  //   return !editor.destroy;
  // });
  // const destroyDisabled = computed(() => (editor) => {
  //   return !editor.create;
  // });
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
      reactive_embed: [],
      struct_id: [],
      // create: false,
      // destroy: false,
    };
    editableData.push(newData);
    dataSource.value.push(newData);
  };
  const handleEmbedChange = (e: any[]) => {
    // console.log(e);
    const arr: any[] = [];
    e.forEach((key) => {
      const embed = embed_struct.embed_list.find((embed) => embed.name === key.value);
      arr.push({
        label: key.label,
        value: embed.name,
        options: embed.structs,
      });
    });
    embed_struct.struct_list = arr;
    //
    //  = ;
  };
  watch(
    editableData,
    (newEditData) => {
      emits('change', newEditData);
    },
    {
      deep: true,
    },
  );
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
