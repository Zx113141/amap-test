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
  options: any,
  mapOptions: any
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
    options: 1,
    mapOptions: null
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
      if (this.material) {
        this.options = material.options
      } else {
        this.options = this.mapOptions
      }
      // implemnt right slide menu options

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
      const options = markerStore.getMarkerOptions()
      const positon = [e.lnglat.lng, e.lnglat.lat]
      const marker = (new Markers(this.AMap)).createMarker(this.mapInstance, positon, options)
      markerStore.pushToMarkers(marker)
    },




  },
});

// Need to be used outside the setup
export function useEditMapWithOut() {
  return useEditMap(store);
}
