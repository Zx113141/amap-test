import { useMarkerWithOut } from '/@/store/modules/marker';
<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="宽">
      <a-input suffix="PX" v-model:value="formState.width" placeholder="宽"> </a-input>
    </a-form-item>
    <a-form-item label="高">
      <a-input suffix="PX" v-model:value="formState.height" placeholder="高"> </a-input>
    </a-form-item>
    <a-form-item label="标题">
      <a-input v-model:value="formState.title" />
    </a-form-item>
    <a-form-item label="内容">
      <a-input v-model:value="formState.content" />
    </a-form-item>
    <a-form-item label="点击高亮">
      <a-switch v-model:checked="formState.topWhenClick" />
    </a-form-item>

    <a-form-item label="是否显示">
      <a-switch v-model:checked="formState.visible" />
    </a-form-item>

    <a-form-item name="direction" label="显示方向">
      <a-radio-group v-model:value="formState['direction']">
        <a-radio value="top">上</a-radio>
        <a-radio value="bottom">下</a-radio>
        <a-radio value="left">左</a-radio>
        <a-radio value="right">右</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="旋转角度">
      <a-input-number v-model:value="formState.angle" />
    </a-form-item>
    <a-form-item label="动画效果" name="animation">
      <a-radio-group v-model:value="formState['animation']">
        <a-radio value="AMAP_ANIMATION_NONE">无</a-radio>
        <a-radio value="AMAP_ANIMATION_DROP">掉落</a-radio>
        <a-radio value="AMAP_ANIMATION_BOUNCE">弹跳</a-radio>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import type { UnwrapRef, PropType } from 'vue';
  import type { IMarker } from '/@/service/marker';

  const labelCol = { span: 6 };
  const wrapperCol = { span: 18 };
  const props = defineProps({
    options: {
      type: Object as PropType<IMarker>,
      default: () => ({}),
    },
    setOptions: {
      type: Function,
      default: () => () => {},
    },
  });
  let formState: UnwrapRef<IMarker> = reactive(props.options);
  // onMounted(() => {
  //   formState = reactive({ ...formState, ...props.options });
  // });

  watch(
    formState,
    (newForm) => {
      console.log(newForm);
      props.setOptions(newForm);
    },
    {
      immediate: true,
      deep: true,
    },
  );
</script>

<style lang="less" scoped></style>
