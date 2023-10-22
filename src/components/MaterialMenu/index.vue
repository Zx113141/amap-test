<template>
  <div
    :class="['material', active ? 'active' : '']"
    @click.stop="() => store.setCurrentService({ name: props.name, cate: props.cate })"
  >
    {{ name }}
  </div>
</template>

<script setup lang="ts">
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  const store = useEditMapWithOut();
  const active = ref(false);
  const props = defineProps({
    name: {
      type: String,
      default: '',
    },
    cate: {
      type: String,
      default: '',
    },
  });
  watch(
    () => store.struct.name,
    (newName) => {
      // console.log(store.struct);
      active.value = newName === props.name;
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
    width: 80px;
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
