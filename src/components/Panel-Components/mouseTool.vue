<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="left">
    <a-form-item label="绘制类型" name="type">
      <a-select v-model:value="formState.type" :options="options"> </a-select>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import type { SelectProps } from 'ant-design-vue';
  import { mouse_tool } from '/@/config/constant/mouse_tool';
  const labelCol = { span: 10 };
  const wrapperCol = { span: 14 };
  const formState = reactive({
    type: 'polyline',
    // animation: 'AMAP_ANIMATION_BOUNCE',
  });
  const options = ref<SelectProps['options']>(mouse_tool);
</script>

<!-- <style lang="less" scoped></style> -->
