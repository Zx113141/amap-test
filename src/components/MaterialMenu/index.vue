<template>
  <div
    :class="['material', active ? 'active' : '']"
    @click.stop="() => store.service?.setCurrentEmbed(props.name)"
  >
    <div class="material-icon">
      <img :src="props.icon" width="24" height="24" />
    </div>
    <div>
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  // const Icon = (icon) => createFromIconfontCN({ scriptUrl: icon });
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
    icon: {
      default: '',
    },
  });
  watch(
    () => store.service?.currentEmbed?.name,
    (newName) => {
      // console.log(store.struct);
      active.value = newName === props.name;
    },
    {
      deep: true,
    },
  );
  // console.log(props);
</script>

<style style="less" scoped>
  .material {
    /* padding: 5px; */
    width: 80px;
    height: 80px;
    border-right: 1px solid rgba(100, 100, 111, 0.2);
    border-bottom: 1px solid rgba(100, 100, 111, 0.2);
    text-align: center;
    display: flex;
    flex-direction: column;
    box-sizing: content-box;
    .material-icon {
      padding: 8px 0px;
      /* border-bottom: 1px dashed #aaa; */
    }
  }
  .active {
    position: relative;
  }
  .active::after {
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    width: 3px;
    height: 100%;
    background-color: #1890ff;
  }
  .material:hover {
    /* cursor: move; */
    box-shadow: rgba(100, 100, 111, 0.2) 1.95px 1.95px 2.6px;
  }
</style>
