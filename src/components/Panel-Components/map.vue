<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="left">
    <a-form-item label="宽">
      <a-input-number suffix="PX" v-model:value="formState.width" placeholder="宽">
      </a-input-number>
    </a-form-item>
    <a-form-item label="地图主题" name="mapStyle">
      <a-select v-model:value="formState.mapStyle" :options="options"> </a-select>
    </a-form-item>
    <!-- <a-form-item>
      
    </a-form-item> -->
  </a-form>
</template>

<script lang="ts" setup>
  import type { SelectProps } from 'ant-design-vue';
  import { map_theme } from '/@/config/constant/map_theme';
  const labelCol = { span: 10 };
  const wrapperCol = { span: 14 };
  const props = defineProps({
    setOptions: {
      type: Function,
      default: () => () => {},
    },
  });
  const formState = reactive({
    mapStyle: 'amap://styles/normal',
    // animation: 'AMAP_ANIMATION_BOUNCE',
  });
  const options = ref<SelectProps['options']>(map_theme);
</script>

<style lang="less" scoped></style>
