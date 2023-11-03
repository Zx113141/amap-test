<template>
  <!-- <a-card :bordered="false" v-if="mode === MAP_MODE.PREVIEW">
    <a-row>
      <a-button @click="handleFullScreen"> 地图全屏 </a-button>
      <a-button @click="routeToEditMap"> 进入地图编辑 </a-button>
    </a-row>
    <a-divider class="line" />
    <div id="container" ref="mapRef"> </div>
  </a-card> -->

  <!-- -->

  <div id="container" ref="mapRef">
    <a-spin v-if="spinning" class="spin" size="large" :spinning="spinning" :tip="tip"> </a-spin>
  </div>
</template>

<script setup lang="ts">
  // import { type IMapProp } from './map';
  import InitMap from '/@/service/initMap';

  import EmbedService, { MODE } from '/@/service/embedService';
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  const embedList = {
    cover: ['Marker', 'Polygon', 'Rectangle', 'IndexCluster', 'Circle'],
    loca: ['PointerLayer', 'Camera'],
    plugin: ['RectangleEditor', 'CircleEditor'],
  };
  const spinning = ref(false);
  const store = useEditMapWithOut();
  const tip = ref('Loading');
  // embedService
  const embedService = new EmbedService('container', embedList);
  // props
  // const props = defineProps<IMapProp>();
  // map html 实例
  const mapRef = ref<HTMLDivElement>();
  // init
  const initMap = () => {
    tip.value = '加载地图';
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
    spinning.value = true;
    await map.init(tip);
    tip.value = '加载插件';
    // 实例化注入
    setTimeout(() => {
      embedService.initAllStruct(map.AMap, map.Loca, map.options, MODE.EDIT);
      store.pushService(embedService);

      spinning.value = false;
    }, 1000);
    // store Embed list注入

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
  .spin {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #container {
    // width: 300px;
    height: 100%;
  }
</style>
