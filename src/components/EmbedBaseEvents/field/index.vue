<template>
  <a-table :data-source="dataSource" :columns="columns" :pagination="false">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'event'">
        <!-- v-model:value="editableData[record.key].event" -->
        <a-select>
          <a-select-option :value="event.value" v-for="event in event_list">{{
            event.label
          }}</a-select-option>
        </a-select>
      </template>
      <template v-else-if="column.dataIndex === 'reactive_embed'">
        <!-- v-model:value="editableData[record.key].reactive_embed" -->
        <a-select>
          <a-select-option :value="event.value" v-for="event in event_list">{{
            event.label
          }}</a-select-option>
        </a-select>
      </template>
      <template v-else-if="column.dataIndex === 'reactive_field'">
        <!-- v-model:value="editableData[record.key].reactive_field" -->
        <a-select>
          <a-select-option :value="event.value" v-for="event in event_list">{{
            event.label
          }}</a-select-option>
        </a-select> </template
      ><template v-else-if="column.dataIndex === 'struct_id'">
        {{ text }}
      </template>
      <!-- <template v-if="column.dataIndex !== 'operation'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            
             <check-outlined class="editable-cell-icon-check" @click="save(record.key)" /> 
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
          </div>
        </div>
      </template> -->
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
  //   import { computed, defineComponent, reactive, ref } from 'vue';
  import type { Ref, UnwrapRef, ComputedRef } from 'vue';
  const event_list = [
    {
      label: '鼠标点击',
      value: 'click',
    },
    {
      label: '鼠标双击',
      value: 'dblclick',
    },
    {
      label: '右键点击',
      value: 'rightclick',
    },
    {
      label: '鼠标移入',
      value: 'mouseover',
    },
  ];
  interface DataItem {
    key: number;
    event: string;
    reactive_embed: string;
    reactive_field: string;
    struct_id: string;
  }

  const columns = [
    {
      title: '事件选择',
      dataIndex: 'event',
    },
    {
      title: '响应类目',
      dataIndex: 'reactive_embed',
    },
    {
      title: '响应字段',
      dataIndex: 'reactive_field',
    },
    {
      title: '构件ID',
      dataIndex: 'struct_id',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
    },
  ];
  const dataSource: Ref<DataItem[]> = ref([]);
  const count = computed(() => dataSource.value.length);
  const editableData: UnwrapRef<DataItem[]> = reactive([]);

  const onDelete = (key: string) => {
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
    dataSource.value.push(newData);
  };
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
