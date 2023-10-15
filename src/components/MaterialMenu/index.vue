<template>
  <div class="material" :draggable="true" @click="() => store.chooseMaterial(props)">
    {{ name }}
  </div>
</template>

<script setup lang="ts">
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  const store = useEditMapWithOut();

  const props = defineProps({
    name: String,
    options: Object,
  });
  console.log(props);
</script>

<style style="less" scoped>
  .material {
    width: 60px;
    height: 60px;
    border: 1px solid rgba(100, 100, 111, 0.2);
  }
  .material:hover {
    cursor: move;
    box-shadow: rgba(100, 100, 111, 0.2) 1.95px 1.95px 2.6px;
  }
</style>
