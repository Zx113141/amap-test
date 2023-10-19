<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="left">
    <a-form-item label="是否自定义事件">
      <a-switch v-model:checked="formState.custom" />
    </a-form-item>
    <a-form-item label="是否自定义事件">
      <a-switch v-model:checked="formState.custom" />
    </a-form-item>
    <a-form-item label="是否自定义事件">
      <a-switch v-model:checked="formState.custom" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  const labelCol = { span: 10 };
  const wrapperCol = { span: 14 };
  const formState = reactive({
    custom: false,
  });
</script>

<style lang="less" scoped></style>
