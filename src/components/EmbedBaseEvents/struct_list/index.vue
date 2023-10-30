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
      <a-button @click="() => setOptions(formState)">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import { useEditMap } from '/@/store/modules/editMap';
  import { Embed } from '/@/service/embedService';
  import { CarryOutOutlined } from '@ant-design/icons-vue';
  import type { TreeProps } from 'ant-design-vue';

  const store = useEditMap();
</script>

<style lang="scss" scoped></style>
