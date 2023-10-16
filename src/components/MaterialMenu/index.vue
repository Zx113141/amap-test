<template>
  <div
    :class="['material', active ? 'active' : '']"
    :draggable="true"
    @click="() => store.chooseMaterial(props)"
  >
    {{ name }}
  </div>
</template>

<script setup lang="ts">
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  const store = useEditMapWithOut();
  const active = ref(false);
  const props = defineProps({
    name: String,
    options: Object,
  });
  watch(
    store,
    (newval) => {
      active.value = store.material.name === props.name;
    },
    {
      deep: true,
      immediate: true,
    },
  );
  // console.log(props);
</script>

<style style="less" scoped>
  .material {
    width: 60px;
    height: 60px;
    border: 1px solid rgba(100, 100, 111, 0.2);
  }
  .active {
    border: 2px solid #1890ff;
  }
  .material:hover {
    /* cursor: move; */
    box-shadow: rgba(100, 100, 111, 0.2) 1.95px 1.95px 2.6px;
  }
</style>
