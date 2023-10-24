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
  // import { type IMapProp } from './map';
  import InitMap from '/@/service/initMap';
  import EmbedService from '/@/service/embedService';
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  const embedList = {
    cover: ['Marker', 'Polygon', 'Text', 'MouseTool'],
    loca: ['PointerLayer'],
  };
  const store = useEditMapWithOut();
  // embedService
  const embedService = new EmbedService('container', embedList);
  // props
  // const props = defineProps<IMapProp>();
  // map html 实例
  const mapRef = ref<HTMLDivElement>();
  // init
  const initMap = () => {
    return new InitMap('container', {
      center: [106.648225, 26.612017],
      zoom: 14,
      viewMode: '3D',
      mapStyle: 'amap://styles/normal',
    });
  };
  // TODO:
  // // 全屏请求
  // const handleFullScreen = () => {
  //   mapRef.value?.requestFullscreen && mapRef.value.requestFullscreen();
  // };
  // map 实例
  let map: any = reactive(initMap());

  onMounted(async () => {
    // 实例化地图
    await map.init();
    // 实例化注入
    embedService.initAllStruct(map.AMap, map.Loca, map.options);
    // store Embed list注入
    store.pushService(embedService);
    // TODO:
    // // 全屏请求
    // if (props.autoFullscreen) {
    //   handleFullScreen();
    // }
  });
  onUnmounted(() => {
    embedService.destory('all');
  });
</script>

<style lang="less" scoped>
  #container {
    // width: 300px;
    height: 100%;
  }
</style>
