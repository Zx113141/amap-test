<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="left">
    <a-form-item label="宽">
      <a-input-number suffix="PX" v-model:value="formState.width" placeholder="宽">
      </a-input-number>
    </a-form-item>
    <a-form-item label="地图主题" name="mapStyle">
      <a-select v-model:value="formState.mapStyle" :options="options"> </a-select>
    </a-form-item>
    <a-form-item>
      <a-button @click="() => setOptions()">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import type { SelectProps } from 'ant-design-vue';
  const labelCol = { span: 10 };
  const wrapperCol = { span: 14 };
  const props = defineProps({
    setOptions: {
      type: Function,
      default: () => () => {},
    },
  });
  const formState = reactive({
    mapStyle: 'normal',
    // animation: 'AMAP_ANIMATION_BOUNCE',
  });
  const options = ref<SelectProps['options']>([
    {
      value: 'normal',
      label: '标准',
    },
    {
      value: 'dark',
      label: '幻影黑',
    },
    {
      value: 'light',
      label: '月光银',
    },
    {
      value: 'whitesmoke',
      label: '远山黛',
    },
    {
      value: 'fresh',
      label: '草色青',
    },
    {
      value: 'grey',
      label: '雅土灰',
    },
    {
      value: 'graffiti',
      label: '涂鸦',
    },
    {
      value: 'marcaron',
      label: '马卡龙',
    },
    {
      value: 'darkblue',
      label: '极夜蓝',
    },
    {
      value: 'blue',
      label: '靛青蓝',
    },
    {
      value: 'wine',
      label: '酱籽',
    },
  ]);
</script>

<style lang="less" scoped></style>
