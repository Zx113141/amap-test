// import { * asecharts } from 'echarts/core';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useMarkerWithOut } from './marker'
import { ResInfoList } from '/@/api/home/model';
import Markers from '/@/service/marker';
import { mergeOptions } from '/@/utils/merge';

interface EditMap {
  AMap: any,
  mapInstance: any
  material: any,
  materialOptions: any
}

export const useEditMap = defineStore({
  id: 'map-edit',
  state: (): EditMap => ({
    // info
    AMap: null,
    mapInstance: null,
    // markers: [],
    // plugins: [],
    // polygons: [],
    material: 1,
    materialOptions: 1
  }),
  getters: {
    getCanvasOrMaterial(): Nullable<EditMap> {
      return this.material || null
    },
  },
  actions: {
    // 保存当前构造函数和map实例
    saveMapContructorAndMapInstane(AMap, map) {
      this.AMap = AMap
      this.mapInstance = map
    },

    // 物料选择
    chooseMaterial(material) {
      this.material = material
      // implemnt right slide menu options
      this.renderMenuSlide(material.options)
    },

    //render menu 
    renderMenuSlide(options) {
      this.materialOptions = options

    },

    // 初始化地图事件
    beforeMapClick(e) {
      if (!this.material) return
      switch (this.material.name) {
        case 'marker':
          this.createMarker(e);
          break;

      }


    },
    // 创建marker
    createMarker(e) {
      const markerStore = useMarkerWithOut()
      const positon = [e.lnglat.lng, e.lnglat.lat]
      const marker = (new Markers(this.AMap)).createMarker(this.mapInstance, positon, mergeOptions(this.material.options))
      markerStore.pushToMarkers(marker)
    },




  },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
  return useEditMap(store);
}
