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
      <a-button @click="() => handleSetOptions(formState)">保存并绘制</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import type { UnwrapRef, PropType } from 'vue';
  import type { IPoly } from '/@/service/polygon';
  import { get } from '/@/utils/http';
  const labelCol = { span: 8 };
  const wrapperCol = { span: 16 };

  const handleSetOptions = async () => {
    // console.log(formState);
    const params = {
      keywords: formState.border[formState.border.length - 1] || '贵州',
      subdistrict: 1,
    };
    await getPathByDistrict(params);
  };
  const getPathByDistrict = async (params) => {
    const { keywords, subdistrict } = params;
    fetch(
      `https://restapi.amap.com/v3/config/district?keywords=${keywords}&subdistrict=${subdistrict}&key=${window.SERVER_KEY}&extensions=all`,
    )
      .then((response) => response.body)
      .then((rb) => {
        const reader = rb?.getReader() as ReadableStreamBYOBReader;
        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then(({ done, value }) => {
                // If there is no more data to read
                if (done) {
                  // console.log('done', done);/
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                // console.log(done, value);
                push();
              });
            }
            push();
          },
        });
      })
      .then((stream) =>
        // Respond with our stream
        new Response(stream, { headers: { 'Content-Type': 'text/json' } }).json(),
      )
      .then((result) => {
        // Do things with result
        const polyline: number[][] = [];
        const arr = result.districts[0].polyline.split(';');
        arr.forEach((item: string) => {
          const newa = item.split(',');
          if (newa[1].indexOf('|')) {
            newa[1] = newa[1].split('|')[0];
          }
          polyline.push([Number(newa[0]), Number(newa[1])]);
        });
        props.setOptions({
          ...formState,
          path: polyline,
        });
      });
  };
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
  onMounted(async () => {
    // await getPathByDistrict({
    //   keywords: '贵州',
    //   subdistrict: 1,
    // });
  });
  const props = defineProps({
    options: {
      type: Object as PropType<IPoly>,
      default: () => ({}),
    },
    setOptions: {
      type: Function,
      default: () => () => {},
    },
  });
  let formState: UnwrapRef<IPoly> = reactive({
    name: 'polygon',
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
