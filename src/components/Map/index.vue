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
  import { shanghai, suzhou, wuxi } from './constant/polygon.area.js';

  const currentEvents = ref('marker');
  // props
  const props = defineProps<IMapProp>();
  // map html 实例
  const mapRef = ref<HTMLDivElement>();
  // init
  const initMap = () => {
    return new InitMap('container', {
      center: [121.045332, 31.19884],
      zoom: 8.8,
      viewMode: '3D',
    });
  };

  // 全屏请求
  const handleFullScreen = () => {
    mapRef.value?.requestFullscreen && mapRef.value.requestFullscreen();
  };

  // map 点击事件
  const handleClick = (...args) => {
    const [click] = args;
    console.log(click);
    switch (currentEvents.value) {
      case 'marker':
        map.marker.createMarker([click.lnglat.lng, click.lnglat.lat]);
      // case 'polygon':

      //
    }
  };
  // map 实例
  let map: any = reactive(initMap());

  onMounted(async () => {
    // 实例化地图
    await map.init();
    // 事件注入
    map.injectEvents('click', handleClick);
    // 参数注入

    map.polygon.pushPolygonToMap([shanghai, suzhou, wuxi]);
    // 全屏请求
    if (props.autoFullscreen) {
      handleFullScreen();
    }
  });

  onUnmounted(() => {
    // 销毁事件
    map.destroyEvents('click', handleClick);
    // map.value?.off('click', clickHandler);
  });
</script>

<style lang="less" scoped>
  #container {
    // width: 300px;
    height: 800px;
  }
</style>
./instance/init
