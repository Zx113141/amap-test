<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="left">
    <a-form-item label="宽">
      <a-input-number suffix="PX" v-model:value="formState.width" placeholder="宽">
      </a-input-number>
    </a-form-item>
    <a-form-item label="动画效果" name="animation">
      <a-radio-group v-model:value="formState['animation']">
        <a-radio value="AMAP_ANIMATION_NONE">无</a-radio>
        <a-radio value="AMAP_ANIMATION_DROP">掉落</a-radio>
        <a-radio value="AMAP_ANIMATION_BOUNCE">弹跳</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item>
      <a-button @click="() => setOptions()">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  const labelCol = { span: 10 };
  const wrapperCol = { span: 14 };
  const props = defineProps({
    setOptions: {
      type: Function,
      default: () => () => {},
    },
  });
  const formState = reactive({
    width: 0,
    animation: 'AMAP_ANIMATION_BOUNCE',
  });
</script>

<style lang="less" scoped></style>
