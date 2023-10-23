<template>
  <!-- <a-card :bordered="false" v-if="mode === MAP_MODE.PREVIEW">
    <a-row>
      <a-button @click="handleFullScreen"> 地图全屏 </a-button>
      <a-button @click="routeToEditMap"> 进入地图编辑 </a-button>
    </a-row>
    <a-divider class="line" />
    <div id="container" ref="mapRef"> </div>
  </a-card> -->
  <div id="container" ref="mapRef"> </div>
</template>

<script setup lang="ts">
  import { type IMapProp } from './map';
  import InitMap from '/@/service/initMap';
  import MapService from '/@/service/mapService';
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  const embedServie = {
    cover: ['Marker', 'Polygon', 'Text'],
    loca: ['PointerLayer'],
  };
  const store = useEditMapWithOut();
  // mapService
  const mapService = new MapService();
  // props
  const props = defineProps<IMapProp>();
  // map html 实例
  const mapRef = ref<HTMLDivElement>();
  // init
  const initMap = () => {
    return new InitMap('container', {
      center: [106.648225, 26.612017],
      zoom: 14,
      viewMode: '3D',
      mapStyle: 'amap://styles/45311ae996a8bea0da10ad5151f72979',
    });
  };

  // 全屏请求
  const handleFullScreen = () => {
    mapRef.value?.requestFullscreen && mapRef.value.requestFullscreen();
  };
  // map 实例
  let map: any = reactive(initMap());

  onMounted(async () => {
    // 实例化地图
    await map.init();
    // 实例化注入
    mapService.initMapService(map.AMap, map.Loca, map.map);
    // engine Embed注入
    mapService.injectEmbedService(embedServie, map.map, (service: any) => {
      store.pushService(service);
    });
    // engine 事件注入
    mapService.injectMapEvents('click', (e) => mapService.getEvents(e));
    // 全屏请求
    if (props.autoFullscreen) {
      handleFullScreen();
    }
  });
  onUnmounted(() => {
    // 销毁事件
    mapService.destroyEvents('click', (e) => mapService.getEvents(e));
    // map.value?.off('click', clickHandler);
  });
</script>

<style lang="less" scoped>
  #container {
    // width: 300px;
    height: 100%;
  }
</style>
