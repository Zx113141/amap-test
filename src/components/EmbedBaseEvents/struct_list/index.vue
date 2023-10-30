<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="left">
    <a-form-item label="构件联动" name="mapStyle">
      <a-switch v-model:checked="formState.isStruct" :options="options"> </a-switch>
    </a-form-item>
    <a-form-item label="联动构件" name="mapStyle">
      <a-cascader v-model:value="formState.mapStyle" :options="options" @change="handleChange">
      </a-cascader>
    </a-form-item>
    <a-form-item label="构件联动" name="mapStyle">
      <a-switch v-model:checked="formState.isStruct" :options="options"> </a-switch>
    </a-form-item>
    <a-form-item>
      <a-button @click="() => setOptions(formState)">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  import type { SelectProps } from 'ant-design-vue';
  import { map_theme } from '/@/config/constant/map_theme';
  const labelCol = { span: 10 };
  const wrapperCol = { span: 14 };
  const store = useEditMapWithOut();
  const options = ref<any[][]>([]);
  const props = defineProps({
    setOptions: {
      type: Function,
      default: () => () => {},
    },
  });
  const formState = reactive({
    isStruct: false,
    // animation: 'AMAP_ANIMATION_BOUNCE',
  });

  const handleChange = (value) => {};

  watch(
    () => store.service?.embedList,
    (newVal) => {
      if (newVal && newVal.length > 0) {
        options.value = newVal.map((embed) => {
          return {
            label: embed.name,
            value: embed.name,
            children:
              embed.structs && embed.structs.length
                ? embed.structs
                    .filter((struct) => struct.getExtData().id !== struct.getExtData().id)
                    .map((struct, i) => {
                      return {
                        label:
                          embed.name + '-' + struct.getExtData().id.substring(10).replace('==', ''),
                        value: struct.getExtData().id,
                        name: embed.name,
                      };
                    })
                : [],
          };
        });
        // console.log(options.value);
      }
    },
    {
      deep: true,
      immediate: true,
      flush: 'sync',
    },
  );
</script>

<style lang="less" scoped></style>
