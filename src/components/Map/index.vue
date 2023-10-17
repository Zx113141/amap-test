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
  import { shanghai, suzhou, wuxi } from '/@/config/constant/polygon.area.js';
  import { useEditMapWithOut } from '/@/store/modules/editMap';
  // store
  const store = useEditMapWithOut();
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
  // map 实例
  let map: any = reactive(initMap());

  onMounted(async () => {
    // 实例化地图
    await map.init();
    // 事件注入
    map.injectEvents('click', (e) => store.beforeMapClick(e));
    // 全局保存
    store.saveMapContructorAndMapInstane(map.AMap, map.map);
    store.initConstruct();
    // map.polygon.pushPolygonToMap([shanghai, suzhou, wuxi]);
    // 全屏请求
    if (props.autoFullscreen) {
      handleFullScreen();
    }
  });

  onUnmounted(() => {
    // 销毁事件
    map.destroyEvents('click', store.beforeMapClick);
    // map.value?.off('click', clickHandler);
  });
</script>

<style lang="less" scoped>
  #container {
    // width: 300px;
    height: 100%;
  }
</style>
./instance/init ../../config/constant/polygon.area.js
