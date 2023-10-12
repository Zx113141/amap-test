<template>
  <a-card :bordered="false" v-if="mode === MAP_MODE.PREVIEW">
    <a-row>
      <a-button @click="handleFullScreen"> 地图全屏 </a-button>
      <a-button @click="routeToEditMap"> 进入地图编辑 </a-button>
    </a-row>
    <a-divider class="line" />
    <div id="container" ref="mapRef"> </div>
  </a-card>
  <div id="container" ref="mapRef" v-else> </div>
</template>

<script setup lang="ts">
  import { type IMapProp, MAP_MODE } from './map';
  import { useRouter } from 'vue-router';
  import InitMap from './func/init';
  import { shanghai, suzhou, wuxi } from './constant/polygon.area.js';
  // props
  const props = defineProps<IMapProp>();
  // router
  const router = useRouter();

  // 全屏使用
  const mapRef = ref<HTMLDivElement>();

  // init
  const initMap = () => {
    return new InitMap('container', {
      center: [121.045332, 31.19884],
      zoom: 8.8,
      viewMode: '3D',
    });
  };
  // map 实例
  let map: any = reactive(initMap());
  onMounted(async () => {
    await map.init();
    map.polygon.pushPolygonToMap([shanghai, suzhou, wuxi]);
    if (props.autoFullscreen) {
      handleFullScreen();
    }
  });
  const handleFullScreen = () => {
    mapRef.value?.requestFullscreen && mapRef.value.requestFullscreen();
  };
  // 绑定事件
  // map.value?.on('click', clickHandler);

  onUnmounted(() => {
    // map.value?.off('click', clickHandler);
  });

  const routeToEditMap = () => {
    router.push({
      name: 'map-edit',
    });
  };
</script>

<style lang="less" scoped>
  #container {
    // width: 300px;
    height: 800px;
  }
</style>
