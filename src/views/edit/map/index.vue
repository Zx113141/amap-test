<template>
  <!-- <div class="editor">
    
  </div> -->
  <Editor>
    <template #main>
      <geo-map :mode="MAP_MODE.EDIT" :auto-fullscreen="true"> </geo-map>
    </template>
  </Editor>
</template>

<script setup lang="ts">
  import GeoMap from '/@/components/Map/index.vue';
  import Editor from '/@/components/Editor/index.vue';
  import { MAP_MODE, IPolygonOptions, IMarkerOptions } from '/@/components/Map/map';
  import { polygon } from '/@/api/map/options';
  const polygons = reactive<{
    polygon: IPolygonOptions | null;
    marker: IMarkerOptions | null;
  }>({
    polygon: null,
    marker: null,
  });

  // onMounted(async () => {
  //   const res = await polygon();
  // });
  // const get
</script>

<style lang="less" scoped>
  .editor {
    width: 100%;
    height: 100%;
  }
</style>
