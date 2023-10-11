<template>
  <a-card :bordered="false" v-if="mode === MAP_MODE.PREVIEW">
    <a-row>
      <a-button @click="handleFullScreen"> 地图全屏 </a-button>
      <a-button @click="routeToEditMap"> 进入地图编辑 </a-button>
    </a-row>
    <a-divider class="line" />
    <div id="container" ref="mapRef"> </div>
  </a-card>
  <div v-else id="container" ref="mapRef"> </div>
</template>

<script setup lang="ts">
  import { type IMapProp, MAP_MODE } from './map.d.ts';
  import { useRouter } from 'vue-router';
  // import {prop}
  const router = useRouter();

  const map = ref(null);
  const layers = ref([]);
  const mapRef = ref<HTMLDivElement | null>(null);
  const props = defineProps<IMapProp>({
    mode: {
      type:「
    },
  });

  onMounted(() => {
    map.value = new AMap.Map('container', {
      zoom: 16, //级别
      center: [106.648281, 26.610522], //中心点坐标
      viewMode: '3D', //使用3D视图，
      layers: layers.value,
    });

    // 绑定事件
    map.value.on('click', clickHandler);
  });

  const clickHandler = function (e) {
    alert('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！');
  };

  onUnmounted(() => {
    map.value.off('click', clickHandler);
  });

  const handleFullScreen = () => {
    mapRef.value.requestFullscreen && mapRef.value.requestFullscreen();
  };

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
