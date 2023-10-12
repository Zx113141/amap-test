<template>
  <div>
    <!-- search -->
    <a-card>
      <a-input-search size="large" class="search" @search="onSearch" placeholder="搜索房源信息">
        <template #enterButton>
          <a-button style="width: 100px; height: 48px" class="search_btn" type="primary">
            <img :src="IconSerach" alt="" />
          </a-button>
        </template>
      </a-input-search>
    </a-card>
    <a-divider class="line" />
    <!-- chart -->
    <a-row :gutter="24">
      <a-col :span="12">
        <a-card :bordered="false">
          <DataOverview />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card :bordered="false">
          <TradingHistory :loading="loading" />
        </a-card>
      </a-col>
    </a-row>

    <!-- <Table :url="fetchApi.list" :columns="columns" :hiddenFilter="true" :scroll="{ x: 1200 }" /> -->
    <geo-map></geo-map>
  </div>
</template>
<script setup lang="ts">
  import IconSerach from '/@/assets/images/Icon _Search.png';
  import DataOverview from './components/DataOverview.vue';
  import TradingHistory from './components/TradingHistory.vue';
  import { useHomeStore } from '/@/store/modules/home';
  import GeoMap from '/@/components/Map/index.vue';
  // import type { MAP_MODE } from '/@/components/Map/map.d.ts';
  const store = useHomeStore();
  const loading = ref(false);
  const mapRef = ref<HTMLDivElement | null>(null);

  onMounted(async () => {
    loading.value = true;
    await store.fetchInfo();
    loading.value = false;
  });

  onUnmounted(() => {
    store.resetState();
  });

  const onSearch = () => {};
</script>
<style lang="less" scoped>
  .search {
    & :deep(.ant-input) {
      height: 48px;
    }
  }
</style>
