<template>
  <h2>客户线索</h2>
  <Table :url="fetchApi.list" :columns="columns" :hiddenFilter="true" :scroll="{ x: 1200 }" />
</template>

<script setup lang="ts">
  import { columns } from './constant';
  import fetchApi from '/@/api/home';
  import { useHomeStore } from '/@/store/modules/home';

  const store = useHomeStore();
  const loading = ref(false);
  onMounted(async () => {
    loading.value = true;
    await store.fetchInfo();
    loading.value = false;
  });
</script>
