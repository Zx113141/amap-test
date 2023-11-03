<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="left">
    <a-form-item label="名字">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="宽">
      <a-input-number suffix="PX" v-model:value="formState.width" placeholder="宽">
      </a-input-number>
    </a-form-item>
    <a-form-item label="高">
      <a-input-number suffix="PX" v-model:value="formState.height" placeholder="高">
      </a-input-number>
    </a-form-item>
    <a-form-item label="鼠标滑过内容">
      <a-input v-model:value="formState.title" />
    </a-form-item>

    <a-form-item label="点击高亮">
      <a-switch v-model:checked="formState.topWhenClick" />
    </a-form-item>

    <a-form-item label="是否显示">
      <a-switch v-model:checked="formState.visible" />
    </a-form-item>
    <a-form-item label="自定义显示内容">
      <a-switch v-model:checked="formState.customContent" />
    </a-form-item>
    <a-form-item label="内容" v-if="formState.customContent">
      <a-input v-model:value="formState.label.content" />
    </a-form-item>
    <a-form-item name="direction" label="文字显示方向" v-if="formState.customContent">
      <a-radio-group v-model:value="formState.label['direction']">
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
    <!-- <a-form-item>
      <a-button @click="() => setOptions()">保存</a-button>
    </a-form-item> -->
  </a-form>
</template>

<script lang="ts" setup>
  import type { UnwrapRef } from 'vue';
  import type { IMarker } from '/@/service/base/marker';
  const labelCol = { span: 10 };
  const wrapperCol = { span: 14 };

  let formState: UnwrapRef<IMarker> = reactive({
    name: 'marker',
    title: '',
    topWhenClick: true,
    draggable: true,
    visible: true,
    zIndex: 100,
    angle: 30,
    animation: 'AMAP_ANIMATION_NONE',
    clickable: true,
    label: {
      content: '',
      direction: 'bottom',
    },
    customContent: false,
    width: 36,
    height: 36,
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    context: 'Marker',
  });

  defineExpose(formState);
  // const setOptions = () => {
  //   //   // props.setOptions();
  // };
</script>

<style lang="less" scoped></style>
