<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="left">
    <a-form-item label="构件联动" name="isStruct">
      <a-switch v-model:checked="formState.isStruct" :options="options"> </a-switch>
    </a-form-item>
    <a-form-item v-if="formState.isStruct">
      <a-button @click="() => emits('visible', true)">配置响应器</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  // import { useEditMapWithOut } from '/@/store/modules/editMap';
  const labelCol = { span: 10 };
  const wrapperCol = { span: 14 };
  // const store = useEditMapWithOut();
  const options = ref<any[][]>([]);
  const emits = defineEmits(['visible']);
  // const props = defineProps({
  //   setOptions: {
  //     type: Function,
  //     default: () => () => {},
  //   },
  // });
  const formState = reactive({
    isStruct: false,
    cascader_struct: [],
    // animation: 'AMAP_ANIMATION_BOUNCE',
  });

  // const handleChange = (value) => {};

  // watch(
  //   () => store.service?.embedList,
  //   (newVal) => {
  //     if (newVal && newVal.length > 0) {
  //       options.value = newVal.map((embed) => {
  //         return {
  //           label: embed.name,
  //           value: embed.name,
  //           children:
  //             embed.structs && embed.structs.length
  //               ? embed.structs
  //                   .filter((struct) => struct.getExtData().id !== struct.getExtData().id)
  //                   .map((struct, i) => {
  //                     return {
  //                       label:
  //                         embed.name + '-' + struct.getExtData().id.substring(10).replace('==', ''),
  //                       value: struct.getExtData().id,
  //                       name: embed.name,
  //                     };
  //                   })
  //               : [],
  //         };
  //       });
  //       // console.log(options.value);
  //     }
  //   },
  //   {
  //     deep: true,
  //   },
  // );
</script>

<style lang="less" scoped></style>
