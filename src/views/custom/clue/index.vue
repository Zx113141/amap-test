<template>
  <h2>客户线索</h2>

  <Table
    :tableFilterModel="tableFilterModel"
    :tableFilterItems="tableFilterItems"
    :url="fetchApi.list"
    :columns="columns"
    :hiddenFilter="true"
    :scroll="{ x: 1200 }"
  />
</template>

<script setup lang="ts">
  import { columns } from './constant';
  import fetchApi from '/@/api/home';
  import { useHomeStore } from '/@/store/modules/home';
  const tableFilterModel = reactive({ role_id: undefined, search: '' });
  const tableFilterItems = computed(() => [
    {
      type: 'select',
      name: 'role_id',
      placeholder: '请选择角色',
      options: [], // 这种写法支持options数据异步加载，并更新数据
    },
    {
      type: 'search',
      name: 'search',
      placeholder: '请输入姓名或账号进行查询',
    },
  ]);
  const store = useHomeStore();
  const loading = ref(false);
  onMounted(async () => {
    loading.value = true;
    await store.fetchInfo();
    loading.value = false;
  });
</script>
