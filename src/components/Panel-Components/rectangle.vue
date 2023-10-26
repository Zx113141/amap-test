<template>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">

      <a-form-item label="画笔透明度">
        <a-input-number suffix="PX" v-model:value="formState.strokeOpacity" placeholder="高">
        </a-input-number>
      </a-form-item>
      <a-form-item label="填充透明度">
        <a-input-number v-model:value="formState.fillOpacity" />
      </a-form-item>
      <a-form-item label="画笔字重">
        <a-input-number v-model:value="formState.strokeWeight" />
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
      <a-form-item>
        <a-button @click="() => setOptions(formState)">保存</a-button>
      </a-form-item>
    </a-form>
  </template>
  
  <script lang="ts" setup>
    import type { UnwrapRef, PropType } from 'vue';
    import type { IRectangle } from '/@/service/base/rectangle';
    const labelCol = { span: 8 };
    const wrapperCol = { span: 16 };

    onMounted(async () => {
      // await getPathByDistrict({
      //   keywords: '贵州',
      //   subdistrict: 1,
      // });
    });
    const props = defineProps({
      options: {
        type: Object as PropType<IRectangle>,
        default: () => ({}),
      },
      setOptions: {
        type: Function,
        default: () => () => {},
      },
    });
    let formState: UnwrapRef<IRectangle> = reactive({
      fillColor: '#ccebc5',
      strokeOpacity: 1,
      fillOpacity: 0.5,
      strokeColor: 'red',
      strokeWeight: 1,
      strokeStyle: 'dashed',
      strokeDasharray: [5, 5],
      path: [],
      border: [],
    });
  </script>
  
  <style lang="less" scoped></style>
  ../../service/base/polygon
  