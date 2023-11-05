<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="名字">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="地理边界">
      <a-cascader
        v-model:value="formState.border"
        placeholder="Please select"
        change-on-select
        :options="district"
      />
    </a-form-item>
    <a-form-item label="画笔透明度">
      <a-input-number suffix="PX" v-model:value="formState.strokeOpacity" placeholder="高">
      </a-input-number>
    </a-form-item>
    <a-form-item label="填充透明度">
      <a-input-number v-model:value="formState.fillOpacity" />
    </a-form-item>
    <a-form-item label="填充颜色">
      <vue3-color-picker v-model:pureColor="formState.fillColor" />
    </a-form-item>
    <a-form-item label="画笔字重">
      <a-input-number v-model:value="formState.strokeWeight" />
    </a-form-item>
    <a-form-item label="画笔颜色">
      <vue3-color-picker v-model:pureColor="formState.strokeColor" />
    </a-form-item>
    <a-form-item label="线条间距">
      <a-input-number v-model:value="formState.strokeDasharray[0]" />
      <a-input-number v-model:value="formState.strokeDasharray[1]" />
    </a-form-item>
    <a-form-item label="线条形状" name="strokeStyle">
      <a-radio-group v-model:value="formState['strokeStyle']">
        <a-radio value="dashed">线段</a-radio>
        <a-radio value="solid">直线</a-radio>
        <a-radio value="point">点线</a-radio>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import type { UnwrapRef } from 'vue';
  import type { IPoly } from '/@/service/base/polygon';

  const labelCol = { span: 8 };
  const wrapperCol = { span: 16 };

  const district = [
    {
      value: '贵州',
      label: '贵州',
      children: [
        {
          value: '贵阳',
          label: '贵阳',
          children: [
            {
              value: '观山湖区',
              label: '观山湖区',
            },
          ],
        },
      ],
    },
  ];
  let formState: UnwrapRef<IPoly> = reactive({
    name: 'polygon',
    fillColor: 'rgb(254, 87, 34)',
    strokeOpacity: 1,
    fillOpacity: 0.5,
    strokeColor: 'red',
    strokeWeight: 1,
    strokeStyle: 'dashed',
    strokeDasharray: [5, 5],
    path: [],
    border: [],
    context: 'Polygon',
  });
  defineExpose(formState);
</script>

<!-- <style lang="less" scoped></style> -->
